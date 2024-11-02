import { useCallback, useMemo, useState } from 'react';
import Answer from './Answer.jsx';
import Progress from './Progress.jsx';

export default function Question({ text, answers, saveAnswer, nextQuestion }) {
  const [status, setStatus] = useState('');

  function handleProgressComplete() {
    saveAnswer(null);
    if (status === '') {
      setStatus('SKIPPED');
    }
    nextQuestion();
  }

  function handleSubmitAnswer(answer) {
    saveAnswer(answer);
    setSelectedAnswer(answer.id);
    setStatus('ANSWERED');
  }

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <section id="question">
      <Progress
        timer={status === 'ANSWERED' ? 1000 : 3000}
        className={`${status === 'ANSWERED' ? 'answered' : ''}`}
        onComplete={handleProgressComplete}
      />
      <h2>{text}</h2>
      <ul id="answers">
        {answers.map(({ id, answer }) => (
          <li className="answer" key={answer}>
            <Answer
              id={id}
              answer={answer}
              selectedAnswer={selectedAnswer}
              submitAnswer={handleSubmitAnswer}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
