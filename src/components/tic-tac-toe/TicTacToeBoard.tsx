import React from "react";
import "./TicTacToeBoardStyles.css";
import { CellState, TicTacToeState } from "../../assets/TicTacToeResources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface ITicTacToeBoardProps {
    gameState: TicTacToeState;
    performMove: (index: number, value: CellState) => Promise<void>;
    /** true if the user can make a selection */
    canMakeMove: boolean;
}

export const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = (props) => {
    const { gameState, performMove, canMakeMove } = props;

    return (
        <div className="boardContainer">
            <TicTacToeBoardRow
                startIndex={0}
                gameState={gameState}
                performMove={performMove}
                canMakeMove={canMakeMove}
            />
            <div className="rowDivider" />
            <TicTacToeBoardRow
                startIndex={3}
                gameState={gameState}
                performMove={performMove}
                canMakeMove={canMakeMove}
            />
            <div className="rowDivider" />
            <TicTacToeBoardRow
                startIndex={6}
                gameState={gameState}
                performMove={performMove}
                canMakeMove={canMakeMove}
            />
        </div>
    );
};

interface ITicTacToeBoardRowProps {
    startIndex: number;
    gameState: TicTacToeState;
    performMove: (index: number, value: CellState) => Promise<void>;
    /** true if the user can make a selection */
    canMakeMove: boolean;
}

const TicTacToeBoardRow: React.FC<ITicTacToeBoardRowProps> = (props) => {
    const { startIndex, gameState, performMove, canMakeMove } = props;
    const rowCells = gameState.board.slice(startIndex, startIndex + 3);

    return (
        <div className="boardRow">
            {rowCells.map((cell: CellState, index: number) => (
                <div key={index} style={{ display: "flex" }}>
                    <TicTacToeBoardCell
                        cellValue={cell}
                        cellIndex={startIndex + index}
                        performMove={performMove}
                        canMakeMove={canMakeMove}
                        isWinningCell={
                            gameState.winningInds.indexOf(
                                startIndex + index
                            ) !== -1
                        }
                    />
                    {index < 2 && <div className="colDivider" />}
                </div>
            ))}
        </div>
    );
};

interface ITicTacToeBoardCellProps {
    cellValue: CellState;
    cellIndex: number;
    performMove: (index: number, value: CellState) => Promise<void>;
    /** true if the user can make a selection */
    canMakeMove: boolean;
    /** true if this cell is one of the winning cells */
    isWinningCell: boolean;
}

const TicTacToeBoardCell: React.FC<ITicTacToeBoardCellProps> = (props) => {
    const { cellValue, cellIndex, performMove, canMakeMove, isWinningCell } =
        props;

    /**
     * Handle the user clicking a cell on the board
     */
    const clickHandler = () => {
        if (canUserMakeMove(canMakeMove, cellValue)) {
            performMove(cellIndex, CellState.X);
        }
    };

    const hoverClass = canUserMakeMove(canMakeMove, cellValue)
        ? "cellEmptyHover"
        : "";
    const winningClass = isWinningCell ? "cellWinner" : "";

    return (
        <div
            className={`boardCell ${hoverClass} ${winningClass}`}
            onClick={clickHandler}
        >
            {cellValue === CellState.Empty ? null : cellValue ===
              CellState.X ? (
                <FontAwesomeIcon icon={solid("x")} />
            ) : (
                <FontAwesomeIcon icon={solid("o")} />
            )}
        </div>
    );
};

/**
 * determine if the user can pick this cell
 * @param canMakeMove true if the user is allowed to pick a cell
 * @param cellValue the current cell value
 * @returns true if the user is allowed to make their move on this cell
 */
function canUserMakeMove(canMakeMove: boolean, cellValue: CellState): boolean {
    return canMakeMove && cellValue === CellState.Empty;
}
