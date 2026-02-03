import React from "react";
import { Link } from "react-router-dom";
import styles from "./GameCardStyles.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface GameCardProps {
  buttonLabel: string;
  route: string;
  display: JSX.Element;
}

export const GameCard: React.FC<GameCardProps> = (props) => {
  const { buttonLabel, route, display } = props;
  const routeFormatted = `/${route}`;

  return (
    <div className={styles.gameCardContainer}>
      <div className={styles.gameCardIconSection}>{display}</div>
      <FancyLink route={routeFormatted} buttonLabel={buttonLabel} icon={solid("play")} />
    </div>
  );
};

export interface FancyLinkProps {
  route: string;
  buttonLabel: string;
  icon: IconProp;
}

const FancyLink: React.FC<FancyLinkProps> = (props) => {
  const { route, buttonLabel, icon } = props;
  return (
    <Link to={route} className={styles.fancyLink}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <span>{buttonLabel}</span>
    </Link>
  );
};
