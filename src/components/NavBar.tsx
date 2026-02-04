import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBarStyles.css";

export const NavBar: React.FC<{}> = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div>
        {process.env.REACT_APP_ENABLE_TICTACTOE && (
          <RegularNavItem label="Tic Tac Toe" />
        )}
        {process.env.REACT_APP_ENABLE_CONNECTFOUR && (
          <RegularNavItem label="Connect Four" />
        )}
        {process.env.REACT_APP_ENABLE_BLACKJACK && (
          <RegularNavItem label="Blackjack" />
        )}
        {process.env.REACT_APP_ENABLE_LIFE && <RegularNavItem label="Life" />}
        {process.env.REACT_APP_ENABLE_AVILA && <RegularNavItem label="Avila" />}
        {process.env.REACT_APP_AVILA_TILE_TEST && (
          <RegularNavItem label="Tile Tester" route="/avila-tile-test" />
        )}
      </div>
    </nav>
  );
};

interface RegularNavLinkProps {
  label: string;
  route?: string;
}

const RegularNavItem: React.FC<RegularNavLinkProps> = ({ label, route }) => {
  const path = route ?? `/${label.toLowerCase().replaceAll(" ", "-")}`;
  const { pathname } = useLocation();
  const isSelected = pathname.endsWith(path);
  return (
    <Link className={isSelected ? "selected" : ""} to={path}>
      {label}
    </Link>
  );
};
