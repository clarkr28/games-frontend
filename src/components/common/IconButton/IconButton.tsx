import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./IconButton.module.scss";

export enum IconButtonColor {
    Green = "green",
    Grey = "grey",
}

export interface IIconButtonProps {
    displayText: string;
    icon: IconProp;
    color?: IconButtonColor;
    clickCallback?: () => void;
    disabled?: boolean;
}

export const IconButton: React.FC<IIconButtonProps> = (props) => {
    const { displayText, icon, clickCallback, color, disabled } = props;
    const colorToUse = color || IconButtonColor.Grey;
    return (
        <button
            className={`${styles.iconButton} ${colorToStyle(colorToUse)} ${
                disabled ? styles.disabled : ""
            }`}
            onClick={() => clickCallback && clickCallback()}
            disabled={disabled}
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
        case IconButtonColor.Grey:
            return styles.grey;
    }
}
