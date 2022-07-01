import React, {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import useSound from "use-sound";

import countdownSound from "./countdown-timer.mp3";
import startSound from "./start-timer.mp3";
import finishSound from "./finish-sound.mp3";

// todo
// 1. style input - done
// 2. space input - done
// 3. show high score only if meron - done
// 4. sort high score every time there is a new submission - done
// 7. when clicking start, replace whole screen with timer - done
// 11. add a countdown before the actual start. - done
// 8. add sound effects - done
// 9. Add ability to reset scores. - done
// 6. local storage - done
// 12. add 'ding' when done - done
// 14. deploy to github! - done
// add another state before the start time and the let the time running start. - done

// 10. Add date and time to high score.
// 5. mobile responsiveness - semi done
// 13. clean up this filthy code man
// 16. add database so people can access their scores.


function App() {
  const STARTING_TIME = 20;

  const [start, setStart] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScoreList, setHighScoreList] = useState(JSON.parse(localStorage.getItem('highScores')) || []);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(false);

  localStorage.setItem('highScores', JSON.stringify(highScoreList));
  
  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScoreList));
  }, [highScoreList])

  function startCountdown() {
    setIsCountdownRunning(true);
    countdownSong();
  }

  // adding sound effects
  const [countdownSong] = useSound(countdownSound, {
    playbackRate: 1,
    volume: 0.5,
  })

  const [timerSong, {stop} ] = useSound(startSound, {
    playbackRate: 1,
    volume: 0.5,
  })

  const [finishSong] = useSound(finishSound, {
    playbackRate: 1,
    volume: 0.5
  })

  // Countdown running
  useEffect(() => {
    if (isCountdownRunning && countdown > 0) {
      setTimeout(() => {
        setCountdown(prevTime => prevTime - 1)
      }, 1000);
    } else if (countdown === 0) {
      startGame();
    }
  }, [countdown, isCountdownRunning])
  
  function startGame() {
    setStart(true);
    setIsTimeRunning(true);
    setTimeout(() => {
      timerSong();
    }, 1000);
  }

  function resetGame() {
    setStart(false);
    setIsTimeRunning(false);
    setTimeRemaining(STARTING_TIME);
    setCountdown(3);
    countdownSong();
    setSubmittedScore(false);
  }
  
  // Starting and ending the game
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000);
    } else if (timeRemaining === 0) {
      stop();
      finishSong();
    }
  }, [timeRemaining, isTimeRunning])

  // Submitting the scores
  function submitScore(e) {
    e.preventDefault()
    setScore(0);
    setSubmittedScore(true);
    setHighScoreList(prevList => {
      // if more than 5, compare the number with the nums in the array. if greater, place. if not, remain the same.
      // same lang, and then cut to 6.
      const unsortedScoreList = [...prevList, score]
      const sortedScoreList = unsortedScoreList.sort((a, b) => b - a)
      return sortedScoreList.slice(0, 5);
    })
  }
  
  function handleChange(e) {
    const {value} = e.target
    setScore(value)
  }

  // only return top 5 scores and replace and filter.
  const scoreElements = highScoreList.map(score => {
    return (
      <li key={nanoid()}>{score} {score === "1" ? "pushup" : "pushups"}</li>
    )
  })

  return (
    <div className="main-text">

      {!start ? 
        <>
          <h1>Push-up Counter</h1>
          <p className="intro-text">Do as much pushups as you can in 20 seconds!</p>
          <p className="intro-text">Beat your high score and get GAINZ!</p>
          <hr></hr>
          {/* {isCountdownRunning ? <div className="countdown"><h1 className="countdown-text">Starting in {countdown}..</h1></div> : ""} */}
          <button 
            className="button" 
            onClick={startCountdown}
            disabled={isCountdownRunning}
            >
            {!isCountdownRunning ? "START!" : `Starting in ${countdown}...`}
          </button> 
        </>
        : timeRemaining === 0 ? "" : <div className="time-remaining"><h1 className="time-remaining-text">{timeRemaining}</h1></div>
      }

      {timeRemaining === 0 ? <form onSubmit={submitScore}>
        <h3>How many pushups did you do?</h3>
        <input className="input-number" type="number" min="0" onChange={handleChange}></input>
        <button className="submit-btn" disabled={submittedScore}>Submit</button>
        {submittedScore ? <button className="submit-btn" onClick={resetGame}>START AGAIN</button> : ""}
      </form> : ""}


      {highScoreList.length ? <div className="high-score">
        <h2>HIGH SCORE</h2>
        <ol className="center" start="1">
          {scoreElements}
        </ol>
      </div> : ""}

      <footer className="footer">
        <p>
          {/* Made by <a target="_blank" rel="noreferrer" href="https://kylebrandontan.com/">@kylebrandontan</a> */}
          Made by KT
        </p>
      </footer>
    </div>
  );
}

export default App;
