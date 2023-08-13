import "./App.css";
import React from "react";
import { TicTacToeGame } from "./components/tic-tac-toe/TicTacToeGame";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { ConnectFourGame } from "./components/connect-four/ConnectFourGame";
import { BlackjackGame } from "./components/blackjack/BlackjackGame";
import { LifeGame } from "./components/life/LifeGame";
import { AvilaGame } from "./components/carcassonne/AvilaGame/AvilaGame";
import { TileTester } from "./components/carcassonne/TileTester/TileTester";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {process.env.REACT_APP_ENABLE_TICTACTOE && (
                        <Route
                            path="/tic-tac-toe"
                            element={<TicTacToeGame />}
                        />
                    )}
                    {process.env.REACT_APP_ENABLE_CONNECTFOUR && (
                        <Route
                            path="/connect-four"
                            element={<ConnectFourGame />}
                        />
                    )}
                    {process.env.REACT_APP_ENABLE_BLACKJACK && (
                        <Route path="/blackjack" element={<BlackjackGame />} />
                    )}
                    {process.env.REACT_APP_ENABLE_LIFE && (
                        <Route path="/life" element={<LifeGame />} />
                    )}
                    {process.env.REACT_APP_ENABLE_CARCASSONNE && (
                        <Route path="/avila" element={<AvilaGame />} />
                    )}
                    {process.env.REACT_APP_AVILA_TILE_TEST && (
                        <Route
                            path="/avila-tile-test"
                            element={<TileTester />}
                        />
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
