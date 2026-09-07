import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const TemperatureDisplay = ({ latestTemp, previousTemp }) => {
  if (latestTemp === null || latestTemp === undefined) {
    return (
      <div className="glass-panel hero-temp-container">
        <h2 className="subtitle">Current Temperature</h2>
        <div className="hero-temp">--<span className="unit">°C</span></div>
      </div>
    );
  }

  const isRising = previousTemp !== null && latestTemp > previousTemp;
  const isFalling = previousTemp !== null && latestTemp < previousTemp;
  
  let statusClass = 'stable';
  let StatusIcon = Minus;
  let statusText = 'Stable';
  
  let tempClass = '';
  
  if (isRising) {
    statusClass = 'rising';
    StatusIcon = ArrowUpRight;
    statusText = 'Rising';
    tempClass = 'hot';
  } else if (isFalling) {
    statusClass = 'falling';
    StatusIcon = ArrowDownRight;
    statusText = 'Falling';
    tempClass = 'cold';
  }

  return (
    <div className="glass-panel hero-temp-container">
      <div className="live-badge">
        <div className="live-dot"></div>
        LIVE
      </div>
      <h2 className="subtitle">Current Temperature</h2>
      <div className={`hero-temp ${tempClass}`}>
        {latestTemp.toFixed(1)}<span className="unit">°C</span>
      </div>
      <div className={`status-indicator ${statusClass}`}>
        <StatusIcon size={20} />
        <span>{statusText}</span>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
