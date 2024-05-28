import React, { useState } from 'react';
import Challenge from './Challenge';
import Scoreboard from './Scoreboard';
import './App.css';

const App = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [operation, setOperation] = useState('all');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [isUserSet, setIsUserSet] = useState(false);

  const increaseLevel = () => {
    setLevel(level + 1);
  };

  const updateScore = (points) => {
    setScore(score + points);
  };

  const addHistory = (question, correct) => {
    setHistory([...history, { question, correct }]);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsUserSet(true);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const getHeaderStyle = () => {
    if (gender === 'male') {
      return { backgroundColor: '#ADD8E6' }; // Light blue
    } else if (gender === 'female') {
      return { backgroundColor: '#FFB6C1' }; // Light pink
    } else {
      return { backgroundColor: '#f0f8ff' }; // Light neutral color
    }
  };

  return (
    <div className="App">
      {!isUserSet ? (
        <div className="user-setup">
          <h1>Bem-vindo!</h1>
          <form onSubmit={handleStart}>
            <label>
              Nome:
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                required
              />
            </label>
            <label>
              Gênero:
              <select value={gender} onChange={handleGenderChange} required>
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </select>
            </label>
            <button type="submit">Iniciar</button>
          </form>
        </div>
      ) : (
        <header className="App-header" style={getHeaderStyle()}>
          <h1>Desafios Matemáticos</h1>
          <p>Bem-vindo, {userName}!</p>
          <label>
            Escolha a operação:
            <select value={operation} onChange={handleOperationChange}>
              <option value="all">Todas</option>
              <option value="+">Adição</option>
              <option value="-">Subtração</option>
              <option value="*">Multiplicação</option>
              <option value="/">Divisão</option>
            </select>
          </label>
          <Challenge
            level={level}
            increaseLevel={increaseLevel}
            updateScore={updateScore}
            addHistory={addHistory}
            operation={operation}
          />
          <Scoreboard score={score} history={history} />
        </header>
      )}
    </div>
  );
};

export default App;
