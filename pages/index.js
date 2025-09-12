```javascript
import { useEffect, useState } from 'react';

export default function Home() {
  console.log("Home component mounted");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', { // Replace with your actual API endpoint
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (e) {
        console.error("Error fetching data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const MainScreen = () => {
    console.log("MainScreen component rendered");

    if (loading) {
      return <p>Loading data...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (!data) {
      return <p>No data to display.</p>
    }

    return (
      <>
        <h1>Main Screen</h1>
        {/* Example of displaying data.  Adjust based on your data structure */}
        {Array.isArray(data) ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </>
    );
  };


  return (
    <div>
      <MainScreen />
    </div>
  );
}
```
---[END_OF_FILES]---