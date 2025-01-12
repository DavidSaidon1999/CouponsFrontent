import React from "react";
import "./User.css"; 
import { IUser } from "../../models/IUser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";

function User(props: IUser) {

    const userLgin = useSelector((state: AppState) => state.userLogin);
    const dispatch = useDispatch();

    async function handleDelete() {
        // שואל את המשתמש אם הוא בטוח שהוא רוצה למחוק
        const isConfirmed = window.confirm(`Are you sure you want to delete user with ID: ${props.id}?`);
        
        if (isConfirmed) {
            try {
                // שולח בקשת DELETE לשרת
                const response = await axios.delete(`http://localhost:8080/users/AdminDelete/${props.id}`, {
                    headers: {
                        Authorization: userLgin.token, // שולח את ה-token בכותרת
                    },
                });

                // אם הצלחנו למחוק את המשתמש
                alert(`User with ID: ${props.id} has been deleted.`);
                // אתה יכול לעדכן את הממשק בהתאם, למשל למחוק את המשתמש מה-list
                dispatch({ 
                    type: ActionType.DeleteUser, 
                    payload: props.id  // שולח את ה-ID של המשתמש שנמחק
                });
            } catch (error) {
                // במקרה של שגיאה
                alert(`Error deleting user with ID: ${props.id}`);
                console.error("Error details:", error);
            }
        } else {
            // אם המשתמש בחר לבטל
            alert(`User with ID: ${props.id} was not deleted.`);
        }
    }

    return (
        <tr className="User">
            <td>{props.id}</td>
            <td>{props.userName}</td>
            <td>{props.password}</td>
            <td>{props.userType}</td>
            <td>{props.companyId}</td>
            <td>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default User;
