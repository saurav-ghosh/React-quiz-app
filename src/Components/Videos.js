import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Video from "../Components/Video";
import useVideos from "../hooks/useVideos";

const Videos = () => {
    const [page, setPage] = useState(1);
    const { loading, error, videos, hasMore } = useVideos(page);

    return (
        <>
            {videos.length > 0 && (
                <InfiniteScroll
                    dataLength={videos.length}
                    next={() => setPage(page + 8)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {videos.map((video) =>
                        video.noq > 0 ? (
                            <Link
                                to={`/quiz/${video.youtubeID}`}
                                state={{ videoTitle: video.title }}
                                key={video.youtubeID}
                            >
                                <Video
                                    title={video.title}
                                    id={video.youtubeID}
                                    noq={video.noq}
                                />
                            </Link>
                        ) : (
                            <Video
                                key={video.youtubeID}
                                title={video.title}
                                id={video.youtubeID}
                                noq={video.noq}
                            />
                        )
                    )}
                </InfiniteScroll>
            )}

            {!loading && videos.length === 0 && (
                <div style={{ fontSize: "2rem", textAlign: "center" }}>
                    Not data Found. Please refresh the page!
                </div>
            )}
            {error && <div>{error}</div>}
            {loading && <p style={{ fontSize: "1.8rem" }}>Loading...</p>}
        </>
    );
};

export default Videos;
