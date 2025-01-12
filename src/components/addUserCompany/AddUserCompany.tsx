import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../redux/AppState";
import './AddUserCompany.css'; // נוסיף קובץ CSS לעיצוב המודל

function AddUserCompany() {
    let [companyId, setCompanyId] = useState<number>(0);
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    const userType = "Company";
    const userLgin = useSelector((state: AppState) => state.userLogin);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(true); // State לשלוט על המודל

    // פונקציות עדכון
    function updateCompanyId(event: React.ChangeEvent<HTMLInputElement>): void {
        setCompanyId(+event.target.value);
    }

    function updateUserName(event: any): void {
        setUserName(event.target.value);
    }

    function updatePassword(event: any): void {
        setPassword(event.target.value);
    }

    // פונקציה ליצירת משתמש חדש
    async function createNewUserCompany() {
        try {
            const response = await axios.post(
                "http://localhost:8080/users/createByAdmin",
                {
                    userName,
                    password,
                    userType,
                    companyId
                },
                {
                    headers: {
                        Authorization: userLgin.token  // שלח את הטוקן בכותרת
                    }
                }
            );
            const serverResponse = response.data;
            console.log(serverResponse);
            alert("Registration completed successfully");
            closeModal(); // סגירת המודל אחרי ביצוע הפעולה
        } catch (e) {
            console.error(e);
            alert("I couldn't complete the registration");
        }
    }

    // פונקציה לפתיחת המודל
    function openModal() {
        setModalOpen(true);
    }

    // פונקציה לסגירת המודל
    function closeModal() {
        setModalOpen(false);
        navigate('/');
    }

    return (
        <div>

            {/* מודל - Popup */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h1>New User Company</h1>
                        <input type='email' placeholder='userName' onChange={updateUserName} />
                        <br />
                        <input type='password' placeholder='password' onChange={updatePassword} />
                        <br />
                        <input type='number' placeholder='companyId' onChange={updateCompanyId} />
                        <br />
                        <button onClick={createNewUserCompany}>Create</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddUserCompany;
