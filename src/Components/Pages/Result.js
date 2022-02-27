import _ from "lodash";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

const Result = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { loading, error, answers } = useAnswers(id);

    const calculateScore = () => {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [],
                checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (state[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score += 5;
            }
        });

        return score;
    };

    const score = calculateScore();

    return (
        <>
            {loading && <p style={{ fontSize: "1.8rem" }}>Loading...</p>}
            {error && <p>{error}</p>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={score} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    );
};

export default Result;
