import React from 'react';
import {Link} from 'react-router-dom'

export const NavBar: React.FC<{}> = () => {
   return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/tic-tac-toe">Tic Tac Toe</Link>
    </nav>
   ) 
}