import React from "react";
import successImage from "../images/success.png";
import classes from "../Styles/Summary.module.css";

const Summary = ({ score, noq }) => {
    return (
        <div className={classes.summary}>
            <div className={classes.score}>
                <p>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>
            <div className={classes.badge}>
                <img src={successImage} alt="success badge" />
            </div>
        </div>
    );
};

export default Summary;
