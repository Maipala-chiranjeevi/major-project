import React, { useState } from 'react';
import Summarizer from './Summarizer';
import Quiz from './Quiz';

import React, { useState, useEffect } from 'react';
import Summarizer from './Summarizer';
import Quiz from './Quiz';

const Transcript = ({ token, url }) => {
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (url) {
      const fetchTranscript = async () => {
        try {
          const response = await fetch('/transcript', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ url }),
          });
          const data = await response.json();
          if (response.ok) {
            setTranscript(data.transcript.map(t => t.text).join(' '));
            setError('');
          } else {
            setError(data.error);
            setTranscript('');
          }
        } catch (err) {
          setError('Failed to fetch transcript');
          setTranscript('');
        }
      };
      fetchTranscript();
    }
  }, [url, token]);

  return (
    <div className="p-8 bg-white rounded shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Transcript</h2>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {transcript && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Transcript</h3>
          <p className="p-4 bg-gray-100 rounded">{transcript}</p>
          <Summarizer token={token} text={transcript} />
          <Quiz token={token} text={transcript} />
        </div>
      )}
    </div>
  );
};

export default Transcript;
