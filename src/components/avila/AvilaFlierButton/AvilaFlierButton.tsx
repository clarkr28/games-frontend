import { useState } from "react";
import { IconButton } from "../../common/IconButton/IconButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useSelector } from "react-redux";
import { selectAvilaBoard, selectAvilaCurrentTile, selectAvilaLastTilePlaced } from "../../../features/avilaSlice";
import { computeFlierTargetTile, IAvilaTile } from "../../../assets/avila/Resources";

export const AvilaFlierButton: React.FC<{}> = () => {
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
      <p>Target tile is {targetTile === undefined ? "invalid" : "valid"}</p>
    </div>
  );
};
