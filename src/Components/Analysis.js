import React from "react";
import classes from "../Styles/Analysis.module.css";
import Answers from "./Answers";

const Analysis = ({ answers = [] }) => {
    return (
        <>
            <h1>Question Analysis</h1>

            {answers &&
                answers.map((answer, index) => (
                    <div className={classes.question} key={index}>
                        <div className={classes.qTitle}>
                            <span className="material-icons-outlined">
                                help_outline
                            </span>
                            {answer.title}
                        </div>
                        <Answers input={false} options={answer.options} />
                    </div>
                ))}
        </>
    );
};

export default Analysis;
