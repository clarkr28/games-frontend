import React from "react";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";
import styles from "./AvilaGame.module.scss";
import { AvilaPlayerCards } from "../AvilaPlayerCards/AvilaPlayerCards";

export const AvilaGame: React.FC<{}> = () => {
    return (
        <div className={styles.game}>
            <AvilaGrid />
            <AvilaPlayerCards />
        </div>
    );
};
