import { useState, useEffect } from 'react'
import { fetchTemperatureData } from './utils/dataFetcher'
import MetricDisplay from './components/MetricDisplay'
import MetricChart from './components/MetricChart'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let intervalId;

    const loadData = async () => {
      try {
        const fetchedData = await fetchTemperatureData();
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
    intervalId = setInterval(loadData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getLatest = (key) => {
    const valid = data.filter(d => d[key] !== null && d[key] !== undefined && !isNaN(d[key]));
    return valid.length > 0 ? valid[valid.length - 1][key] : null;
  };
  
  const getPrev = (key) => {
    const valid = data.filter(d => d[key] !== null && d[key] !== undefined && !isNaN(d[key]));
    return valid.length > 1 ? valid[valid.length - 2][key] : null;
  };

  return (
    <div className="dashboard-container" style={{ display: 'block', maxWidth: '1400px' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>IoT Sensor Dashboard</h1>
      
      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '12px', marginBottom: '2rem' }}>
          Error: {error}
        </div>
      )}
      
      <div className="metrics-grid" style={{ marginBottom: '3rem' }}>
        <MetricDisplay 
          title="Temperature" 
          latestValue={getLatest('temperature')} 
          previousValue={getPrev('temperature')} 
          unit="°C" 
          colorClass="temp" 
        />
        <MetricDisplay 
          title="Moisture" 
          latestValue={getLatest('moisture')} 
          previousValue={getPrev('moisture')} 
          unit="" 
          colorClass=""
          isBoolean={true}
        />
        <MetricDisplay 
          title="Ultrasonic" 
          latestValue={getLatest('ultrasonic')} 
          previousValue={getPrev('ultrasonic')} 
          unit="%" 
          colorClass="" 
        />
      </div>

      <div className="charts-container">
        <MetricChart 
          data={data} 
          dataKey="temperature" 
          name="Temperature (°C)" 
          color="#38bdf8" 
          gradientId="colorTemp" 
        />
        <MetricChart 
          data={data} 
          dataKey="moisture" 
          name="Moisture (1=TRUE, 0=FALSE)" 
          color="#34d399" 
          gradientId="colorMoist" 
        />
        <MetricChart 
          data={data} 
          dataKey="ultrasonic" 
          name="Ultrasonic (%)" 
          color="#a78bfa" 
          gradientId="colorUltra" 
        />
      </div>
    </div>
  )
}

export default App
