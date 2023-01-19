import React from "react";
import { IPlayingCardProps, PlayingCardFC } from "./PlayingCardFC";
import styles from "./PlayingCardStyles.module.css";

const CARD_WIDTH = 95; // pixels
const CARD_HEIGHT = 157; // pixels
const CARD_OFFSET = 23; // offset (pixels) when cards are stacked

export interface ICardHand {
    cards: IPlayingCardProps[];
    stacked?: boolean;
}

export const CardHand: React.FC<ICardHand> = (props) => {
    const { cards, stacked } = props;

    if (stacked) {
        return (
            <div
                className={styles.stacked}
                style={{
                    height: `${CARD_HEIGHT}px`,
                    width: `${CARD_WIDTH + CARD_OFFSET * (cards.length - 1)}px`,
                }}
            >
                {cards.map((card: IPlayingCardProps, index: number) => (
                    <div
                        key={index}
                        style={{
                            left: `${CARD_OFFSET * index}px`,
                            zIndex: `${index}`,
                        }}
                    >
                        <PlayingCardFC {...card} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {cards.map((card: IPlayingCardProps, index: number) => (
                <PlayingCardFC key={index} {...card} />
            ))}
        </div>
    );
};
