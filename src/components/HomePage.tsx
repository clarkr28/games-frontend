import React from "react";
import { GameCard } from "./GameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./HomePageStyles.css";

export const HomePage: React.FC<{}> = () => {
    const ticTacToeDisplay = (
        <div className="fourIconGrid">
            <FontAwesomeIcon icon={solid("x")} />
            <FontAwesomeIcon icon={solid("o")} />
            <FontAwesomeIcon icon={solid("o")} />
            <FontAwesomeIcon icon={solid("x")} />
        </div>
    );

    const connectFourDisplay = (
        <div className="fourIconGrid">
            <FontAwesomeIcon icon={solid("circle")} />
            <FontAwesomeIcon className="red" icon={solid("circle")} />
            <FontAwesomeIcon className="red" icon={solid("circle")} />
            <FontAwesomeIcon icon={solid("circle")} />
        </div>
    );

    return (
        <div className="homePageCardContainer">
            <GameCard
                buttonLabel="Play Tic Tac Toe"
                route="tic-tac-toe"
                display={ticTacToeDisplay}
            />
            <GameCard
                buttonLabel="Play Connect Four"
                route="connect-four"
                display={connectFourDisplay}
            />
        </div>
    );
};
