import "./App.css";
import React from "react";
import { TicTacToeGame } from "./components/tic-tac-toe/TicTacToeGame";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { ConnectFourGame } from "./components/connect-four/ConnectFourGame";
import { BlackjackGame } from "./components/blackjack/BlackjackGame";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
                    <Route path="/connect-four" element={<ConnectFourGame />} />
                    <Route path="/blackjack" element={<BlackjackGame />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
