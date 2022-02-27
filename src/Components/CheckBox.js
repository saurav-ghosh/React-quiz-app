import React from "react";

const CheckBox = ({ className, text, ...rest }) => {
    return (
        <label className={className} style={{ fontSize: "1.6rem" }}>
            <input type="checkbox" {...rest} /> {text}
        </label>
    );
};

export default CheckBox;
