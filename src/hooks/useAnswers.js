import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (youTubeID) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function fetchAnswers() {
            const db = getDatabase();
            const answerRef = ref(db, `answers/${youTubeID}/questions`);
            const answerQuery = query(answerRef, orderByKey());

            try {
                setError("");
                setLoading(true);
                const snapshot = await get(answerQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        return [
                            ...prevAnswers,
                            ...Object.values(snapshot.val()),
                        ];
                    });
                }
            } catch (error) {
                setLoading(false);
                setError("There was an error occurred!");
            }
        }
        fetchAnswers();
    }, [youTubeID]);
    return {
        loading,
        error,
        answers,
    };
};

export default useAnswers;
