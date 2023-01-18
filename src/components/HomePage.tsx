import React from "react";
import { GameCard } from "./GameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./HomePageStyles.css";
import { Suit, suitToUnicode } from "../assets/CardResources";

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

    const blackjackDisplay = (
        <div className="fourIconGrid">
            <div>{suitToUnicode(Suit.Spade)}</div>
            <div className="red">{suitToUnicode(Suit.Heart)}</div>
            <div className="red">{suitToUnicode(Suit.Diamond)}</div>
            <div>{suitToUnicode(Suit.Club)}</div>
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
            <GameCard
                buttonLabel="Play Blackjack"
                route="blackjack"
                display={blackjackDisplay}
            />
        </div>
    );
};
