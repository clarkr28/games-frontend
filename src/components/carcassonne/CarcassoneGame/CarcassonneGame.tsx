import React from "react";
import { CarcassonneTile } from "../CarcassonneTile/CarcassonneTile";
import {
    SAMPLE_TILE_1,
    SAMPLE_TILE_2,
} from "../../../assets/CarcassonneResources";

export const CarcassonneGame: React.FC<{}> = () => {
    return (
        <div>
            <CarcassonneTile tile={SAMPLE_TILE_1} />
            <CarcassonneTile tile={SAMPLE_TILE_2} />
        </div>
    );
};
