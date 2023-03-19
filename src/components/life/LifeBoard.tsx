import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLifeBoard } from "../../features/lifeSlice";
import { LIFE_COLS, LifeCellStates } from "../../assets/LifeResources";

export const LifeBoard: React.FC<{}> = () => {
    const board = useAppSelector(selectLifeBoard);
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${LIFE_COLS}, 10px)`,
            }}
        >
            {board.map((row) =>
                row.map((cell) => <LifeCell cellState={cell} />)
            )}
        </div>
    );
};

interface ILifeCell {
    cellState: LifeCellStates;
}

export const LifeCell: React.FC<ILifeCell> = (props) => {
    const { cellState } = props;
    return <div>{cellState === LifeCellStates.Alive ? 1 : 0}</div>;
};
