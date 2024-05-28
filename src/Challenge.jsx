import React, { useState, useEffect } from 'react';

const Challenge = ({
  level,
  increaseLevel,
  updateScore,
  addHistory,
  operation,
}) => {
  const [question, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    generateQuestion();
  }, [level, operation]);

  const generateQuestion = () => {
    const operations = operation === 'all' ? ['+', '-', '*', '/'] : [operation];
    const chosenOperation =
      operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, questionText, answer;

    do {
      num1 = Math.floor(Math.random() * (10 * level)) + 1;
      num2 = Math.floor(Math.random() * (10 * level)) + 1;
      questionText = `${num1} ${chosenOperation} ${num2}`;
      answer = eval(questionText);

      if (chosenOperation === '/') {
        questionText = `${num1 * num2} / ${num2}`;
        answer = num1;
      }
    } while (answer < 0 || !Number.isInteger(answer));

    setQuestion({ text: questionText, answer: parseFloat(answer.toFixed(2)) });
    setUserAnswer('');
    setCorrectAnswer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(userAnswer) === question.answer) {
      setCorrectAnswer(true);
      increaseLevel();
      updateScore(10);
      addHistory(question.text, true);
    } else {
      setCorrectAnswer(false);
      updateScore(-5);
      addHistory(question.text, false);
    }
  };

  return (
    <div>
      <p style={{ fontSize: '1.5em', color: '#4b0082' }}>Nível: {level}</p>
      <p style={{ fontSize: '1.5em', color: '#4b0082' }}>
        Resolva: {question.text}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          step="0.01"
        />
        <button type="submit">Enviar</button>
      </form>
      {correctAnswer === true && <p className="correct">Resposta Correta!</p>}
      {correctAnswer === false && (
        <p className="incorrect">Resposta Incorreta. Tente novamente!</p>
      )}
    </div>
  );
};

export default Challenge;
