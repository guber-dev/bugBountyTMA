import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Bug, Trophy, Users } from 'lucide-react';
import './App.css';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Frens from './components/Frens';

function App() {
  const [activeScreen, setActiveScreen] = useState('play');
  const WebApp = useWebApp();

  useEffect(() => {
    // Разворачиваем приложение на весь экран при запуске
    WebApp?.expand();
  }, [WebApp]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>BugBounty Game</h1>
      </header>
      <main>
        {activeScreen === 'play' && <Game />}
        {activeScreen === 'leaderboard' && <Leaderboard />}
        {activeScreen === 'frens' && <Frens />}
      </main>
      <nav className="nav-bar">
        <button onClick={() => setActiveScreen('leaderboard')}>
          <Trophy className="nav-icon" />
        </button>
        <button onClick={() => setActiveScreen('play')}>
          <Bug className="nav-icon" />
        </button>
        <button onClick={() => setActiveScreen('frens')}>
          <Users className="nav-icon" />
        </button>
      </nav>
    </div>
  );
}

export default App; 