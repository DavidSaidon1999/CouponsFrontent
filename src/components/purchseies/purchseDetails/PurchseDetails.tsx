import React from "react";
import "./PurchseDetails.css";
import { IPurchase } from "../../models/IPurchase";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import axios from "axios";
import { ActionType } from "../../redux/ActionType";

function PurchseDetails(props: IPurchase) {
    const timestamp = new Date(props.timestamp);
    const endDate = new Date(props.endDate);
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const dispatch = useDispatch();

    async function handleDelete() {
        if (!userLogin.token) {
            alert("You must be logged in to delete purchases.");
            return;
        }

        const confirmation = window.confirm(`Are you sure you want to delete the purchase with ID: ${props.id}?`);
        if (!confirmation) {
            return;
        }

        try {
            let url =""

            if(userLogin.userType == "Customer"){
                url =`http://localhost:8080/purchases/MyPurchase/${props.id}`;
            }
            else if(userLogin.userType == "Admin"){
                url =`http://localhost:8080/purchases/ByAdmin/${props.id}`;
            }
            

            await axios.delete(url, {
                headers: {
                    Authorization: userLogin.token
                }
            });
            alert(`Purchase with ID: ${props.id} has been successfully deleted.`);

            // ניתן לעדכן כאן את הרשימה לאחר המחיקה אם יש רשימה שמנוהלת ברמת האב.
            dispatch({
                type: ActionType.DeletePurchase,
                payload: props.id  // שולח את ה-ID של המשתמש שנמחק
            });
        } catch (error) {
            alert("Failed to delete the purchase. Please try again later.");
        }
    }


    return (
        <tr className="PurchseDetails">
            <td>
                {props.imageURL && (
                    <img
                        src={props.imageURL}
                        alt={props.title}
                    />
                )}
            </td>
            <td>{props.amount}</td>
            <td>{props.totalPrice}</td>
            <td>{timestamp.toLocaleDateString()}</td>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{endDate.toLocaleDateString()}</td>
            <td>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default PurchseDetails;
