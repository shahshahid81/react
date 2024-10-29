import { useState, useRef } from 'react';

export default function Player() {
  /**
   * Here, we have a component where we have to store the playerName and show it in the header.
   * However, in the below setup, we are using state and once we set the name after button click, then the header also changes as soon as we change text in input.
   * Ideally we only want to change the playerName in header only once the button is submitted.
   * So, we have commented the places where we used useState and instead used useRef.
   * When we want a component to “remember” some information, but we don’t want that information to trigger new renders, we can use a ref.
   * useRef is a React Hook that lets us reference a value that’s not needed for rendering. The value persists between re renders.
   */

  const inputRef = useRef();

  const [playerName, setPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // function handleChangePlayerName(event) {
  // setSubmitted(false);
  // setPlayerName(event.target.value);
  // }

  function handleSubmitted() {
    //   setSubmitted(true);
    setPlayerName(inputRef.current.value);

    // Ref values are not tracked by react and we ideally shouldn't mutate it but it is fine here because we don't want the component to re render
    // But value shouldn't be read or written during the rendering process
    // React expects that the body of your component behaves like a pure function:
    // If the inputs (props, state, and context) are the same, it should return exactly the same JSX.
    // Calling it in a different order or with different arguments should not affect the results of other calls.
    // Reading or writing a ref during rendering breaks these expectations.
    inputRef.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input
          // ref is a prop that is available to us on all components like key. We can use it to get reference stored in the variable we have passed.
          ref={inputRef}
          type="text"
          // value={playerName}
          // onChange={handleChangePlayerName}
        />
        <button onClick={handleSubmitted}>Set Name</button>
      </p>
    </section>
  );
}
