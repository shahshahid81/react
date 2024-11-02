import Question from './Question.jsx';
import Summary from './Summary.jsx';
import QUIZ_QUESTIONS from '../quiz.js';
import { useState } from 'react';

const shuffledQuizQuestions = QUIZ_QUESTIONS.map((question) => {
  return {
    ...question,
    answers: question.answers
      .map((answer, index) => ({
        id: index,
        answer,
      }))
      .sort(() => Math.random() - 0.5),
  };
});

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState({});

  function handleSaveAnswer(questionId, payload) {
    setResult((prevResult) => {
      const newResult = { ...prevResult };
      newResult[questionId] = {
        answer: payload?.answer ?? null,
        isCorrect: payload?.id === 0,
      };
      return newResult;
    });
  }

  let content = null;
  if (currentQuestionIndex >= shuffledQuizQuestions.length) {
    content = <Summary result={result} />;
  } else {
    const props = {
      ...shuffledQuizQuestions[currentQuestionIndex],
      answers: [...shuffledQuizQuestions[currentQuestionIndex].answers],
    };
    content = (
      <Question
        {...props}
        key={props.id}
        saveAnswer={(answer) => handleSaveAnswer(props.id, answer)}
        nextQuestion={() =>
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        }
      />
    );
  }

  return <section id="quiz">{content}</section>;
}
