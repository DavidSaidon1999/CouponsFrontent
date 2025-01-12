import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePurchseDetails.css";
import { IPurchase } from "../../models/IPurchase";
import PurchseDetailsContainer from "../purchseDetailsContainer/PurchseDetailsContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";

function HomePurchseDetails() {
    const [purchseDetailsFromDb, setPurchseDetailsFromDb] = useState<IPurchase[]>([]);
    const [page, setPage] = useState(0); // משתנה לעמוד הנוכחי
    const [totalPages, setTotalPages] = useState(1); // משתנה לסך כל העמודים
    const size = 10; // מספר רכישות בכל עמוד
    const userLgin = useSelector((state: AppState) => state.userLogin);
    const [searchUserId, setSearchUserId] = useState<string>(""); // סטייט עבור חיפוש User ID

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPurchse = async () => {
            try {
                if (!userLgin) {
                    throw new Error("No purchse found");
                }

                let url = "";

                // הגדרת ה-URL בהתאם לסוג המשתמש
                if (userLgin.userType === "Admin") {
                    url = `http://localhost:8080/purchases?page=${page}&size=${size}`;
                } else if (userLgin.userType === "Customer") {
                    url = `http://localhost:8080/purchases/byCustomer?page=${page}&size=${size}`;
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: userLgin.token, // שליחת הטוקן בכותרת
                    },
                });

                setPurchseDetailsFromDb(response.data.content); // עדכון רכישות
                dispatch({ type: ActionType.UpdateAllPurchase, payload: response.data.content });

                setTotalPages(response.data.totalPages); // עדכון מספר העמודים

            } catch (e) {
                alert(`Error fetching purchase: ${e}`);
                console.error("Error details:", e);
            }
        };


        fetchPurchse();
    }, [page]);


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

    // פונקציה לביצוע החיפוש
    const handleSearch = async () => {
       /* if (!searchUserId) {
            alert("Please enter a User ID to search.");
            return;
        }

        try {
            const url = `http://localhost:8080/purchases/Admin/${searchUserId}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: userLgin.token,
                },
            });

            setPurchseDetailsFromDb(response.data); // עדכון התוצאות
            dispatch({ type: ActionType.UpdateAllPurchase, payload: response.data.content});

            alert(`Found purchases for User ID: ${searchUserId}`);
        } catch (e) {
            alert("Failed to fetch purchases for the given User ID.");
            console.error(e);
        }*/
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       // setSearchUserId(event.target.value);
    };

    return (
        <div className="HomePurchseDetails">

            {userLgin.userType === "Admin" && (
                <div className="search-user">
                    <input
                        type="number"
                        placeholder="Search User ID"
                        value={searchUserId}
                        onChange={handleSearchInputChange}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            )}
            <PurchseDetailsContainer
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

export default HomePurchseDetails;
