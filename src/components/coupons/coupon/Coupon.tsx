import React, { useEffect, useState } from "react";
import './Coupon.css';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ICoupon } from "../../models/ICoupon";


function Coupon(props: ICoupon) {
    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);
    const navigate = useNavigate();

    function handleCouponClick() {
        const { id, title, description, price, companyName, startDate, endDate, amount, imageURL } = props;
        navigate(`/coupon/${props.id}`, {
            state: { id, title, description, price, companyName, startDate, endDate, amount, imageURL }
        });
    }

    return (
        <div className="Coupon" onClick={handleCouponClick}>
            {props.imageURL && <img src={props.imageURL} alt={props.title} className="coupon-image" />}
            <div className="coupon-details">
                <h3 className="coupon-title">{props.title}</h3>
                <p className="coupon-description">{props.description}</p>
                <p className="coupon-price">Price: ${props.price}</p>
            </div>
        </div>
    );
}

export default Coupon;
