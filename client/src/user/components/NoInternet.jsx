import React from 'react';

const NoInternetModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    marginTop: '15px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    background: '#007bff',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>No Internet Connection</h2>
        <p>Please check your internet connection and try again.</p>
        <button style={buttonStyle} onClick={onClose}>Refresh</button>
      </div>
    </div>
  );
};

export default NoInternetModal;
