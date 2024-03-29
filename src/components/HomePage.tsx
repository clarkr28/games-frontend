import React from "react";
import { GameCard } from "./GameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./HomePageStyles.css";
import { Suit, suitToUnicode } from "../assets/CardResources";

export const HomePage: React.FC<{}> = () => {
    return (
        <div className="homePageCardContainer">
            {process.env.REACT_APP_ENABLE_TICTACTOE && (
                <GameCard
                    buttonLabel="Play Tic Tac Toe"
                    route="tic-tac-toe"
                    display={ticTacToeDisplay}
                />
            )}
            {process.env.REACT_APP_ENABLE_CONNECTFOUR && (
                <GameCard
                    buttonLabel="Play Connect Four"
                    route="connect-four"
                    display={connectFourDisplay}
                />
            )}
            {process.env.REACT_APP_ENABLE_BLACKJACK && (
                <GameCard
                    buttonLabel="Play Blackjack"
                    route="blackjack"
                    display={blackjackDisplay}
                />
            )}
            {process.env.REACT_APP_ENABLE_LIFE && (
                <GameCard
                    buttonLabel="Play Life"
                    route="life"
                    display={lifeDisplay}
                />
            )}
            {process.env.REACT_APP_ENABLE_AVILA && (
                <GameCard
                    buttonLabel="Play Avila"
                    route="avila"
                    display={AvilaDisplay}
                />
            )}
        </div>
    );
};

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

const lifeDisplay = (
    <div className="fourIconGrid">
        <div className="lifeDisplayGrid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="lifeDisplayGrid">
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
        </div>
        <div className="lifeDisplayGrid">
            <div></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
        </div>
        <div className="lifeDisplayGrid">
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div className="blackBackground"></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

const AvilaDisplay = (
    <div className="fourIconGrid avila">
        <img src="/images/avila/RR_C_F-0-0.svg" alt="avila game tile example" />
        <img
            src="/images/avila/RR_F_C-0-0.svg"
            alt="avila game tile example"
            className="rotate180"
        />
        <img src="/images/avila/CCCC-1-0.svg" alt="avila game tile example" />
        <img
            src="/images/avila/C_R*_F_R*-0-0.svg"
            alt="avila game tile example"
            className="rotate270"
        />
    </div>
);
