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
          const parsedData = results.data.map(row => {
            const tempStr = row['Temperature'];
            const moistStr = row['Moisture'];
            const ultraStr = row['Ultrasonic (%)'];
            
            let moistVal = null;
            if (moistStr === 'TRUE') moistVal = 1;
            else if (moistStr === 'FALSE') moistVal = 0;
            else if (moistStr && !isNaN(parseFloat(moistStr))) moistVal = parseFloat(moistStr);

            return {
              time: row['Time'],
              timestamp: new Date(row['Time']).getTime(),
              temperature: tempStr ? parseFloat(tempStr) : null,
              moisture: moistVal,
              ultrasonic: ultraStr ? parseFloat(ultraStr) : null
            };
          }).filter(row => row.temperature !== null || row.moisture !== null || row.ultrasonic !== null);
          
          parsedData.sort((a, b) => a.timestamp - b.timestamp);
          
          resolve(parsedData);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
