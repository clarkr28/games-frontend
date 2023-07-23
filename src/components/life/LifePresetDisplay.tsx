import React, { useCallback } from "react";
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

    /* when this preset is clicked, update state accordingly */
    const presetClickHandler = useCallback(() => {
        dispatch(pickPreset(preset));
    }, [dispatch, preset]);

    return (
        <LifeGridStatic
            gridData={presetGrid}
            clickCallback={presetClickHandler}
        />
    );
};
