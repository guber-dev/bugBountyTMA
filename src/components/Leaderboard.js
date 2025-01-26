import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useGameData } from '../hooks/useGameData';
import './Leaderboard.css';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const WebApp = useWebApp();
  const { gameData } = useGameData();

  const formatUsername = (username, index) => {
    if (username) return username;
    return `AnonBugCatcher${index + 1}`;
  };

  useEffect(() => {
    // Здесь должен быть запрос к CloudStorage для получения всех рекордов
    // Пока используем тестовые данные
    const currentUsername = WebApp?.initDataUnsafe?.user?.username || 'AnonBugCatcher1';
    const testPlayers = [
      { username: currentUsername, score: gameData.personalBest || 0 },
      { username: "BugHunter", score: 120 },
      { username: "ProCatcher", score: 100 },
      { username: formatUsername(null, 3), score: 95 },
      { username: formatUsername(null, 4), score: 80 },
    ].sort((a, b) => b.score - a.score); // Сортируем по убыванию очков

    setPlayers(testPlayers);
  }, [WebApp, gameData.personalBest]);

  const getUserRank = () => {
    const currentUsername = WebApp?.initDataUnsafe?.user?.username;
    return players.findIndex(p => p.username === currentUsername) + 1 || '-';
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Top Players</h2>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Your Best</span>
            <span className="stat-value">{gameData.personalBest}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Your Rank</span>
            <span className="stat-value">#{getUserRank()}</span>
          </div>
        </div>
      </div>
      <div className="leaderboard-table">
        {players.map((player, index) => (
          <div 
            key={player.username} 
            className={`table-row ${index < 3 ? 'top-three' : ''}`}
          >
            <div className="rank">
              {index + 1}
              {index < 3 && <span className="medal">🏆</span>}
            </div>
            <div className="player-info">
              <span className="username">{player.username}</span>
              <span className="score">{player.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard; 