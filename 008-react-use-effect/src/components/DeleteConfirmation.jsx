import { useEffect } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;
// const PROGRESS_INTERVAL = 10;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // const [remainingTime, setRemainingTime] = useState(TIMER);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRemainingTime((prevTime) => prevTime - PROGRESS_INTERVAL);
  //   }, PROGRESS_INTERVAL);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // });

  useEffect(() => {
    console.log('TIMER SET');
    // Confirm automatically after 3 seconds
    const timeoutId = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // Effect cleanup function which runs before the effect runs except the first time.
    // Here we should ideally write code that will cancel the operation performed by useEffect.
    // Here, we are clearing the timeout so that if the component is removed when user clicks on close, the useEffect should be cancelled.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    // Note that this is a function which is recreated every time by react so this will change everytime and will cause an infinite loop. Same will happen for function and objects which are also reference type values.
    onConfirm,
  ]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Created separate component to avoid re rendering the whole component and only render the progress bar component */}
      {/* <progress value={remainingTime} max={TIMER} /> */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}
