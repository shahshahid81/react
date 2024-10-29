import { useState, useRef } from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const targetTimeMillis = targetTime * 1000;
  const [timeRemaining, setTimeRemaining] = useState(targetTimeMillis);
  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTimeMillis;

  const timer = useRef();
  const dialogRef = useRef();

  if (timeRemaining <= 0) {
    clearInterval(timer.current);

    dialogRef.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTimeMillis);
  }

  function handleStart() {
    // The below method is only when we don't want the dialog to open after expiring the timer.
    // The code is still valid and can be referred
    // timer.current = setTimeout(() => {
    //   setTimerExpired(true);
    //   // Using imperative handle's open method
    //   dialogRef.current.open();
    //   // // inbuilt html method to display modal
    //   // dialogRef.current.showModal();
    // }, targetTime * 1000);
    // setTimerStarted(true);

    const timeToDeduct = 10;
    timer.current = setInterval(() => {
      setTimeRemaining((previousTimer) => previousTimer - timeToDeduct);
    }, timeToDeduct);
  }

  function handleStop() {
    // clearTimeout(timer.current);
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  return (
    <>
      <ResultModal
        timeRemaining={timeRemaining}
        ref={dialogRef}
        targetTime={targetTime}
        handleReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isTimerActive ? 'active' : undefined}>
          {isTimerActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
