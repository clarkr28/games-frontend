import React from "react";
import { GameCard } from "./GameCard";
import "./HomePageStyles.css";

export const HomePage: React.FC<{}> = () => {
    const ticTacToeDisplay = <div>test</div>;

    const connectFourDisplay = <div>test C4</div>;

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
