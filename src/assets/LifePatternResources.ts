
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
    Turtle,
    Puffer,
    Blom, // methuselah
}

export interface LifePresetData {
    width: number,
    height: number,
    data: LifeCellState[][],
}

/**
 * create a row of cell states based on an input string
 * @param row input string where spaces are dead cells
 * @returns array of life cell states based on the input string
 */
function stringToCellStates(row: string): LifeCellState[] {
    return Array.from(row).map(ch => ch === " " ? LifeCellState.Dead : LifeCellState.Alive);
}

const GliderPreset: LifePresetData = {
    width: 3,
    height: 3,
    data: [
        stringToCellStates(" 1 "),
        stringToCellStates("  1"),
        stringToCellStates("111")
    ]
};

const LWSHPreset: LifePresetData = {
    width: 5,
    height: 4,
    data: [
        stringToCellStates("1  1 "),
        stringToCellStates("    1"),
        stringToCellStates("1   1"),
        stringToCellStates(" 1111"),
    ]
};

const CircleOfFirePreset: LifePresetData = {
    width: 11,
    height: 11,
    data: [
        stringToCellStates("    1 1    "),
        stringToCellStates("  1  1  1  "),
        stringToCellStates("   1 1 1   "),
        stringToCellStates(" 111 1 111 "),
        stringToCellStates("     1     "),
        stringToCellStates("11111 11111"),
        stringToCellStates("     1     "),
        stringToCellStates(" 111 1 111 "),
        stringToCellStates("   1 1 1   "),
        stringToCellStates("  1  1  1  "),
        stringToCellStates("    1 1    "),
    ]
};

const GriddlePreset: LifePresetData = {
    width: 6,
    height: 7,
    data: [
        stringToCellStates("   1  "),
        stringToCellStates(" 1 1  "),
        stringToCellStates("1    1"),
        stringToCellStates("111111"),
        stringToCellStates("      "),
        stringToCellStates("  11  "),
        stringToCellStates("  11  "),
    ]
};

const TurtlePreset: LifePresetData = {
    width: 12,
    height: 10,
    data: [
        stringToCellStates(" 111       1"),
        stringToCellStates(" 11  1 11 11"),
        stringToCellStates("   111    1 "),
        stringToCellStates(" 1  1 1   1 "),
        stringToCellStates("1    1    1 "),
        stringToCellStates("1    1    1 "),
        stringToCellStates(" 1  1 1   1 "),
        stringToCellStates("   111    1 "),
        stringToCellStates(" 11  1 11 11"),
        stringToCellStates(" 111       1"),
    ]
};

const PufferPreset: LifePresetData = {
    width: 18,
    height: 5,
    data: [
        stringToCellStates(" 111           111"),
        stringToCellStates("1  1          1  1"),
        stringToCellStates("   1    111      1"),
        stringToCellStates("   1    1  1     1"),
        stringToCellStates("  1    1        1 "),
    ]
};

const BlomPreset: LifePresetData = {
    width: 12,
    height: 5,
    data: [
        stringToCellStates("1          1"),
        stringToCellStates(" 1111      1"),
        stringToCellStates("  11       1"),
        stringToCellStates("          1 "),
        stringToCellStates("        1 1 "),
    ]
}

/* Store the presets in a map for easy access */
const presetMap: Map<LifePresets, LifePresetData> = new Map();
presetMap.set(LifePresets.Glider, GliderPreset);
presetMap.set(LifePresets.LWSH, LWSHPreset);
presetMap.set(LifePresets.CircleOfFire, CircleOfFirePreset);
presetMap.set(LifePresets.Griddle, GriddlePreset);
presetMap.set(LifePresets.Turtle, TurtlePreset);
presetMap.set(LifePresets.Puffer, PufferPreset);
presetMap.set(LifePresets.Blom, BlomPreset);

/**
 * get preset data for a specific preset type 
 * @param presetType the preset to return
 * @returns preset data for the passed type
 */
export function getPresetData(presetType: LifePresets): LifePresetData | undefined {
    return presetMap.get(presetType);
}