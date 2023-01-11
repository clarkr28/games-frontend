import React from 'react';
import {Link} from 'react-router-dom';
import './NavBarStyles.css';

export const NavBar: React.FC<{}> = () => {
   return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        <Link to="/connect-four">Connect Four</Link>
    </nav>
   ) 
}