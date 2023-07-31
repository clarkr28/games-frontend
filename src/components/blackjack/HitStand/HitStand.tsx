import React from "react";
import { hitPlayer, standPlayer } from "../../../features/blackjackSlice";
import { useDispatch } from "react-redux";
import {
    IconButton,
    IconButtonColor,
} from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface IHitStandProps {
    bank: number;
}

export const HitStand: React.FC<IHitStandProps> = (props) => {
    const { bank } = props;

    const dispatch = useDispatch();

    return (
        <div>
            <IconButton
                displayText="Hit"
                clickCallback={() => dispatch(hitPlayer())}
                color={IconButtonColor.Green}
                icon={solid("plus")}
            />
            <IconButton
                displayText="Stand"
                clickCallback={() => dispatch(standPlayer())}
                color={IconButtonColor.Green}
                icon={solid("hand")}
            />
            <div>{`Bank: $${bank}`}</div>
        </div>
    );
};
