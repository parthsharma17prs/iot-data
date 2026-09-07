import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const MetricDisplay = ({ title, latestValue, previousValue, unit, colorClass, isBoolean }) => {
  if (latestValue === null || latestValue === undefined || (typeof latestValue === 'number' && isNaN(latestValue))) {
    return (
      <div className="glass-panel hero-temp-container" style={{ padding: '2rem 1rem' }}>
        <h2 className="subtitle" style={{ marginBottom: '1rem' }}>{title}</h2>
        <div className="hero-temp" style={{ fontSize: '3rem' }}>--<span className="unit">{unit}</span></div>
      </div>
    );
  }

  const isRising = previousValue !== null && latestValue > previousValue;
  const isFalling = previousValue !== null && latestValue < previousValue;
  
  let statusClass = 'stable';
  let StatusIcon = Minus;
  let statusText = 'Stable';
  
  if (isRising && !isBoolean) {
    statusClass = 'rising';
    StatusIcon = ArrowUpRight;
    statusText = 'Rising';
  } else if (isFalling && !isBoolean) {
    statusClass = 'falling';
    StatusIcon = ArrowDownRight;
    statusText = 'Falling';
  }

  const valueColorClass = (isRising && colorClass === 'temp') ? 'hot' : (isFalling && colorClass === 'temp') ? 'cold' : colorClass;
  
  let displayValue;
  if (isBoolean) {
    displayValue = latestValue === 1 ? 'TRUE' : 'FALSE';
  } else {
    displayValue = typeof latestValue === 'number' ? latestValue.toFixed(1) : latestValue;
  }

  return (
    <div className="glass-panel hero-temp-container" style={{ padding: '2rem 1rem' }}>
      <div className="live-badge">
        <div className="live-dot"></div>
        LIVE
      </div>
      <h2 className="subtitle" style={{ marginBottom: '1rem' }}>{title}</h2>
      <div className={`hero-temp ${valueColorClass}`} style={{ fontSize: '3.5rem' }}>
        {displayValue}<span className="unit">{unit}</span>
      </div>
      {!isBoolean && (
        <div className={`status-indicator ${statusClass}`}>
          <StatusIcon size={20} />
          <span>{statusText}</span>
        </div>
      )}
    </div>
  );
};

export default MetricDisplay;
