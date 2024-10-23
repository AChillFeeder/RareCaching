import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './views/Layout';
import Dashboard from './views/Dashboard';
import Game from './views/Game';
import CreateGame from './views/CreateGame';
import Profile from './views/Profile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Game/:id" element={<Game/>} />
          <Route path="/CreateGame" element={<CreateGame/>} />
          <Route path="/Profile" element={<Profile/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
