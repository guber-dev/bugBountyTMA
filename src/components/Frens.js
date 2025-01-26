import React, { useState, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Share2 } from 'lucide-react';
import './Frens.css';

function Frens() {
  const [frens, setFrens] = useState([]);
  const WebApp = useWebApp();

  useEffect(() => {
    // В реальном приложении здесь будет запрос к бэкенду
    setFrens([
      { username: "fren1", record: 100 },
      { username: "fren2", record: 80 },
      { username: "fren3", record: 60 },
    ]);
  }, []);

  const inviteFren = () => {
    const username = WebApp?.initDataUnsafe?.user?.username || 'player';
    const referralLink = `https://t.me/BugBountyGame?start=REF_${username}`;
    WebApp?.openTelegramLink?.(referralLink);
  };

  return (
    <div className="frens-container">
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
        {frens.map((fren) => (
          <div key={fren.username} className="table-row">
            <div className="fren">{fren.username}</div>
            <div className="record">{fren.record}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Frens; 