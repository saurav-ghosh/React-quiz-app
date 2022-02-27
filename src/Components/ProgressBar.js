import React, { useRef, useState } from "react";
import classes from "../Styles/ProgressBar.module.css";
import Button from "./Button";

const ProgressBar = ({ nextQuestion, prevQuestion, progress, submitQuiz }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef();

    const toggleTooltip = () => {
        if (showTooltip) {
            setShowTooltip(false);
            tooltipRef.current.style.display = "none";
        } else {
            setShowTooltip(true);
            tooltipRef.current.style.display = "block";
            tooltipRef.current.style.left = `calc(${progress}% - 7.1rem)`;
        }
    };

    return (
        <div className={classes.progressBar}>
            <div className={classes.backButton} onClick={prevQuestion}>
                <span className="material-icons-outlined"> arrow_back </span>
            </div>
            <div className={classes.rangeArea}>
                <div ref={tooltipRef} className={classes.tooltip}>
                    {progress}% Complete!
                </div>
                <div className={classes.rangeBody}>
                    <div
                        style={{ width: `${progress}%` }}
                        className={classes.progress}
                        onMouseOver={toggleTooltip}
                        onMouseOut={toggleTooltip}
                    ></div>
                </div>
            </div>
            <Button
                className={classes.next}
                onClick={progress === 100 ? submitQuiz : nextQuestion}
            >
                <span>
                    {progress === 100 ? "Submit Quiz" : "Next Question"}
                </span>
                <span className="material-icons-outlined">arrow_forward</span>
            </Button>
        </div>
    );
};

export default ProgressBar;
