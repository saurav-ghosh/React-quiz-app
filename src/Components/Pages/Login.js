import React from "react";
import loginImage from "../../images/login.svg";
import classes from "../../Styles/Account.module.css";
import AccountImage from "../AccountImage";
import LoginForm from "../LoginForm";

const Login = () => {
    return (
        <>
            <div className="title">
                <h1>Login to your account</h1>
            </div>

            <div className={classes.container}>
                <AccountImage image={loginImage} altText="login" />

                <LoginForm />
            </div>
        </>
    );
};

export default Login;
