import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SingleCoupon.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";

function SingleCoupon() {
    const location = useLocation();
    const navigate = useNavigate();

    const coupon = location.state;
    const [quantity, setQuantity] = useState<number>(1); // מצב לכמות
    const userLgin = useSelector((state: AppState) => state.userLogin);

    async function deleteCoupon(couponId: number) {
        try {
            if (!userLgin) {
                throw new Error("No user found");
            }

            let url = "";
            if (userLgin.userType === "Admin") {
                url = `http://localhost:8080/coupons/Admin/${couponId}`;
            } else if (userLgin.userType === "Company") {
                url = `http://localhost:8080/coupons/${couponId}`;
            }

            await axios.delete(url, {
                headers: {
                    Authorization: userLgin.token,
                },
            });

            navigate('/');

        } catch (error) {
            console.error("Error deleting coupon:", error);
            alert("Error deleting coupon");
        }
    }

    async function buyCoupon(couponId: number, quantity: number) {
        try {
            if (userLgin.userType !== "Customer") {
                throw new Error("No user found");
            }

            // שליחת בקשת POST לשרת
            await axios.post(
                `http://localhost:8080/purchases`,
                { couponId, amount: quantity },
                {
                    headers: {
                        Authorization: userLgin.token,
                    },
                }
            );

            alert(`Successfully purchased ${quantity} coupon(s)!`);
            navigate('/');

        } catch (error) {
            console.error("Error purchasing coupon:", error);
            alert(`Error purchasing coupon. Please try again. ${couponId} ${quantity}`);
        }
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= coupon.amount) {
            setQuantity(value);
        }
    };

    if (!coupon) {
        return <p>No coupon data available.</p>;
    }

    return (
        <div className="SingleCoupon">
            {coupon.imageURL && (
                <img src={coupon.imageURL} alt={coupon.title} className="single-coupon-image" />
            )}
            <h1>{coupon.title}</h1>
            <p>{coupon.description}</p>
            <p>Price: ${coupon.price}</p>
            <p>Company: {coupon.companyName}</p>
            <p>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(coupon.endDate).toLocaleDateString()}</p>
            <p>Available Stock: {coupon.amount}</p>
            
            {(userLgin.userType === "Admin" || userLgin.userType === "Company") && (
                <button onClick={() => deleteCoupon(coupon.id)}>Delete coupon</button>
            )}

            {userLgin.userType === "Customer" && (
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        max={coupon.amount} // הגדרת המספר המקסימלי לפי המלאי
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button onClick={() => buyCoupon(coupon.id, quantity)}>Buy coupon</button>
                </div>
            )}
        </div>
    );
}

export default SingleCoupon;
