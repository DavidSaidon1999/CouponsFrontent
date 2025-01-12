import React from "react";
import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import Aside from "../aside/Aside";
import "./Layout.css";

function Layout(){
    return(
        <div className="layout">
            <header>
                <Header/>
            </header>

            <aside>
                <Aside/>
            </aside>

            <main>
                <Main/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Layout;