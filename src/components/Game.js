import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Bug, RefreshCw } from 'lucide-react';
import './Game.css';

function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(69);
  const [gameActive, setGameActive] = useState(false);
  const [bugPosition, setBugPosition] = useState({ x: 50, y: 50 });
  const [lastRecord, setLastRecord] = useState(0);
  const WebApp = useWebApp();

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (score > lastRecord) {
        setLastRecord(score);
        WebApp?.CloudStorage?.setItem('lastRecord', score.toString());
      }
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft, score, lastRecord, WebApp]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(69);
    setGameActive(true);
    moveBug();
  };

  const moveBug = () => {
    setBugPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    });
  };

  const handleBugClick = () => {
    if (gameActive) {
      setScore((prevScore) => prevScore + 1);
      moveBug();
      WebApp?.HapticFeedback?.impactOccurred('medium');
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="timer">{timeLeft}s</div>
      </div>
      <div className="last-record">Last record: {lastRecord}</div>
      <div className="game-area">
        {gameActive && (
          <button
            className="bug-button"
            style={{
              left: `${bugPosition.x}%`,
              top: `${bugPosition.y}%`,
            }}
            onClick={handleBugClick}
          >
            <Bug className="bug-icon" />
          </button>
        )}
        {!gameActive && (
          <div className="game-message">
            {score > 0 ? `Game Over! Score: ${score}` : "Tap Start to play!"}
          </div>
        )}
      </div>
      <button className="start-button" onClick={startGame} disabled={gameActive}>
        <RefreshCw className="refresh-icon" />
        {score > 0 ? "Play Again" : "Start Game"}
      </button>
    </div>
  );
}

export default Game; 