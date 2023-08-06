import React from "react";
import {
    PlayingCard,
    Suit,
    cardValueToString,
    suitToUnicode,
} from "../../assets/CardResources";
import styles from "./PlayingCardStyles.module.css";
import cardBackground from "../../assets/images/card-back.png";

export const CARD_WIDTH = 95; // pixels
export const CARD_HEIGHT = 155; // pixels

export interface IPlayingCardProps {
    card: PlayingCard;
    hidden?: boolean;
}

export const PlayingCardFC: React.FC<IPlayingCardProps> = (props) => {
    const { card, hidden } = props;

    const valueAndSuit = (
        <>
            <div>{cardValueToString(card.value)}</div>
            <div>{suitToUnicode(card.suit)}</div>
        </>
    );

    const containerClasses: string[] = [
        styles.cardContainer,
        colorClassForSuit(card.suit),
    ];
    if (hidden) {
        containerClasses.push(styles.cardHidden);
    }

    return (
        <div
            style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
            className={containerClasses.join(" ")}
        >
            {hidden ? (
                <img src={cardBackground} alt="back of card" />
            ) : (
                <>
                    <div className={styles.cardHeader}>
                        <div>{valueAndSuit}</div>
                        <div>{valueAndSuit}</div>
                    </div>
                    <div className={styles.cardCenter}>
                        {suitToUnicode(card.suit, false)}
                    </div>
                    <div
                        className={`${styles.cardHeader} ${styles.cardBottomRow}`}
                    >
                        <div>{valueAndSuit}</div>
                        <div>{valueAndSuit}</div>
                    </div>
                </>
            )}
        </div>
    );
};

function colorClassForSuit(suit: Suit): string {
    if (suit === Suit.Heart || suit === Suit.Diamond) {
        return styles.red;
    }
    return "";
}
