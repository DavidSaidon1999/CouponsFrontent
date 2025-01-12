import React from "react";
import Home from "../home/Home";
import Header from "../header/Header";  // Import the Heder component
import Login from "../login/Login";
import { Routes, Route } from "react-router-dom";  // Import Routes and Route
import SignUp from "../signUp/SignUp";
import About from "../about/About";
import "./Main.css";
import SingleCoupon from "../coupons/singleCoupon/SingleCoupon";
import HomePurchseDetails from "../purchseies/homePurchseDetails/HomePurchseDetails";
import HomeUserContainer from "../users/homeUserContainer/HomeUserContainer";
import MyUser from "../myUser/MyUser";
import AddUserCompany from "../addUserCompany/AddUserCompany";

function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/purchases" element={<HomePurchseDetails />} /> 
                <Route path="/coupon/:id" element={<SingleCoupon />}/>
                <Route path="/allUsers" element={<HomeUserContainer />}/>
                <Route path="/myUser" element={<MyUser />}/>
                <Route path="/addUserCmpany" element={<AddUserCompany />}/>

            </Routes>
        </div>
    );
}

export default Main;
