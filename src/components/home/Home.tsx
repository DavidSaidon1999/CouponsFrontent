import React, { useEffect, useState } from "react";
import CouponsContainer from "../coupons/couponsContainer/CouponsContainer";
import axios from "axios";
import "./Home.css";
import { ICoupon } from "../models/ICoupon";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "../redux/AppState";
import { ActionType } from "../redux/ActionType";


function Home() {
    const dispatch = useDispatch();
    const [couponsFromDb, setCouponsFromDb] = useState<ICoupon[]>([]);
    const [page, setPage] = useState(0); // משתנה לעמוד הנוכחי
    const [totalPages, setTotalPages] = useState(1); // משתנה לסך כל העמודים
    const size = 4; // מספר הקופונים בכל עמוד
    const userLgin = useSelector((state: AppState) => state.userLogin);

    useEffect(() => {
        const fetchCoupons = async () => {

            console.log(userLgin)
            try {
                if (userLgin.userType === "Admin" || userLgin.userType === "Customer" || userLgin.userType === "") {
                    const response = await axios.get(`http://localhost:8080/coupons?page=${page}&size=${size}`);
                    setCouponsFromDb(response.data.content); // עדכון הקופונים
                    setTotalPages(response.data.totalPages); // עדכון מספר העמודים

                } else if (userLgin.userType === "Company") {
                    const companyId = localStorage.getItem("companyId");
                    const response = await axios.get(`http://localhost:8080/coupons/byCompanyId?companyId=${companyId}&page=${page}&size=${size}`);
                    setCouponsFromDb(response.data.content); // עדכון הקופונים
                    setTotalPages(response.data.totalPages); // עדכון מספר העמודים
                }



            } catch (e) {
                alert("Error fetching coupons:");
            }
        };

        fetchCoupons();
    }, [page]);

    // i write this to store 
    dispatch({ type: ActionType.UpdateCuponsView, payload: couponsFromDb });


    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };




    return (
        <div className="Home">
            <CouponsContainer/>

            <div className="pagination-buttons">
                <button
                    onClick={handlePrevPage}
                    className="pagination-button"
                    disabled={page === 0} // השבתה אם זה העמוד הראשון
                >
                    דף קודם
                </button>
                <button
                    onClick={handleNextPage}
                    className="pagination-button"
                    disabled={page >= totalPages - 1} // השבתה אם זה העמוד האחרון
                >
                    דף הבא
                </button>
            </div>
        </div>
    );
}

export default Home;
