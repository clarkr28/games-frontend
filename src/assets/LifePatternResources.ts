
export enum LifeCellState {
    Alive,
    Dead,
    HoverPreset,
}

export enum LifePresets {
    Glider,
    LWSH, // leight-weight space ship
    CircleOfFire,
    Griddle,
}

export interface LifePresetData {
    width: number,
    height: number,
    data: LifeCellState[][],
}

const GliderPreset: LifePresetData = {
    width: 3,
    height: 3,
    data: [
        [LifeCellState.Dead, LifeCellState.Alive, LifeCellState.Dead],
        [LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Alive],
        [LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive]
    ]
};

const LWSHPreset: LifePresetData = {
    width: 5,
    height: 4,
    data: [
        [LifeCellState.Alive, LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Alive, LifeCellState.Dead],
        [LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Alive],
        [LifeCellState.Alive, LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Alive],
        [LifeCellState.Dead, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive]
    ]
};

const CircleOfFirePreset: LifePresetData = {
    width: 11,
    height: 11,
    data: [
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive,  LifeCellState.Dead, LifeCellState.Dead, LifeCellState.Dead,  LifeCellState.Dead],
    ]
};

const GriddlePreset: LifePresetData = {
    width: 6,
    height: 7,
    data: [
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive],
        [LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Alive],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead],
        [LifeCellState.Dead,  LifeCellState.Dead,  LifeCellState.Alive, LifeCellState.Alive, LifeCellState.Dead,  LifeCellState.Dead],
    ]
}

/* Store the presets in a map for easy access */
const presetMap: Map<LifePresets, LifePresetData> = new Map();
presetMap.set(LifePresets.Glider, GliderPreset);
presetMap.set(LifePresets.LWSH, LWSHPreset);
presetMap.set(LifePresets.CircleOfFire, CircleOfFirePreset);
presetMap.set(LifePresets.Griddle, GriddlePreset);

/**
 * get preset data for a specific preset type 
 * @param presetType the preset to return
 * @returns preset data for the passed type
 */
export function getPresetData(presetType: LifePresets): LifePresetData | undefined {
    return presetMap.get(presetType);
}