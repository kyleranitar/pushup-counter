import React from "react";

import usePushupCounter from "./hooks/usePushupCounter";

import Intro from "./components/Intro";
import RemainingTime from "./components/RemainingTime";
import SubmitForm from "./components/SubmitForm";
import HighScores from "./components/HighScores";
import Footer from "./components/Footer";

function App() {
  const {
    start,
    timeRemaining,
    highScoreList,
    countdown,
    isCountdownRunning,
    scoreElements,
    submittedScore,
    startCountdown,
    submitScore,
    handleChange,
    resetGame,
  } = usePushupCounter(1)

  return (
    <div className="main-text">
      {!start ? <Intro startCountdown={startCountdown} 
                       isCountdownRunning={isCountdownRunning} 
                       countdown={countdown} />
      : timeRemaining !== 0 && <RemainingTime timeRemaining={timeRemaining}/>}

      {timeRemaining === 0 && <SubmitForm submitScore={submitScore} 
                                          handleChange={handleChange} 
                                          submittedScore={submittedScore} 
                                          resetGame={resetGame}/>}

      {highScoreList.length && <HighScores scoreElements={scoreElements} />}

      <Footer />
    </div>
  );
}

export default App;