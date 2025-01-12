import React from "react";
import "./UsersContainer.css";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import User from "../user/User";

function UsersContainer() {
    const allUsers = useSelector((state: AppState) => state.users);

    return (
        <div className="UsersContainer">
            <h2>Users List</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>User Type</th>
                        <th>Company ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => (
                        <User
                            key={index}
                            id={user.id}
                            userName={user.userName}
                            password={user.password}
                            userType={user.userType}
                            companyId={user.companyId}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersContainer;
