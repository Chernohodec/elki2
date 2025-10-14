import { classNames } from "@vkontakte/vkui";
import { ReactNode } from "react";
import css from "./Text.module.css";

export type Text = {
    children?: ReactNode;
    className?: string;
    color?: TextColors | string;
    size?: TextSize | string;
    align?: TextAlign | string;
};

export enum TextColors {
    white = "white",
    gray = "gray",
    yellow = "yellow",
    black = "black",
}

export enum TextSize {
    normal = "normal",
    small = "small",
}

export enum TextAlign {
    center = "center",
    left = "left",
    right = "right",
}

export const Text = ({
    children,
    className,
    color = TextColors.black,
    size = TextSize.normal,
    align = TextAlign.left,
}: Text) => {
    return (
        <div
            className={classNames(
                css["text"],
                css[`color_type_${color}`],
                css[`size_type_${size}`],
                css[`align_type_${align}`],
                className
            )}
        >
            {children}
        </div>
    );
};
