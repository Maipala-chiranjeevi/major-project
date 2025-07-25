import React, { useState } from 'react';

const Quiz = ({ token, text }) => {
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuiz(data);
        setError('');
      } else {
        setError(data.error);
        setQuiz(null);
      }
    } catch (err) {
      setError('Failed to generate quiz');
      setQuiz(null);
    }
  };

  return (
    <div className="mt-4">
      <button onClick={handleGenerateQuiz} className="w-full py-2 text-white bg-purple-600 rounded">
        Generate Quiz & Flashcards
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {quiz && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">MCQs</h3>
          {quiz.mcqs.map((mcq, index) => (
            <div key={index} className="p-4 mb-2 bg-gray-100 rounded">
              <p className="font-semibold">{mcq.question}</p>
              <ul>
                {mcq.options.sort(() => Math.random() - 0.5).map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-4 mb-2">Flashcards</h3>
          {quiz.flashcards.map((flashcard, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded">
              <p className="font-semibold">{flashcard.question}</p>
              <p className="italic text-gray-600">{flashcard.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
