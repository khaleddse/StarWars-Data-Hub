import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MoviesGrid from './components/CardGrid/CardGrid';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MoviesGrid />
    </div>
  );
}

export default App;
