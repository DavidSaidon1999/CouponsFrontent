import React from "react";
import "./CouponsContainer.css";
import { ICoupon } from "../../models/ICoupon";
import Coupon from "../coupon/Coupon";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";



function CouponsContainer() {

    const dispatch = useDispatch();
    const couponsView = useSelector((state: AppState) => state.coupons);

    return (
        <div className="CouponsContainer">
            {couponsView.map((coupon, index) => (
                <Coupon
                    key={index}
                    id={coupon.id}
                    title={coupon.title}
                    description={coupon.description}
                    price={coupon.price}
                    companyName={coupon.companyName}
                    startDate={coupon.startDate}
                    endDate={coupon.endDate}
                    amount={coupon.amount}
                    imageURL={coupon.imageURL}

                />
            ))}
        </div>
    );
}

export default CouponsContainer;
