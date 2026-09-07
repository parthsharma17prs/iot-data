import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '10px',
        borderRadius: '8px',
        color: '#fff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
      }}>
        <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#94a3b8' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '3px 0', fontWeight: 'bold', color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const MetricChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <p style={{ color: '#94a3b8' }}>Loading chart data...</p>
      </div>
    );
  }

  // Format time for X-axis
  const formattedData = data.map(item => {
    const date = new Date(item.timestamp);
    return {
      ...item,
      timeFormatted: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  });

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <h2 className="subtitle">Historical Trends</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUltra" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis 
              dataKey="timeFormatted" 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              tickMargin={10}
              minTickGap={30}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              domain={['auto', 'auto']}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              name="Temperature (°C)"
              dataKey="temperature" 
              stroke="#38bdf8" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              animationDuration={500}
              connectNulls
            />
            <Area 
              type="monotone" 
              name="Moisture"
              dataKey="moisture" 
              stroke="#34d399" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorMoisture)" 
              animationDuration={500}
              connectNulls
            />
            <Area 
              type="monotone" 
              name="Ultrasonic (%)"
              dataKey="ultrasonic" 
              stroke="#a78bfa" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorUltra)" 
              animationDuration={500}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricChart;
