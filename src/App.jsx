import React, { useState, useEffect } from 'react';
import Challenge from './Challenge';
import Scoreboard from './Scoreboard';
import './App.css';

const App = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [operation, setOperation] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [isUserSet, setIsUserSet] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const limitPoints = 100;

  useEffect(() => {
    if (startTime && score < limitPoints) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, score]);

  useEffect(() => {
    if (score >= limitPoints) {
      setIsFinished(true);
    }
  }, [score]);

  const increaseLevel = () => {
    setLevel(level + 1);
  };

  const updateScore = (points) => {
    if (score + points <= limitPoints) {
      setScore(score + points);
    } else {
      setScore(limitPoints);
    }
  };

  const addHistory = (question, userAnswer, correctAnswer, correct) => {
    setHistory([...history, { question, userAnswer, correctAnswer, correct }]);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsUserSet(true);
    setStartTime(new Date().getTime());
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const getThemeClass = () => {
    if (gender === 'male') {
      return 'App boy';
    } else if (gender === 'female') {
      return 'App girl';
    } else {
      return 'App neutral';
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? hours + ' hora' + (hours !== 1 ? 's ' : ' ') : ''}${
      minutes > 0 ? minutes + ' minuto' + (minutes !== 1 ? 's ' : ' ') : ''
    }${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <div className={getThemeClass()}>
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
            <label>
              Escolha a operação:
              <select value={operation} onChange={handleOperationChange}>
                <option value="">Selecione</option>
                <option value="+">Adição</option>
                <option value="-">Subtração</option>
                <option value="*">Multiplicação</option>
                <option value="/">Divisão</option>
              </select>
            </label>
            <button type="submit">Iniciar</button>
          </form>
        </div>
      ) : (
        <header>
          <h1>Desafios Matemáticos</h1>

          {isFinished ? (
            <div>
              <h2>Parabéns, {userName}!</h2>
              <p>
                Você alcançou a pontuação máxima de{' '}
                <strong>{limitPoints}</strong> pontos em{' '}
                <strong>{formatTime(elapsedTime)}.</strong>
              </p>
              <Scoreboard score={score} history={history} />
              <button onClick={handleRestart}>Iniciar Novamente</button>
            </div>
          ) : (
            <div>
              <p>Bem-vindo, {userName}!</p>
              <p>Tempo decorrido: {formatTime(elapsedTime)}</p>
              <Challenge
                level={level}
                increaseLevel={increaseLevel}
                updateScore={updateScore}
                addHistory={addHistory}
                operation={operation}
                isFinished={isFinished}
              />
              <Scoreboard score={score} history={history} />
            </div>
          )}
        </header>
      )}
    </div>
  );
};

export default App;
