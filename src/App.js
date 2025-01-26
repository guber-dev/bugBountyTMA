import React from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import './App.css';
import Game from './components/Game';

function App() {
  const WebApp = useWebApp();

  return (
    <div className="App">
      <header className="App-header">
        <h1>BugBounty Game</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App; 