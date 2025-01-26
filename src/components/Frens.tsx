import React from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Share2, Users, Trophy } from 'lucide-react';
import './Frens.css';
import { useGameData } from '../hooks/useGameData';

const Frens = () => {
  const WebApp = useWebApp();
  const { gameData } = useGameData();
  const user = WebApp?.initDataUnsafe?.user;
  const referralLink = `https://t.me/BugBountyGameBot?start=ref_${user?.username}`;

  const handleShare = () => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(referralLink);
    } else {
      alert(`Your referral link: ${referralLink}`);
    }
  };

  return (
    <div className="frens-container">
      <div className="user-profile">
        {user?.photo_url && (
          <img 
            src={user.photo_url} 
            alt="Profile" 
            className="user-avatar"
          />
        )}
        <div className="user-name">
          {user?.first_name || 'Player'}
          {user?.username && <span className="user-username">@{user.username}</span>}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-value">{gameData.referralCount || 0}</div>
          <div className="stat-label">Friends Invited</div>
        </div>
        <div className="stat-card">
          <Trophy className="stat-icon" />
          <div className="stat-value">{gameData.referralPoints || 0}</div>
          <div className="stat-label">Bonus Points</div>
        </div>
      </div>

      <button className="share-button" onClick={handleShare}>
        <Share2 size={20} />
        Invite Friends
      </button>
    </div>
  );
};

export default Frens; 