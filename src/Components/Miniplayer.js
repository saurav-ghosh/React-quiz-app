import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../Styles/Miniplayer.module.css";

const Miniplayer = ({ id, title }) => {
    const [showMiniPlayer, setShowMiniPlayer] = useState(false);
    const floatingBtnRef = useRef();
    const miniPlayerRef = useRef();

    const toggleMiniPlayer = () => {
        if (!showMiniPlayer) {
            floatingBtnRef.current.style.display = "none";
            miniPlayerRef.current.style.display = "block";
            setShowMiniPlayer(true);
        } else {
            floatingBtnRef.current.style.display = "flex";
            miniPlayerRef.current.style.display = "none";
            setShowMiniPlayer(false);
        }
    };

    return (
        <>
            <div
                ref={floatingBtnRef}
                className={classes.floatingBtn}
                onClick={toggleMiniPlayer}
            >
                <span className={`material-icons-outlined ${classes.open}`}>
                    play_circle_filled
                </span>
            </div>

            <div ref={miniPlayerRef} className={classes.miniPlayer}>
                <span
                    onClick={toggleMiniPlayer}
                    className={`material-icons-outlined ${classes.close}`}
                >
                    {" "}
                    close{" "}
                </span>
                <ReactPlayer
                    className={classes.player}
                    url={`https://www.youtube.com/watch?v=${id}`}
                    width="100%"
                    height="18rem"
                    playing={showMiniPlayer}
                    controls
                />
                <p>{title}</p>
            </div>
        </>
    );
};

export default Miniplayer;
