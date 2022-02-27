import React from "react";
import classes from "../Styles/AccountImage.module.css";

const AccountImage = ({ image, altText }) => {
    return (
        <div className={classes.image}>
            <img src={image} alt={altText} />
        </div>
    );
};

export default AccountImage;
