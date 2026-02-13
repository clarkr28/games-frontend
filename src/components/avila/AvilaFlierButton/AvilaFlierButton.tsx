import { useState } from "react";
import { IconButton } from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useSelector } from "react-redux";
import {
  selectAvilaBoard,
  selectAvilaCurrentTile,
  selectAvilaLastTilePlaced,
  setFlierMeeplePlacing,
} from "../../../features/avilaSlice";
import {
  computeFlierTargetTile,
  getPlaceableFlierMeepleLocations,
  IAvilaTile,
  isMeeplePlaceable,
} from "../../../assets/avila/Resources";
import { useAppDispatch } from "../../../app/hooks";

export const AvilaFlierButton: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const [spacesToMove, setSpacesToMove] = useState(0); // will be > 0 if use flier button was clicked
  const [targetTile, setTargetTile] = useState<IAvilaTile | undefined>(undefined);
  const board = useSelector(selectAvilaBoard);
  const currentTile = useSelector(selectAvilaCurrentTile);
  const lastTilePlaced = useSelector(selectAvilaLastTilePlaced);

  const onClickUseFlier = () => {
    if (spacesToMove === 0 && currentTile?.flierDirection !== undefined && lastTilePlaced !== undefined) {
      // create a random number from 1-3 (inclusive)
      const stepsRolled = Math.ceil(Math.random() * 3);
      setSpacesToMove(stepsRolled);
      const [targetPoint, targetTile] = computeFlierTargetTile(
        board,
        lastTilePlaced,
        currentTile.flierDirection,
        stepsRolled
      );
      setTargetTile(targetTile);

      // either the user should be able to place a meeple, or have to end their turn
      const placeableLocations = getPlaceableFlierMeepleLocations(board, targetPoint);
      const isPlaceable = isMeeplePlaceable(placeableLocations);
      // if not placeable, we can do nothing, and their only option is clicking End Turn
      console.log(`isPlaceable: ${isPlaceable}`);
      console.log(placeableLocations);
      if (isPlaceable) {
        dispatch(setFlierMeeplePlacing({ placeableMeepleLocations: placeableLocations, tileLoc: targetPoint }));
      }
    }
  };

  if (spacesToMove === 0) {
    return <IconButton displayText="Use Flier" icon={solid("paper-plane")} clickCallback={onClickUseFlier} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>
        You rolled a <strong>{spacesToMove}</strong>
      </p>
      <p>Target tile is {targetTile ? "valid" : "invalid"}</p>
    </div>
  );
};
