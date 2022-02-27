import React from "react";
import classes from "../Styles/Form.module.css";

const Form = ({ children, ...rest }) => {
    return (
        <form className={classes.form} {...rest}>
            {children}
        </form>
    );
};

export default Form;
