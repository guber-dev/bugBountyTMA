import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к бэкенду
    setPlayers([
      { username: "player1", score: 150 },
      { username: "player2", score: 120 },
      { username: "player3", score: 100 },
    ]);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank">Rank</div>
          <div className="player">Player</div>
          <div className="score">Score</div>
        </div>
        {players.map((player, index) => (
          <div key={player.username} className="table-row">
            <div className="rank">{index + 1}</div>
            <div className="player">{player.username}</div>
            <div className="score">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard; 