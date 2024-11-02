import { useState } from 'react';
import Answer from './Answer.jsx';
import Progress from './Progress.jsx';

export default function Question({
  question,
  answers,
  saveAnswer,
  nextQuestion,
}) {
  const [status, setStatus] = useState('');

  function handleSkippedAnswer() {
    saveAnswer(null);
    setStatus('SKIPPED');
  }

  function handleSubmitAnswer(answer) {
    saveAnswer(answer);
    setSelectedAnswer(answer.id);
    setStatus('ANSWERED');
  }

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <section id="question">
      {status !== '' ? (
        <Progress timer={1000} className="answered" onComplete={nextQuestion} />
      ) : null}

      {status === '' ? (
        <Progress timer={3000} onComplete={handleSkippedAnswer} />
      ) : null}

      <h2>{question}</h2>
      <ul id="answers">
        {answers.map(({ id, answer }) => (
          <li className="answer" key={answer}>
            <Answer
              id={id}
              answer={answer}
              selectedAnswer={selectedAnswer}
              submitAnswer={(userAnswer) =>
                handleSubmitAnswer({ id, answer: userAnswer })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
