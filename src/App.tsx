import './App.css';
import React from 'react';
import { TicTacToeGame } from './components/tic-tac-toe/TicTacToeGame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
