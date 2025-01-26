import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Share2 } from 'lucide-react';
import './Frens.css';
import { useGameData } from '../hooks/useGameData';

function Frens() {
  const { gameData } = useGameData();
  const WebApp = useWebApp();

  const inviteFren = () => {
    const username = WebApp?.initDataUnsafe?.user?.username || 'player';
    const referralLink = `https://t.me/BugBountyGame?start=REF_${username}`;
    WebApp?.openTelegramLink?.(referralLink);
  };

  return (
    <div className="frens-container">
      <div className="frens-stats">
        <div className="stat-item">
          <span className="stat-label">Invited Friends</span>
          <span className="stat-value">{gameData.referralCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Bonus Points</span>
          <span className="stat-value">{gameData.referralPoints}</span>
        </div>
      </div>
      <h2>Frens</h2>
      <button className="invite-button" onClick={inviteFren}>
        <Share2 className="share-icon" />
        Invite Fren
      </button>
      <div className="frens-table">
        <div className="table-header">
          <div className="fren">Fren</div>
          <div className="record">Record</div>
        </div>
        {/* ... остальной код ... */}
      </div>
    </div>
  );
}

export default Frens; 