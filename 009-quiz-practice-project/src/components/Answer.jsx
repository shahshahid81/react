export default function Answer({ answer, id, submitAnswer, selectedAnswer }) {
  function handleSubmitAnswer() {
    if (selectedAnswer === null) {
      submitAnswer(answer);
    }
  }

  let currentClass = [];
  if (selectedAnswer !== null) {
    // For 1 second, we have to show selected state.
    if (selectedAnswer === id) {
      currentClass.push('selected');
      currentClass.push(id === 0 ? 'correct' : 'wrong');
    } else if (id === 0) {
      currentClass.push('correct');
    }
  }

  return (
    <button className={currentClass.join(' ')} onClick={handleSubmitAnswer}>
      {answer}
    </button>
  );
}
