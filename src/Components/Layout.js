import React from "react";
import classes from "../Styles/Layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <main className={classes.main}>{children}</main>
            <footer
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    color: "#013869",
                    fontSize: "1.6rem",
                }}
            >
                Designed and Developed by Saurav Ghosh
            </footer>
        </>
    );
};

export default Layout;
