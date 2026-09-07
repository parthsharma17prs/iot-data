import { useState, useEffect } from 'react'
import { fetchTemperatureData } from './utils/dataFetcher'
import TemperatureDisplay from './components/TemperatureDisplay'
import TemperatureChart from './components/TemperatureChart'

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

    // Initial load
    loadData();

    // Poll every 5 seconds (5000ms)
    intervalId = setInterval(loadData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const latestTemp = data.length > 0 ? data[data.length - 1].temperature : null;
  const previousTemp = data.length > 1 ? data[data.length - 2].temperature : null;

  return (
    <div className="dashboard-container">
      <div>
        <h1 style={{ marginBottom: '2rem' }}>Server Room Dashboard</h1>
        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '12px', marginBottom: '2rem' }}>
            Error: {error}
          </div>
        )}
        <TemperatureDisplay latestTemp={latestTemp} previousTemp={previousTemp} />
      </div>
      <div>
        <TemperatureChart data={data} />
      </div>
    </div>
  )
}

export default App
