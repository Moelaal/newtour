import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) => {
    const newTour = tours.filter((t) => t.id !== id);
    setTours(newTour);
  };
  const fetchTours = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setTours(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h1>No more tours</h1>
          <div className="underline"></div>
          <button className="btn" onClick={() => fetchTours()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      {loading ? <Loading /> : <Tours tours={tours} removeTour={removeTour} />}
    </main>
  );
}

export default App;
