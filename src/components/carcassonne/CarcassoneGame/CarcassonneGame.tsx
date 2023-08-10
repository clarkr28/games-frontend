import React from "react";
import {
    SAMPLE_TILE_1,
    SAMPLE_TILE_2,
    SAMPLE_TILE_3,
    SAMPLE_TILE_4,
    SAMPLE_TILE_5,
} from "../../../assets/CarcassonneResources";
import { CarcassonneGrid } from "../CarcassonneGrid/CarcassonneGrid";

export const CarcassonneGame: React.FC<{}> = () => {
    const gridData = [
        [
            SAMPLE_TILE_1,
            SAMPLE_TILE_1,
            SAMPLE_TILE_2,
            SAMPLE_TILE_2,
            SAMPLE_TILE_3,
        ],
        [
            SAMPLE_TILE_1,
            SAMPLE_TILE_2,
            SAMPLE_TILE_3,
            SAMPLE_TILE_4,
            SAMPLE_TILE_5,
        ],
    ];

    return (
        <div>
            <CarcassonneGrid gridData={gridData} />
        </div>
    );
};
