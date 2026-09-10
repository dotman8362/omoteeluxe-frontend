import { useState } from 'react';
import './AnnouncementBar.css';

function AnnouncementBar({ message }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <p className="announcement-bar__text">{message}</p>
      <button
        className="announcement-bar__close"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
      >
        &times;
      </button>
    </div>
  );
}

export default AnnouncementBar;