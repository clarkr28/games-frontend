import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { startGame } from "../../../features/avilaSlice";
import styles from "./AvilaSettings.module.scss";

export const AvilaSettings: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.settingsWrapper}>
            <div>
                <IconButton
                    displayText="Start Game"
                    color={IconButtonColor.Green}
                    icon={solid("play")}
                    clickCallback={() => dispatch(startGame())}
                    disabled={false}
                />
            </div>
        </div>
    );
};
