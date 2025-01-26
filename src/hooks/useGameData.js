import { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

export function useGameData() {
  const WebApp = useWebApp();
  const [gameData, setGameData] = useState({
    personalBest: 0,
    referralCount: 0,
    referralPoints: 0,
    referredBy: null,
  });

  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    try {
      const data = await WebApp.CloudStorage.getItem('gameData');
      if (data) {
        setGameData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const updateGameData = async (newData) => {
    try {
      const updatedData = { ...gameData, ...newData };
      await WebApp.CloudStorage.setItem('gameData', JSON.stringify(updatedData));
      setGameData(updatedData);
    } catch (error) {
      console.error('Error updating game data:', error);
    }
  };

  const processReferral = async (referralCode) => {
    if (!referralCode) return;
    
    const referrerUsername = referralCode.replace('REF_', '');
    if (referrerUsername === WebApp?.initDataUnsafe?.user?.username) return;

    try {
      // Обновляем данные реферера (того, кто пригласил)
      const referrerData = await WebApp.CloudStorage.getItem(`user_${referrerUsername}`);
      if (referrerData) {
        const parsedData = JSON.parse(referrerData);
        parsedData.referralPoints += 10;
        parsedData.referralCount += 1;
        await WebApp.CloudStorage.setItem(`user_${referrerUsername}`, JSON.stringify(parsedData));
      }

      // Сохраняем информацию о том, кто пригласил текущего игрока
      await updateGameData({ referredBy: referrerUsername });
    } catch (error) {
      console.error('Error processing referral:', error);
    }
  };

  return {
    gameData,
    updateGameData,
    processReferral,
  };
} 