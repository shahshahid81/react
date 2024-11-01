import { useEffect, useState } from 'react';

const PROGRESS_INTERVAL = 10;

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - PROGRESS_INTERVAL);
    }, PROGRESS_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  });

  return <progress value={remainingTime} max={timer} />;
}
