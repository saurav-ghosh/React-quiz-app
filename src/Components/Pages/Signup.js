import React from "react";
import signupImage from "../../images/signup.svg";
import classes from "../../Styles/Account.module.css";
import AccountImage from "../AccountImage";
import SignupForm from "../SignupForm";

const Signup = () => {
    return (
        <>
            <div className="title">
                <h1>Create an account</h1>
            </div>

            <div className={classes.container}>
                <AccountImage image={signupImage} altText="signup" />

                <SignupForm />
            </div>
        </>
    );
};

export default Signup;
