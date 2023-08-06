import React from "react";
import { LifePresets, getPresetData } from "../../assets/LifePatternResources";
import { LifeGridStatic } from "./LifeGridStatic";
import { pickPreset } from "../../features/lifeSlice";
import { useAppDispatch } from "../../app/hooks";

export interface LifePresetDisplayProps {
    preset: LifePresets;
}

export const LifePresetDisplay: React.FC<LifePresetDisplayProps> = ({
    preset,
}) => {
    const presetData = getPresetData(preset);
    const presetGrid = presetData === undefined ? [] : presetData.data;
    const dispatch = useAppDispatch();

    /* when this preset is clicked, send a message saying it was selected */
    const presetClickHandler = () => {
        dispatch(pickPreset(preset));
    };

    return (
        <LifeGridStatic
            gridData={presetGrid}
            clickCallback={presetClickHandler}
        />
    );
};
