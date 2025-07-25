import React, { useState } from 'react';

const Recommendations = ({ token, onVideoSelect }) => {
  const [topic, setTopic] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/recommend?topic=${topic}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVideos(data.videos);
        setError('');
      } else {
        setError(data.error);
        setVideos([]);
      }
    } catch (err) {
      setError('Failed to fetch recommendations');
      setVideos([]);
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Find Videos by Topic</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Topic</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded">
          Find Videos
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-4">
        {videos.map(video => (
          <div key={video.url} className="flex items-center mb-2 p-2 border rounded cursor-pointer" onClick={() => onVideoSelect(video.url)}>
            <img src={video.thumbnail} alt={video.title} className="w-24 h-16 mr-4" />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
