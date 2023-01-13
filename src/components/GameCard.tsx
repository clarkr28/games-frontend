import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GameCardStyles.css";

export interface GameCardProps {
    buttonLabel: string;
    route: string;
    display: JSX.Element;
}

export const GameCard: React.FC<GameCardProps> = (props) => {
    const { buttonLabel, route, display } = props;
    const navigate = useNavigate();
    const routeFormatted = `/${route}`;

    return (
        <div
            className="gameCardContainer"
            onClick={() => navigate(routeFormatted)}
        >
            <div className="gameCardIconSection">{display}</div>
            <div>
                <Link to={routeFormatted}>{buttonLabel}</Link>
            </div>
        </div>
    );
};
