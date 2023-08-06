import React from "react";
import { hitPlayer, standPlayer } from "../../../features/blackjackSlice";
import { useDispatch } from "react-redux";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./HitStand.module.scss";

export interface IHitStandProps {
    bank: number;
    enableButtons: boolean;
}

export const HitStand: React.FC<IHitStandProps> = (props) => {
    const { bank, enableButtons } = props;

    const dispatch = useDispatch();

    return (
        <div className={styles.hitStandContainer}>
            <IconButton
                displayText="Hit"
                clickCallback={() => dispatch(hitPlayer())}
                color={IconButtonColor.Grey}
                icon={solid("plus")}
                disabled={!enableButtons}
            />
            <IconButton
                displayText="Stand"
                clickCallback={() => dispatch(standPlayer())}
                color={IconButtonColor.Green}
                icon={solid("hand")}
                disabled={!enableButtons}
            />
            <div>{`Bank: $${bank}`}</div>
        </div>
    );
};
