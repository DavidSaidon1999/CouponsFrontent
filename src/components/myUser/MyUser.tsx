import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../redux/AppState";
import './MyUser.css';
import { useNavigate } from "react-router-dom";
import { ICustomerDetails } from "../models/ICustomerDetails";
import { IUser } from "../models/IUser";
import { ICustomer } from "../models/ICustomer";

function MyUser() {
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const [user, setUser] = useState<IUser | null>(null);
    const [customer, setCustomer] = useState<ICustomerDetails | null>(null);
    const [isEditingCustomer, setIsEditingCustomer] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState<ICustomerDetails | null>(null);

    const [newPassword, setNewPassword] = useState<string>("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const navigate = useNavigate();

    // הבאת מידע מהשרת
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get<IUser>(`http://localhost:8080/users`, {
                    headers: { Authorization: userLogin.token },
                });
                setUser(userResponse.data);

                const customerResponse = await axios.get<ICustomerDetails>(`http://localhost:8080/customers/MyCustomer`, {
                    headers: { Authorization: userLogin.token },
                });
                setCustomer(customerResponse.data);
                setEditedCustomer(customerResponse.data); // סטייט לעריכה
            } catch (e) {
                alert("Error fetching data.");
            }
        };

        fetchData();
    }, [userLogin.token]);

    // שינוי סיסמה
    const updatePassword = async () => {
        if (!newPassword) {
            alert("Please enter a new password.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/users`,
                { userName: user?.userName, password: newPassword },
                { headers: { Authorization: userLogin.token } }
            );

            alert("Password updated successfully.");
            setNewPassword("");
            setIsEditingPassword(false);
        } catch (e) {
            alert("Failed to update password.");
            console.error(e);
        }
    };

    // עריכת פרטי לקוח
    const saveCustomerDetails = async () => {
        if (!editedCustomer || !user) return;  // אם אין נתונים על המשתמש או הלקוח

    // יצירת אובייקט לקוח חדש עם כל השדות הנדרשים
    const customer: ICustomer = {
        id:editedCustomer.id,
        name:editedCustomer.name,
        address:editedCustomer.address,
        amountOfKids:editedCustomer.amountOfKids,
        phone: editedCustomer.phoneNumber, // הוספת השדה phone שנדרש
        user: user         // הוספת שדה המשתמש
    };


    debugger;
        try {
            console.log("Customer being sent:", customer);
            const response = await axios.put(
                `http://localhost:8080/customers`,
                customer,
                { headers: { Authorization: userLogin.token } }
            );
            setCustomer(response.data);
            alert("Customer details updated successfully.");
            setIsEditingCustomer(false);
        } catch (e) {
            alert("Failed to update customer details.");
            console.error(e);
        }
    };

    // עדכון שדות בעריכת הלקוח
    const handleInputChange = (field: keyof ICustomerDetails, value: string | number) => {
        if (!editedCustomer) return;
        setEditedCustomer({ ...editedCustomer, [field]: value });
    };

    // מחיקת יוזר
    async function deleteMyUser() {
        if (!user) return;

        const isConfirmed = window.confirm(`Are you sure you want to delete your user?`);
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/users/DeleteMyUser`, {
                    headers: { Authorization: userLogin.token },
                });
                alert("User deleted successfully.");
                setUser(null);
                navigate('/');
            } catch (error) {
                alert("Error deleting user.");
                console.error(error);
            }
        }
    }

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="MyUser">
            {/* פרטי היוזר */}
            <div>
                <h3>User Details:</h3>
                <div><strong>Username:</strong> {user.userName}</div>
                <div><strong>User Type:</strong> {user.userType}</div>
                <div><strong>Company ID:</strong> {user.companyId}</div>
            </div>

            {/* כפתור לעריכת סיסמה */}
            <div>
                {isEditingPassword ? (
                    <div>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <button onClick={updatePassword}>Save Password</button>
                        <button onClick={() => setIsEditingPassword(false)}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditingPassword(true)}>Edit Password</button>
                )}
            </div>

            {/* פרטי הלקוח */}
            {customer && (
                <div>
                    <h3>Customer Details:</h3>
                    <div>
                        <strong>Address:</strong>
                        {isEditingCustomer ? (
                            <input
                                type="text"
                                value={editedCustomer?.address || ""}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                            />
                        ) : (
                            <span>{customer.address}</span>
                        )}
                    </div>
                    <div>
                        <strong>Name:</strong>
                        {isEditingCustomer ? (
                            <input
                                type="text"
                                value={editedCustomer?.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        ) : (
                            <span>{customer.name}</span>
                        )}
                    </div>
                    <div>
                        <strong>Amount Of Kids:</strong>
                        {isEditingCustomer ? (
                            <input
                                type="number"
                                value={editedCustomer?.amountOfKids || 0}
                                onChange={(e) => handleInputChange("amountOfKids", +e.target.value)}
                            />
                        ) : (
                            <span>{customer.amountOfKids}</span>
                        )}
                    </div>
                    <div>
                        <strong>Phone Number:</strong>
                        {isEditingCustomer ? (
                            <input
                                type="text"
                                value={editedCustomer?.phoneNumber || ""}
                                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            />
                        ) : (
                            <span>{customer.phoneNumber}</span>
                        )}
                    </div>

                    {isEditingCustomer ? (
                        <div>
                            <button onClick={saveCustomerDetails}>Save</button>
                            <button onClick={() => setIsEditingCustomer(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditingCustomer(true)}>Edit Details</button>
                    )}
                </div>
            )}

            {/* מחיקת יוזר */}
            <div>
                <button className="delete-btn" onClick={deleteMyUser}>Delete Your User</button>
            </div>
        </div>
    );
}

export default MyUser;
