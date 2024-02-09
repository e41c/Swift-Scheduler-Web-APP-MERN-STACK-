// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUserRole('');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <header>
          <h1>Dance Studio</h1>
          {loggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </header>
        <Switch>
          <Route path="/login">
            <LoginPage onLogin={handleLogin} />
          </Route>
          <Route path="/home">
            {loggedIn ? (
              userRole === 'teacher' ? (
                <TeacherHome />
              ) : (
                <StudentHome />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Redirect to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

function LoginPage({ onLogin }) {
  const handleLogin = (role) => {
    // Simulate login API call
    onLogin(role);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin('teacher')}>Login as Teacher</button>
      <button onClick={() => handleLogin('student')}>Login as Student</button>
    </div>
  );
}

function StudentHome() {
  return (
    <div>
      <h2>Welcome, Student!</h2>
      <Link to="/classes">
        <button>View Classes</button>
      </Link>
      <Link to="/teachers">
        <button>View Teachers</button>
      </Link>
    </div>
  );
}

function TeacherHome() {
  return (
    <div>
      <h2>Welcome, Teacher!</h2>
      <Link to="/classes">
        <button>View Classes</button>
      </Link>
      <Link to="/students">
        <button>View Students</button>
      </Link>
    </div>
  );
}

export default App;
