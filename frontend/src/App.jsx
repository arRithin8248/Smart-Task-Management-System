import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Dashboard filter="all" pageTitle="My Tasks" />} />
        <Route path="/today" element={<Dashboard filter="today" pageTitle="Today" />} />
        <Route path="/upcoming" element={<Dashboard filter="upcoming" pageTitle="Upcoming" />} />
        <Route path="/completed" element={<Dashboard filter="completed" pageTitle="Completed" />} />
      </Routes>
    </Router>
  );
}

export default App;
