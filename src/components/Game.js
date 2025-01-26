import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import './Game.css';

function Game() {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);
  const WebApp = useWebApp();

  useEffect(() => {
    // Получаем данные пользователя при загрузке
    if (WebApp?.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    }

    // Устанавливаем основной цвет кнопки
    WebApp?.setHeaderColor('secondary_bg_color');
  }, [WebApp]);

  const catchBug = () => {
    setScore(prevScore => {
      const newScore = prevScore + 1;
      // Отправляем данные в Telegram
      WebApp?.CloudStorage?.setItem('score', newScore.toString());
      return newScore;
    });

    // Добавляем небольшую вибрацию при нажатии
    WebApp?.HapticFeedback?.impactOccurred('medium');
  };

  return (
    <div className="game-container">
      {user && (
        <div className="user-info">
          Welcome, {user.first_name}!
        </div>
      )}
      <div className="score">Score: {score}</div>
      <button className="catch-button" onClick={catchBug}>
        Catch Bug! 🦗
      </button>
    </div>
  );
}

export default Game; 