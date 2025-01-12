import React from "react";
import './About.css';

function About() {
    return (
        <div className="about">
            <h1>About Us</h1>
            <p>
                Welcome to <strong>CouponMaster</strong>, your ultimate destination for the best deals and discounts! 
                Our mission is to help you save money while enjoying the products and services you love.
            </p>
            <h2>Who We Are</h2>
            <p>
                At CouponMaster, we are passionate about connecting consumers with businesses through valuable coupons. 
                We work with a variety of companies to ensure you always have access to the best offers available.
            </p>
            <h2>Our Vision</h2>
            <p>
                We believe in creating a win-win environment where customers save money, 
                and businesses gain loyal customers. Our platform is designed to make finding and using coupons effortless.
            </p>
            <h2>Why Choose Us?</h2>
            <ul>
                <li>Wide range of deals from top companies</li>
                <li>Easy-to-use platform for browsing and redeeming coupons</li>
                <li>Regular updates to keep you informed about the latest offers</li>
                <li>Commitment to excellent customer service</li>
            </ul>
            <h2>Contact Us</h2>
            <p>
                Have questions, suggestions, or need assistance? We'd love to hear from you!
                <br />
                Email us at: <a href="mailto:CouponMaster@gmail.com">CouponMaster@gmail.com</a>
            </p>
        </div>
    );
}

export default About;
