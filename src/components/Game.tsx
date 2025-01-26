import React, { useState, useEffect, useCallback } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Bug, Share2, Timer, RefreshCw } from 'lucide-react';
import './Game.css';
import { useGameData } from '../hooks/useGameData';

interface GameProps {
  onGameStateChange: (isActive: boolean) => void;
}

interface BugType {
  id: number;
  x: number;
  y: number;
  direction: number;
}

const MIN_BUGS = 9;
const SPAWN_DELAY = 500;
const GAME_DURATION = 10;

const Game: React.FC<GameProps> = ({ onGameStateChange }) => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [bugs, setBugs] = useState<BugType[]>([]);
  const [taps, setTaps] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const WebApp = useWebApp();
  const { gameData, updateGameData } = useGameData();

  const generateBugPosition = useCallback((): BugType => ({
    id: Math.random(),
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 20,
    direction: Math.random() * 360,
  }), []);

  const spawnBug = useCallback(() => {
    setBugs(currentBugs => [...currentBugs, generateBugPosition()]);
  }, [generateBugPosition]);

  const initializeBugs = useCallback(() => {
    const initialBugs = Array(MIN_BUGS).fill(null).map(generateBugPosition);
    setBugs(initialBugs);
  }, [generateBugPosition]);

  const startGame = () => {
    setScore(0);
    setTaps(0);
    setTimeLeft(GAME_DURATION);
    setGameActive(true);
    setGameOver(false);
    initializeBugs();
    onGameStateChange(true);
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    onGameStateChange(false);
    // Здесь можно добавить сохранение результата
    if (score > (gameData.personalBest || 0)) {
      updateGameData({ personalBest: score });
    }
  };

  const handleAreaClick = () => {
    if (!gameActive && !gameOver) {
      startGame();
      return;
    }
    if (gameActive) {
      setMisses(prev => prev + 1);
      setTaps(prev => prev + 1);
    }
  };

  const handleBugClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const bugId = Number((e.currentTarget as HTMLDivElement).dataset.bugId);
    setBugs(currentBugs => currentBugs.filter(bug => bug.id !== bugId));
    setScore(prev => prev + 1);
    WebApp?.HapticFeedback?.impactOccurred('medium');
  };

  const shareResult = () => {
    const message = `I caught ${score} bugs! Can you beat my score?`;
    WebApp?.openTelegramLink?.(`https://t.me/share/url?url=${encodeURIComponent(message)}`);
  };

  // Таймер
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameActive]);

  // Эффект для движения жуков
  useEffect(() => {
    let moveTimer: NodeJS.Timeout | undefined;

    if (gameActive) {
      moveTimer = setInterval(() => {
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
    }

    return () => {
      if (moveTimer) {
        clearInterval(moveTimer);
      }
    };
  }, [gameActive]);

  // Эффект для спавна жуков
  useEffect(() => {
    let spawnTimer: NodeJS.Timeout | undefined;

    if (gameActive && bugs.length < MIN_BUGS) {
      spawnTimer = setInterval(spawnBug, SPAWN_DELAY);
    }

    return () => {
      if (spawnTimer) {
        clearInterval(spawnTimer);
      }
    };
  }, [gameActive, bugs.length, spawnBug]);

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="timer">
          <Timer size={18} />
          <span>{timeLeft}s</span>
        </div>
      </div>
      <div className="game-area" onClick={handleAreaClick}>
        {!gameActive && !gameOver && (
          <div className="game-message">Tap anywhere to start!</div>
        )}
        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Score: {score}</p>
            <p>Accuracy: {((score / taps) * 100 || 0).toFixed(1)}%</p>
            <p>Misses: {misses}</p>
            <div className="game-over-buttons">
              <button onClick={startGame} className="play-again-button">
                <RefreshCw size={20} /> Play Again
              </button>
              <button onClick={shareResult} className="share-button">
                <Share2 size={20} /> Share Score
              </button>
            </div>
          </div>
        )}
        {gameActive && bugs.map(bug => (
          <div
            key={bug.id}
            className="bug"
            data-bug-id={bug.id}
            style={{
              left: `${bug.x}%`,
              top: `${bug.y}%`,
              transform: `rotate(${bug.direction}deg)`
            }}
            onClick={handleBugClick}
          >
            <Bug size={24} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game; 