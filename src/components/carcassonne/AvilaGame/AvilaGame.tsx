import React from "react";
import {
    SAMPLE_TILE_1,
    SAMPLE_TILE_2,
    SAMPLE_TILE_3,
    SAMPLE_TILE_4,
    SAMPLE_TILE_5,
} from "../../../assets/AvilaResources";
import { AvilaGrid } from "../AvilaGrid/AvilaGrid";

export const AvilaGame: React.FC<{}> = () => {
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
            <AvilaGrid gridData={gridData} />
        </div>
    );
};
