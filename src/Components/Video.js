import React from "react";
import classes from "../Styles/Video.module.css";

const Video = ({ title, id, noq }) => {
    return (
        <div className={classes.video}>
            <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                alt="video thumbnail"
            />
            <p className={classes.desc}>{title}</p>
            <div className={classes.qMeta}>
                <p>{noq} Questions</p>
                <p>Score : {noq * 4}</p>
            </div>
        </div>
    );
};

export default Video;
