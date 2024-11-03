import { useState } from 'react';

export default function ConfigureCounter({ onSet }) {
  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      {/* Here, we are using state instead of ref so the component get's re executed on every key stroke. Instead, we removed the code from app and created a new component so that only this component will be re executed and the whole app won't be re executed */}
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
