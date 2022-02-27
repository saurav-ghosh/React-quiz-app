import React, { Fragment } from "react";
import classes from "../Styles/Answers.module.css";
import CheckBox from "./CheckBox";

const Answers = ({ options = [], handleChecked, input }) => {
    return (
        <div className={classes.answers}>
            {options.map((option, index) => (
                <Fragment key={index}>
                    {input ? (
                        <CheckBox
                            className={classes.answer}
                            text={option.title}
                            value={index}
                            key={index}
                            checked={option.checked}
                            onChange={(e) => handleChecked(e, index)}
                        />
                    ) : (
                        <CheckBox
                            className={`${classes.answer} ${
                                option.correct
                                    ? classes.correct
                                    : option.checked
                                    ? classes.wrong
                                    : null
                            }`}
                            key={index}
                            text={option.title}
                            defaultChecked={option.checked}
                            disabled
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default Answers;
