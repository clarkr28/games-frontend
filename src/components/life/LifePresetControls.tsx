import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./LifeStyles.module.css";
import { LifePresets } from "../../assets/LifePatternResources";
import { LifePresetDisplay } from "./LifePresetDisplay";

const presetPages = [
    [LifePresets.Glider, LifePresets.LWSH, LifePresets.Griddle],
    [LifePresets.CircleOfFire, LifePresets.Turtle, LifePresets.Blom],
    [LifePresets.Puffer, LifePresets.BeaconFuse, LifePresets.AntWick],
];

export const LifePresetControls: React.FC<{}> = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [showControl, setShowControl] = useState(false);

    const enableLeft = pageIndex > 0;
    const enableRight = pageIndex < presetPages.length - 1;

    return (
        <div
            className={`${styles.lifePresetsContainer} ${
                showControl ? styles.show : ""
            }`}
        >
            <a
                className={`${showControl ? styles.rotate : ""}`}
                onClick={() => setShowControl((val) => !val)}
                href="#/"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            <div className={styles.lifePresetsList}>
                <div className={styles.pageControls}>
                    <a
                        className={enableLeft ? styles.enabled : ""}
                        onClick={() =>
                            enableLeft && setPageIndex((index) => index - 1)
                        }
                        href="#/"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </a>
                    <a
                        className={enableRight ? styles.enabled : ""}
                        onClick={() =>
                            enableRight && setPageIndex((index) => index + 1)
                        }
                        href="#/"
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </div>
                <LifePresetDisplay preset={presetPages[pageIndex][0]} />
                <LifePresetDisplay preset={presetPages[pageIndex][1]} />
                <LifePresetDisplay preset={presetPages[pageIndex][2]} />
            </div>
        </div>
    );
};
