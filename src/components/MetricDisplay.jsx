import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const MetricDisplay = ({ title, latestValue, previousValue, unit, colorClass }) => {
  if (latestValue === null || latestValue === undefined || isNaN(latestValue)) {
    return (
      <div className="glass-panel hero-temp-container">
        <h2 className="subtitle">{title}</h2>
        <div className="hero-temp" style={{ fontSize: '4rem' }}>--<span className="unit">{unit}</span></div>
      </div>
    );
  }

  const isRising = previousValue !== null && latestValue > previousValue;
  const isFalling = previousValue !== null && latestValue < previousValue;
  
  let statusClass = 'stable';
  let StatusIcon = Minus;
  let statusText = 'Stable';
  
  if (isRising) {
    statusClass = 'rising';
    StatusIcon = ArrowUpRight;
    statusText = 'Rising';
  } else if (isFalling) {
    statusClass = 'falling';
    StatusIcon = ArrowDownRight;
    statusText = 'Falling';
  }

  // Use the passed colorClass (e.g. 'hot', 'cold', or a custom one) or default to empty
  const valueColorClass = (isRising && colorClass === 'temp') ? 'hot' : (isFalling && colorClass === 'temp') ? 'cold' : colorClass;

  return (
    <div className="glass-panel hero-temp-container">
      <div className="live-badge">
        <div className="live-dot"></div>
        LIVE
      </div>
      <h2 className="subtitle">{title}</h2>
      <div className={`hero-temp ${valueColorClass}`} style={{ fontSize: '4rem' }}>
        {latestValue.toFixed(1)}<span className="unit">{unit}</span>
      </div>
      <div className={`status-indicator ${statusClass}`}>
        <StatusIcon size={20} />
        <span>{statusText}</span>
      </div>
    </div>
  );
};

export default MetricDisplay;
