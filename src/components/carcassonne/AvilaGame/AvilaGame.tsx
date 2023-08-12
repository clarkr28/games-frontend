import React from "react";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";
import styles from "./AvilaGame.module.scss";

export const AvilaGame: React.FC<{}> = () => {
    return (
        <div className={styles.game}>
            <AvilaGrid />
        </div>
    );
};
