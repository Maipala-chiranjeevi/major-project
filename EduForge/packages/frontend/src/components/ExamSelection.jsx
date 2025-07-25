import React, { useState } from 'react';

const ExamSelection = ({ token, setExamSelected }) => {
  const [exam, setExam] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/select-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ exam }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        setExamSelected(true);
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('Failed to save selection');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Select Your Exam</h2>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <div className="mb-4">
          <label className="block mb-1">Exam</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            <option value="">Select an exam</option>
            <option value="GATE">GATE</option>
            <option value="JEE">JEE</option>
            <option value="NEET">NEET</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded">
          Save Selection
        </button>
      </form>
    </div>
  );
};

export default ExamSelection;
