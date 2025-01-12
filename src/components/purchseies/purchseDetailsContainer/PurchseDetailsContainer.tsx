import React from "react";
import "./PurchseDetailsContainer.css";
import { IPurchase } from "../../models/IPurchase";
import PurchseDetails from "../purchseDetails/PurchseDetails";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";

function PurchseDetailsContainer() {
    const allPurchase = useSelector((state: AppState) => state.purchases);

    return (
        <div className="purchase-container">
            <table className="purchase-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Amount</th>
                        <th>Total Price</th>
                        <th>Purchase Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allPurchase.map((purchase, index) => (
                        <PurchseDetails key={index} {...purchase} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PurchseDetailsContainer;
