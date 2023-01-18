import React from "react";
import {
    PlayingCard,
    Suit,
    cardValueToString,
    suitToUnicode,
} from "../../assets/CardResources";
import styles from "./PlayingCardStyles.module.css";

export interface IPlayingCardProps {
    card: PlayingCard;
}

export const PlayingCardFC: React.FC<IPlayingCardProps> = (props) => {
    const { card } = props;

    const valueAndSuit = (
        <>
            <div>{cardValueToString(card.value)}</div>
            <div>{suitToUnicode(card.suit)}</div>
        </>
    );

    return (
        <div
            className={`${styles.cardContainer} ${colorClassForSuit(
                card.suit
            )}`}
        >
            <div className={styles.cardHeader}>
                <div>{valueAndSuit}</div>
                <div>{valueAndSuit}</div>
            </div>
            <div className={styles.cardCenter}>
                {suitToUnicode(card.suit, false)}
            </div>
            <div className={`${styles.cardHeader} ${styles.cardBottomRow}`}>
                <div>{valueAndSuit}</div>
                <div>{valueAndSuit}</div>
            </div>
        </div>
    );
};

function colorClassForSuit(suit: Suit): string {
    if (suit === Suit.Heart || suit === Suit.Diamond) {
        return styles.red;
    }
    return "";
}
