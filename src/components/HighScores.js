import React from "react";

export default function HighScores(props) {

    return (
        <div className="high-score">
            <h2>HIGH SCORE</h2>
            <ol className="center" start="1">
            {props.scoreElements}
            </ol>
        </div>
    )
}