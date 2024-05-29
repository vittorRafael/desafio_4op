import React from 'react';

const Scoreboard = ({ score, history }) => {
  return (
    <div>
      <h2>Pontuação: {score}</h2>
      <h3>Histórico de Respostas</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index} className={item.correct ? 'correct' : 'incorrect'}>
            <strong>Questão:</strong> {item.question} |{' '}
            <strong>Resposta do usuário:</strong> {item.userAnswer} |{' '}
            <strong>Resposta correta:</strong> {item.correctAnswer} -{' '}
            {item.correct ? 'Correto' : 'Incorreto'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
