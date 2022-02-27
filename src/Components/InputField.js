import React from "react";
import classes from "../Styles/InputField.module.css";

const InputField = ({ icon, ...rest }) => {
    return (
        <div className={classes.inputField}>
            <input {...rest} />
            <span className="material-icons-outlined"> {icon} </span>
        </div>
    );
};

export default InputField;
