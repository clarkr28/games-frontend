import React from "react";
import { Link } from "react-router-dom";
import "./GameCardStyles.css";

export interface GameCardProps {
    buttonLabel: string;
    route: string;
    display: JSX.Element;
}

export const GameCard: React.FC<GameCardProps> = (props) => {
    const { buttonLabel, route, display } = props;
    return (
        <div className="gameCardContainer">
            <div className="gameCardIconSection">{display}</div>
            <div>
                <Link to={`/${route}`}>{buttonLabel}</Link>
            </div>
        </div>
    );
};
