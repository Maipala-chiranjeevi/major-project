import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ExamSelection from './components/ExamSelection';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [examSelected, setExamSelected] = useState(false);

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <Login setToken={setToken} />
        ) : (
          <Register setToken={setToken} />
        )}
        <div className="text-center mt-4">
          <button onClick={() => setShowLogin(!showLogin)} className="text-blue-600">
            {showLogin ? 'Need to register?' : 'Already have an account?'}
          </button>
        </div>
      </div>
    );
  }

  if (!examSelected) {
    return <ExamSelection token={token} setExamSelected={setExamSelected} />;
  }

  return <Dashboard token={token} />;
}

export default App;
