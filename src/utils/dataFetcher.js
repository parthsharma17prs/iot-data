import Papa from 'papaparse';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1NqyKaMTO9777tPJL_sjxJVxJocgogj0eby3a3Wqd6RQ/export?format=csv';

export const fetchTemperatureData = async () => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Parse data to format suitable for Recharts and display
          const parsedData = results.data.map(row => {
            const tempStr = row['Temperature'];
            const temp = tempStr ? parseFloat(tempStr) : null;
            
            return {
              time: row['Time'],
              timestamp: new Date(row['Time']).getTime(),
              temperature: temp
            };
          }).filter(row => row.temperature !== null && !isNaN(row.temperature));
          
          // Sort chronologically just in case
          parsedData.sort((a, b) => a.timestamp - b.timestamp);
          
          resolve(parsedData);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching temperature data:", error);
    throw error;
  }
};
