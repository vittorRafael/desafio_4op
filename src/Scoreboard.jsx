/* eslint-disable react/prop-types */
import React from 'react';

const Scoreboard = ({ score, history }) => {
  return (
    <div>
      <h2>Pontuação: {score}</h2>
      <h3>Histórico de Respostas</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.question} - {item.correct ? 'Correto' : 'Incorreto'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
