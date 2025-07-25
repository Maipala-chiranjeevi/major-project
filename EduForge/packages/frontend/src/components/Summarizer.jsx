import React, { useState } from 'react';

const Summarizer = ({ token, text }) => {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
        setError('');
      } else {
        setError(data.error);
        setSummary('');
      }
    } catch (err) {
      setError('Failed to summarize');
      setSummary('');
    }
  };

  return (
    <div className="mt-4">
      <button onClick={handleSummarize} className="w-full py-2 text-white bg-green-600 rounded">
        Summarize Transcript
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Summary</h3>
          <p className="p-4 bg-gray-100 rounded">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
