import React from 'react';
import './../styles/Loading.css';

function Loading() {
  return (
    <div className="loading-container">
        <p className="loading-message">This may take a few minutes</p>
        <div className="spinner"></div>
    </div>
  );
}

export default Loading;
