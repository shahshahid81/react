import { useEffect, useState } from 'react';

const INTERVAL = 10;

export default function Progress({ onComplete, timer, ...props }) {
  const [value, setValue] = useState(timer);

  useEffect(() => {
    if (value == 0) {
      onComplete();
    }
  }, [value]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prevValue) => prevValue - INTERVAL);
    }, INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [value]);

  return <progress {...props} value={value} max={timer} />;
}
