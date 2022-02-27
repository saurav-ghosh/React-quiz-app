import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useQuizzes = (youTubeID) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        async function fetchQuizzes() {
            const db = getDatabase();
            const quizRef = ref(db, `quiz/${youTubeID}/questions`);
            const quizQuery = query(quizRef, orderByKey());

            try {
                setError("");
                setLoading(true);
                const snapshot = await get(quizQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setQuizzes((prevQuizzes) => {
                        return [
                            ...prevQuizzes,
                            ...Object.values(snapshot.val()),
                        ];
                    });
                }
            } catch (error) {
                setLoading(false);
                setError("An error occurred!");
            }
        }
        fetchQuizzes();
    }, [youTubeID]);

    return {
        loading,
        error,
        quizzes,
    };
};

export default useQuizzes;
