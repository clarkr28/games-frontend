import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./IconButton.module.scss";

export enum IconButtonColor {
    Green = "green",
}

export interface IIconButtonProps {
    displayText: string;
    icon: IconProp;
    color: IconButtonColor;
    clickCallback: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = (props) => {
    const { displayText, icon, clickCallback, color } = props;
    return (
        <button
            className={`${styles.iconButton} ${colorToStyle(color)}`}
            onClick={clickCallback}
        >
            <FontAwesomeIcon icon={icon} />
            {displayText}
        </button>
    );
};

function colorToStyle(color: IconButtonColor): string {
    switch (color) {
        case IconButtonColor.Green:
            return styles.green;
    }
}
