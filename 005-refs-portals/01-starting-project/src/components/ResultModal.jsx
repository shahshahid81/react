import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

/*
forwardRef lets your component expose a DOM node to parent component with a ref.
React has key and ref prop reserved and we cannot use it as prop name. 
We can use any other name than ref, example, inputRef and use ref={inputRef} instead of forwardRef also.
forwardRef is more explicit and standard because it allows us to use ref keyword and keep the code more clean and readable and provide better type checking than using other custom name for ref.
*/
const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, handleReset },
  ref
) {
  // We created a ref that we are using internally on dialog
  const dialogRef = useRef();

  const userLost = timeRemaining <= 0;
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  // useImperativeHandle hook lets us customize the handle exposed as a ref.
  // Here, we are exposing open method so that we can provide only the methods we need to expose, making the ref loosely coupled
  useImperativeHandle(ref, () => {
    return {
      open() {
        // Using the internal dialogRef to showModal
        dialogRef.current.showModal();
      },
    };
  });

  // createPortal lets you render some children into a different part of the DOM.
  // A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events bubble up from children to parents according to the React tree.
  return createPortal(
    // <dialog ref={ref} className="result-modal">

    <dialog ref={dialogRef} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      {/* Inbuilt html way to close dialog */}
      <form method="dialog" onSubmit={handleReset} onClose={handleReset}>
        <button>Close</button>
      </form>
    </dialog>,
    // There is a div with id modal in index.html. The component will be mounted there instead of the place it is used.
    document.getElementById('modal')
  );
});

export default ResultModal;
