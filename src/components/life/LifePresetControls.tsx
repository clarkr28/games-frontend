import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./LifeStyles.module.css";
import { LifePresets } from "../../assets/LifePatternResources";
import { LifePresetDisplay } from "./LifePresetDisplay";

export const LifePresetControls: React.FC<{}> = () => {
    return (
        <div className={styles.lifePresetsContainer}>
            <a>
                <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            <div className={styles.lifePresetsList}>
                <LifePresetDisplay preset={LifePresets.Glider} />
                <LifePresetDisplay preset={LifePresets.LWSH} />
                <LifePresetDisplay preset={LifePresets.Griddle} />
            </div>
        </div>
    );
};
