import React, { useState } from 'react';
import Transcript from './Transcript';
import Recommendations from './Recommendations';

const Dashboard = ({ token }) => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Recommendations token={token} onVideoSelect={setSelectedVideoUrl} />
      <Transcript token={token} url={selectedVideoUrl} />
    </div>
  );
};

export default Dashboard;
