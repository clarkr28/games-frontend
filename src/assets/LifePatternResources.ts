import { LifeCellStates } from "./LifeResources";

export enum LifePresets {
    Glider,
    LWSH, // leight-weight space ship
}

export interface LifePresetData {
    width: number,
    height: number,
    data: LifeCellStates[][],
}

const GliderPreset: LifePresetData = {
    width: 3,
    height: 3,
    data: [
        [LifeCellStates.Dead, LifeCellStates.Alive, LifeCellStates.Dead],
        [LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Alive],
        [LifeCellStates.Alive, LifeCellStates.Alive, LifeCellStates.Alive]
    ]
};

const LWSHPreset: LifePresetData = {
    width: 5,
    height: 4,
    data: [
        [LifeCellStates.Alive, LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Alive, LifeCellStates.Dead],
        [LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Alive],
        [LifeCellStates.Alive, LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Dead, LifeCellStates.Alive],
        [LifeCellStates.Dead, LifeCellStates.Alive, LifeCellStates.Alive, LifeCellStates.Alive, LifeCellStates.Alive]
    ]
}

/* Store the presets in a map for easy access */
const presetMap: Map<LifePresets, LifePresetData> = new Map();
presetMap.set(LifePresets.Glider, GliderPreset);
presetMap.set(LifePresets.LWSH, LWSHPreset);