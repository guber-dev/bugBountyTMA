/// <reference types="react" />
import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Bug, Trophy, Users } from 'lucide-react';
import './App.css';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Frens from './components/Frens';

type Screen = 'play' | 'leaderboard' | 'frens';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('play');
  const WebApp = useWebApp();

  useEffect(() => {
    if (WebApp) {
      WebApp.expand();
      WebApp.ready();
    }
  }, [WebApp]);

  return (
    <div className="App">
      <main>
        {activeScreen === 'play' && <Game onGameStateChange={() => {}} />}
        {activeScreen === 'leaderboard' && <Leaderboard />}
        {activeScreen === 'frens' && <Frens />}
      </main>
      <nav className="nav-bar">
        <button 
          onClick={() => setActiveScreen('leaderboard')}
          className={activeScreen === 'leaderboard' ? 'active' : ''}
        >
          <Trophy className="nav-icon" />
          <span>Leaders</span>
        </button>
        <button 
          onClick={() => setActiveScreen('play')}
          className={activeScreen === 'play' ? 'active' : ''}
        >
          <Bug className="nav-icon" />
          <span>Play</span>
        </button>
        <button 
          onClick={() => setActiveScreen('frens')}
          className={activeScreen === 'frens' ? 'active' : ''}
        >
          <Users className="nav-icon" />
          <span>Friends</span>
        </button>
      </nav>
    </div>
  );
}

export default App; 