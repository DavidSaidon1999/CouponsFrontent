
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/AppState";
import { ActionType } from "../redux/ActionType";

function Header() {
  const navigate = useNavigate();
  const userLgin = useSelector((state: AppState) => state.userLogin);
  const dispatch = useDispatch();

  // פונקציה לטיפול בבחירה בתיבת ה-selection
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value) {
      navigate(value); // מעבר לדף המתאים לפי ה-value
    }
  }

  // פונקציה ליציאה מהמערכת
  function logOut() {
    // i update the store new 
    dispatch({ type: ActionType.Logout });

    alert("Bye Bye!"); // הצגת הודעה
    navigate('/'); // פנייה לעמוד login לאחר יציאה
  }

  return (
    <div className="header">
      <nav className="navbar">
        <div className="navbar-logo">CouponMaster</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {/* הצגת קישור לדף רכישות רק אם המשתמש מחובר */}
          {userLgin.token && (
            <li><Link to="/purchases">Purchases</Link></li>
          )}

          {/* הצגת תיבת בחירה (Selection) */}
          {userLgin.userType === "Admin" && (
            <li>
              <select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Users Options</option>
                <option value="/allUsers">All Users</option>
                <option value="/allUsers">All custmer</option>
                <option value="/addUserCmpany">Add User to coumpany</option>
              </select>
            </li>
          )}

          {/* הצגת Login ו-SignUp רק אם המשתמש לא מחובר */}
          {!userLgin.token && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">SignUp</Link></li>
            </>
          )}

          {/* הצגת LogOut אם המשתמש מחובר */}
          {userLgin.token && (
            <li><Link to="/" onClick={logOut}>LogOut</Link></li>

          )}
          {/* הצגת LogOut אם המשתמש מחובר */}
          {userLgin.token && (
          <li><Link to="/myUser" >myUser</Link></li>
          )}


        </ul>
      </nav>
    </div>
  );
}

export default Header;
