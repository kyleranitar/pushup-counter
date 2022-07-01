import React, {useState, useEffect} from "react";

import { nanoid } from "nanoid";
import useSound from "use-sound";

import countdownSound from "../sounds/countdown-timer.mp3";
import startSound from "../sounds/start-timer.mp3";
import finishSound from "../sounds/finish-sound.mp3";

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
// 13. clean up this filthy code man -done!


// 10. Add date and time to high score.
  // convert high score list array to object
// 5. mobile responsiveness - semi done
// 16. add database so people can access their scores.

function usePushupCounter(startingTime = 20) {
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


  const [start, setStart] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
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
    setTimeRemaining(startingTime);
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
      const unsortedScoreList = [...prevList, score]
      const sortedScoreList = unsortedScoreList.sort((a, b) => b - a)
      return sortedScoreList.slice(0, 5);
    })
  }
  
  // Saving input state
  function handleChange(e) {
    const {value} = e.target
    setScore(value)
  }

  const scoreElements = highScoreList.map(score => {
    return (
      <li key={nanoid()}>{score} {score === "1" ? "pushup" : "pushups"}</li>
    )
  })

  return {
    start,
    timeRemaining,
    isTimeRunning,
    score,
    highScoreList,
    countdown,
    isCountdownRunning,
    submittedScore,
    countdownSong,
    timerSong,
    finishSong,
    startCountdown,
    submitScore,
    handleChange,
    resetGame,
    scoreElements
  }
}

export default usePushupCounter;