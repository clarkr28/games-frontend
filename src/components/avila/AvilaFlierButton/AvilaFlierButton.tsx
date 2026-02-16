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
import { computeFlierTargetTile, getPlaceableFlierMeepleLocations } from "../../../assets/avila/Resources";
import { useAppDispatch } from "../../../app/hooks";

export const AvilaFlierButton: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const [spacesToMove, setSpacesToMove] = useState(0); // will be > 0 if use flier button was clicked
  const board = useSelector(selectAvilaBoard);
  const currentTile = useSelector(selectAvilaCurrentTile);
  const lastTilePlaced = useSelector(selectAvilaLastTilePlaced);

  const onClickUseFlier = () => {
    if (spacesToMove === 0 && currentTile?.flierDirection !== undefined && lastTilePlaced !== undefined) {
      // create a random number from 1-3 (inclusive)
      const stepsRolled = Math.ceil(Math.random() * 3);
      setSpacesToMove(stepsRolled);
      const targetPoint = computeFlierTargetTile(board, lastTilePlaced, currentTile.flierDirection, stepsRolled);

      // either the user should be able to place a meeple, or have to end their turn
      const placeableLocations = getPlaceableFlierMeepleLocations(board, targetPoint);
      dispatch(setFlierMeeplePlacing({ placeableMeepleLocations: placeableLocations, tileLoc: targetPoint }));
    }
  };

  if (spacesToMove === 0) {
    return <IconButton displayText="Use Flier" icon={solid("paper-plane")} clickCallback={onClickUseFlier} />;
  }

  return (
    <p>
      You rolled a <strong>{spacesToMove}</strong>
    </p>
  );
};
