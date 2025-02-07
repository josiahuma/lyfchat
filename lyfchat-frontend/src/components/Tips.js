import React, { useState } from 'react';
import axios from 'axios';

function Tips({ diagnosis }) {
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchTips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/symptoms/tips`, { diagnosis });
      const formattedTips = response.data.tips.split(/\d+\./).filter(Boolean); // Split numbered tips
      setTips(formattedTips);
    } catch (err) {
      setError('Unable to fetch tips. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tips-container">
      <h2>Health Tips</h2>
      <button onClick={fetchTips} disabled={loading}>
        {loading ? 'Fetching Tips...' : 'Get Tips'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {tips && (
        <ul className="tips-list">
          {tips.map((tip, index) => (
            <li key={index}>{tip.trim()}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tips;
