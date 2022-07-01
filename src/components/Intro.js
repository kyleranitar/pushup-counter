import React from "react";

export default function Intro(props) {
    return (
        <>
          <h1>Push-up Counter</h1>
          <p className="intro-text">Do as much pushups as you can in 20 seconds!</p>
          <p className="intro-text">Beat your high score and get GAINZ!</p>
          <hr></hr>
          <button 
            className="button" 
            onClick={props.startCountdown}
            disabled={props.isCountdownRunning}
            >
            {!props.isCountdownRunning ? "START!" : `Starting in ${props.countdown}...`}
          </button> 
        </>
    )
}