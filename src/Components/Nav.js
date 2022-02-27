import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import logo from "../images/logo.png";
import classes from "../Styles/Nav.module.css";

const Nav = () => {
    const { currentUser, logOut } = useAuth();
    return (
        <nav className={classes.nav}>
            <div className={classes.navContainer}>
                <Link to="/">
                    <div className={classes.navLeft}>
                        <img src={logo} alt="logo" />
                        <h3>Learn with Saurav</h3>
                    </div>
                </Link>
                <div className={classes.navRight}>
                    {currentUser ? (
                        <>
                            <span className="material-icons-outlined">
                                account_circle
                            </span>
                            <span className={classes.userName}>
                                {currentUser.displayName}
                            </span>
                            <span
                                className="material-icons-outlined"
                                style={{ cursor: "pointer" }}
                                onClick={logOut}
                            >
                                {" "}
                                logout{" "}
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/signup">
                                <p>Signup</p>
                            </Link>
                            <Link to="/login">
                                <p>Login</p>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
