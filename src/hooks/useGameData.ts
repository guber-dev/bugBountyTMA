import { useState } from 'react';

export function useGameData() {
  const [gameData, setGameData] = useState({
    personalBest: 0,
    referralCount: 0,
    referralPoints: 0,
    referredBy: null,
  });

  const updateGameData = (newData: Partial<typeof gameData>) => {
    setGameData(prev => ({ ...prev, ...newData }));
  };

  return {
    gameData,
    updateGameData,
  };
} 