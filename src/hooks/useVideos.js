import {
    get,
    getDatabase,
    limitToFirst,
    orderByKey,
    query,
    ref,
    startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

const useVideos = (page) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(8)
            );

            try {
                setError("");
                setLoading(true);

                //request firebase database
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setVideos((prevVideos) => {
                        return [
                            ...prevVideos,
                            ...Object.values(snapshot.val()),
                        ];
                    });
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error.code);
            }
        }
        fetchVideos();
    }, [page]);

    return {
        videos,
        loading,
        error,
        hasMore,
    };
};

export default useVideos;
