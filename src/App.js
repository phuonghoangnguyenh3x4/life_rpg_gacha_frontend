import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GachaGame from './GachaGame';
import Collection from './Collection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GachaGame />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </Router>
  );
}

export default App;
