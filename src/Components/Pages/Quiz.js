import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import useQuizzes from "../../hooks/useQuizzes";
import Answers from "../Answers";
import Miniplayer from "../Miniplayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;

        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked =
                action.value;
            return questions;

        default:
            return state;
    }
};

const Quiz = () => {
    const { id } = useParams();
    const { loading, error, quizzes } = useQuizzes(id);
    const [qna, dispatch] = useReducer(reducer, initialState);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { videoTitle } = state;

    useEffect(() => {
        dispatch({
            type: "questions",
            value: quizzes,
        });
    }, [quizzes]);

    //function for handle checked value
    const handleChecked = (e, index) => {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    };

    //next question functionality
    const nextQuestion = () => {
        currentQuestion + 1 < quizzes.length &&
            setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    };

    //previous question functionality
    const prevQuestion = () => {
        currentQuestion >= 1 &&
            setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    };

    async function submitQuiz() {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna,
        });

        navigate(`/result/${id}`, { state: qna });
    }

    //calculate progressBar percentage
    const progress =
        quizzes.length > 0 ? ((currentQuestion + 1) / quizzes.length) * 100 : 0;

    return (
        <>
            {loading && <p style={{ fontSize: "1.8rem" }}>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <div className="title">
                        <h1>{qna[currentQuestion].title}</h1>
                        <h4>Question can have multiple answers</h4>
                    </div>

                    <Answers
                        input={true}
                        options={qna[currentQuestion].options}
                        handleChecked={handleChecked}
                    />
                    <ProgressBar
                        nextQuestion={nextQuestion}
                        prevQuestion={prevQuestion}
                        progress={progress}
                        submitQuiz={submitQuiz}
                    />
                    <Miniplayer id={id} title={videoTitle} />
                </>
            )}
        </>
    );
};

export default Quiz;
