import React, { useState, useEffect, useCallback } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Bug, RefreshCw, Share2 } from 'lucide-react';
import './Game.css';

const GAME_DURATION = 10;
const MIN_BUGS = 9;
const SPAWN_DELAY = 500;

function Game({ onGameStateChange }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameActive, setGameActive] = useState(false);
  const [bugs, setBugs] = useState([]);
  const [taps, setTaps] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const WebApp = useWebApp();

  const generateBugPosition = () => ({
    id: Math.random(),
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 20,
    direction: Math.random() * 360,
  });

  const spawnBug = useCallback(() => {
    setBugs(currentBugs => [...currentBugs, generateBugPosition()]);
  }, []);

  const initializeBugs = useCallback(() => {
    const initialBugs = Array(MIN_BUGS).fill(null).map(generateBugPosition);
    setBugs(initialBugs);
  }, []);

  useEffect(() => {
    if (gameActive && bugs.length < MIN_BUGS) {
      const timer = setTimeout(spawnBug, SPAWN_DELAY);
      return () => clearTimeout(timer);
    }
  }, [gameActive, bugs.length, spawnBug]);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setGameOver(true);
      WebApp?.HapticFeedback?.notificationOccurred('success');
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft, WebApp]);

  useEffect(() => {
    if (gameActive) {
      const moveTimer = setInterval(() => {
        setBugs(currentBugs => 
          currentBugs.map(bug => ({
            ...bug,
            x: bug.x + Math.cos(bug.direction) * 2,
            y: bug.y + Math.sin(bug.direction) * 2,
            direction: 
              bug.x <= 10 || bug.x >= 90 || bug.y <= 20 || bug.y >= 80
                ? Math.random() * 360
                : bug.direction,
          }))
        );
      }, 50);
      return () => clearInterval(moveTimer);
    }
  }, [gameActive]);

  useEffect(() => {
    onGameStateChange(gameActive);
  }, [gameActive, onGameStateChange]);

  const startGame = () => {
    setScore(0);
    setTaps(0);
    setTimeLeft(GAME_DURATION);
    setGameActive(true);
    setGameOver(false);
    initializeBugs();
  };

  const handleBugClick = (bugId) => {
    if (gameActive) {
      setTaps(prev => prev + 1);
      setBugs(currentBugs => currentBugs.filter(bug => bug.id !== bugId));
      setScore(prev => prev + 1);
      WebApp?.HapticFeedback?.impactOccurred('medium');
    }
  };

  const shareResult = () => {
    const message = `I caught ${score} bugs in ${GAME_DURATION} seconds! Can you beat my score?`;
    WebApp?.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(message)}`);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="timer">{timeLeft}s</div>
      </div>
      <div className="game-area">
        {gameActive && bugs.map(bug => (
          <button
            key={bug.id}
            className="bug-button"
            style={{
              left: `${bug.x}%`,
              top: `${bug.y}%`,
            }}
            onClick={() => handleBugClick(bug.id)}
          >
            <Bug className="bug-icon" />
          </button>
        ))}
        {!gameActive && !gameOver && (
          <div className="game-message">Tap Start to play!</div>
        )}
        {gameOver && (
          <div className="game-stats">
            <div>Game Over!</div>
            <div>Bugs caught: {score}</div>
            <div>Total taps: {taps}</div>
            <div>Accuracy: {taps > 0 ? Math.round((score / taps) * 100) : 0}%</div>
          </div>
        )}
      </div>
      <div className="game-controls">
        {!gameActive && !gameOver && (
          <button className="start-button" onClick={startGame}>
            <RefreshCw className="refresh-icon" />
            Start Game
          </button>
        )}
        {gameActive && (
          <button className="smash-button" disabled>
            Smash the Bugs!
          </button>
        )}
        {gameOver && (
          <div className="game-over-buttons">
            <button className="play-again-button" onClick={startGame}>
              <RefreshCw className="refresh-icon" />
              Play Again
            </button>
            <button className="share-button" onClick={shareResult}>
              <Share2 className="share-icon" />
              Share Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game; 