import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeUserContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { IUser } from "../../models/IUser";
import UsersContainer from "../usersContainer/UsersContainer";
import { ActionType } from "../../redux/ActionType";

function HomeUserContainer() {
    const [allUserFromDb, setAllUserFromDb] = useState<IUser[]>([]);
    const [page, setPage] = useState(0); // משתנה לעמוד הנוכחי
    const [totalPages, setTotalPages] = useState(1); // משתנה לסך כל העמודים
    const size = 10; // מספר רכישות בכל עמוד
    const userLgin = useSelector((state: AppState) => state.userLogin);
    const dispatch = useDispatch();

    console.log(userLgin); // תדפיס את המידע של המשתמש ב-Redux

    useEffect(() => {
        // אם אין מידע על המשתמש ב-Redux, אנחנו לא מבצעים את הקריאה ל-API
        if (!userLgin) return;
    
        const fetchPurchse = async () => {
            try {
                if (userLgin.userType === "Admin") {
                    const url = `http://localhost:8080/users/usersList?page=${page}&size=${size}`;
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: userLgin.token,
                        },
                    });
    
                    setAllUserFromDb(response.data.content);
                    dispatch({ type: ActionType.UpdateAllUsers, payload: response.data.content });
                    setTotalPages(response.data.totalPages);
                }
            } catch (e) {
                alert(`Error fetching users: ${e}`);
                console.error("Error details:", e);
            }
        };
    
        fetchPurchse();
    }, [page, userLgin]); // מפעילים את הקריאה כל פעם שהערכים משתנים
    

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };




    return (
        <div className="HomeUsersContainer">
            <UsersContainer
            />

            <div className="pagination-buttons">
                <button
                    onClick={handlePrevPage}
                    className="pagination-button"
                    disabled={page === 0} // השבתה אם זה העמוד הראשון
                >
                    דף קודם
                </button>
                <button
                    onClick={handleNextPage}
                    className="pagination-button"
                    disabled={page >= totalPages - 1} // השבתה אם זה העמוד האחרון
                >
                    דף הבא
                </button>
            </div>
        </div>
    );
}

export default HomeUserContainer;
