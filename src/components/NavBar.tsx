import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";

export const NavBar: React.FC<{}> = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            {process.env.REACT_APP_ENABLE_TICTACTOE && (
                <Link to="/tic-tac-toe">Tic Tac Toe</Link>
            )}
            {process.env.REACT_APP_ENABLE_CONNECTFOUR && (
                <Link to="/connect-four">Connect Four</Link>
            )}
            {process.env.REACT_APP_ENABLE_BLACKJACK && (
                <Link to="/blackjack">Blackjack</Link>
            )}
            {process.env.REACT_APP_ENABLE_LIFE && <Link to="/life">Life</Link>}
            {process.env.REACT_APP_ENABLE_CARCASSONNE && (
                <Link to="/avila">Avila</Link>
            )}
        </nav>
    );
};
