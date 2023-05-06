import React, { useState, useEffect } from 'react';
// import './Popup.css';

const Popup = ({ subscriptionPurchased, closePopup }) => {
  const [displayPopup, setDisplayPopup] = useState(false);

  useEffect(() => {
    if (subscriptionPurchased) {
      setDisplayPopup(true);
      setTimeout(() => {
        setDisplayPopup(false);
        closePopup();
      }, 2000); // Popup will be displayed for 3 seconds before closing
    }
  }, [subscriptionPurchased, closePopup]);

  return (
    <div className={`popup ${displayPopup ? 'active' : ''}`}>
      <div className="popup-content">
        <h2>Thank you for subscribing!</h2>
        <p>Your subscription is now active.</p>
      </div>
    </div>
  );
}

export default Popup;
