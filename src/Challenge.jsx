import React, { useState, useEffect } from 'react';

const Challenge = ({
  level,
  increaseLevel,
  updateScore,
  addHistory,
  operation,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [correct, setCorrect] = useState(null);
  const [lastAnswer, setLastAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
  }, [level, operation]);

  const generateQuestion = () => {
    let num1, num2, op;
    const operations = operation === 'all' ? ['+', '-', '*', '/'] : [operation];
    op = operations[Math.floor(Math.random() * operations.length)];

    if (op === '+') {
      num1 = Math.floor(Math.random() * level * 10) + 1;
      num2 = Math.floor(Math.random() * level * 10) + 1;
    } else if (op === '-') {
      num1 = Math.floor(Math.random() * level * 10) + 1;
      num2 = Math.floor(Math.random() * num1) + 1; // num2 should be less than num1 to avoid negative answers
    } else if (op === '*') {
      num1 = Math.floor(Math.random() * level) + 1;
      num2 = Math.floor(Math.random() * level) + 1;
    } else if (op === '/') {
      num2 = Math.floor(Math.random() * level) + 1;
      num1 = num2 * (Math.floor(Math.random() * level) + 1); // Ensure num1 is divisible by num2
    }

    setQuestion(`${num1} ${op} ${num2}`);
    setAnswer(eval(`${num1} ${op} ${num2}`).toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = parseFloat(userAnswer) === parseFloat(answer);
    setCorrect(isCorrect);
    setLastAnswer(answer);
    addHistory(question, userAnswer, answer, isCorrect);
    if (isCorrect) {
      updateScore(10);
      increaseLevel();
    }
    setUserAnswer('');
    generateQuestion();
  };

  return (
    <div>
      <h2>Questão: {question}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          required
        />
        <button type="submit">Responder</button>
      </form>
      {correct === true && <p className="correct">Correto!</p>}
      {correct === false && (
        <p className="incorrect">
          Incorreto! A resposta certa era {lastAnswer}
        </p>
      )}
    </div>
  );
};

export default Challenge;
