import React from "react";
import { C4_COLS } from "../../assets/ConnectFourResources";
import styles from "./ConnectFourStyles.module.css";
import { ConnectFourColumn } from "./ConnectFourColumn";

export const ConnectFourBoard: React.FC<{}> = (props) => {
    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardGrid}>
                {[...Array<number>(C4_COLS)].map((_: number, index: number) => {
                    return <ConnectFourColumn key={index} />;
                })}
            </div>
        </div>
    );
};
