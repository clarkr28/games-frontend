import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AvilaPlayerColor, IMeeplePlacement } from "../../../assets/avila/Resources";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "./AvilaMeeples.module.scss";

export interface IAvilaMeeplesProps {
  meeples: IMeeplePlacement[] | undefined;
}

export const AvilaMeeples: React.FC<IAvilaMeeplesProps> = ({ meeples }) => {
  if (!meeples) {
    return null;
  }

  const byType: IMeeplePlacement[][] = [];
  for (let i = 0; i < 5; i++) {
    byType.push([]);
  }
  meeples.forEach((meeple) => {
    if (meeple.onMonestary) {
      byType[4].push(meeple);
    }
    if (typeof meeple.edgeIndex === "number") {
      byType[meeple.edgeIndex].push(meeple);
    }
  });

  return (
    <>
      <MeepleGroup meeples={byType[0]} />
      <MeepleGroup meeples={byType[1]} />
      <MeepleGroup meeples={byType[2]} />
      <MeepleGroup meeples={byType[3]} />
      <MeepleGroup meeples={byType[4]} />
    </>
  );
};

const BaseWidthPx = 22;
const AdditionalWidthPx = 6;

interface IMeepleGroupProps {
  meeples: IMeeplePlacement[];
}

const MeepleGroup: React.FC<IMeepleGroupProps> = ({ meeples }) => {
  if (!meeples.length) {
    return null;
  }

  const width = meeples.length === 1 ? BaseWidthPx : BaseWidthPx + AdditionalWidthPx * meeples.length - 1;

  return (
    <div className={`${styles.placedMeeple} ${meeplePlacement(meeples[0])}`} style={{ width: `${width}px` }}>
      {meeples.map((m, i) => (
        <FontAwesomeIcon key={i} className={meepleColor(m)} icon={solid("person")} />
      ))}
    </div>
  );
};

function meeplePlacement(meeple: IMeeplePlacement): string {
  if (meeple.onMonestary) {
    return styles.monestaryMeeple;
  }
  switch (meeple.edgeIndex) {
    case 0:
      return styles.topMeeple;
    case 1:
      return styles.rightMeeple;
    case 2:
      return styles.bottomMeeple;
    case 3:
      return styles.leftMeeple;
  }
  return "";
}

function meepleColor(meeple: IMeeplePlacement): string {
  switch (meeple.playerColor) {
    case AvilaPlayerColor.Blue:
      return styles.blue;
    case AvilaPlayerColor.Green:
      return styles.green;
    case AvilaPlayerColor.Orange:
      return styles.orange;
    case AvilaPlayerColor.Purple:
      return styles.purple;
    case AvilaPlayerColor.Red:
      return styles.red;
  }
}
