import QUIZ_QUESTIONS from '../quiz';
import quizComplete from '../assets/quiz-complete.png';

function calculatePercentage(value, total) {
  return Math.round((value / total) * 100);
}

export default function Summary({ result }) {
  let skipped = 0;
  let correctlyAnswered = 0;
  let inCorrectlyAnswered = 0;

  Object.values(result).forEach((value) => {
    if (value.answer === null) {
      skipped++;
    } else if (value.isCorrect) {
      correctlyAnswered++;
    } else {
      inCorrectlyAnswered++;
    }
  });

  return (
    <section id="summary">
      <img src={quizComplete} alt="Trophy logo" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {calculatePercentage(skipped, Object.keys(result).length)}%
          </span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">
            {calculatePercentage(correctlyAnswered, Object.keys(result).length)}
            %
          </span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">
            {calculatePercentage(
              inCorrectlyAnswered,
              Object.keys(result).length
            )}
            %
          </span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>

      <ol>
        {Object.values(result).map((data, index) => (
          <li key={index}>
            <h3>{index + 1}</h3>
            <p className="question">{QUIZ_QUESTIONS[index].question}</p>
            <p
              className={`user-answer ${
                data.answer === null
                  ? 'skipped'
                  : data.isCorrect
                  ? 'correct'
                  : 'wrong'
              }`}
            >
              {data.answer ?? ''}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
