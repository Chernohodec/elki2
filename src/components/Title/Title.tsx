import { classNames } from "@vkontakte/vkui";
import { ReactNode } from "react";
import css from "./Title.module.css";

export type Title = {
    children?: ReactNode;
    className?: string;
    color?: TitleColors | string;
    size?: TitleSize | string;
    align?: TitleAlign | string;
};

export enum TitleColors {
    black = "black",
    white = "white",
    yellow = "yellow",
    red = "red"
}

export enum TitleSize {
    big = "big",
    normal = "normal",
    medium = "medium",
    small = "small",
    xl = "xl"
}

export enum TitleAlign {
    center = "center",
    left = "left",
    right = "right",
}

export const Title = ({
    children,
    className,
    color = TitleColors.red,
    size = TitleSize.normal,
    align = TitleAlign.left,
}: Title) => {
    return (
        <div
            className={classNames(
                css["title"],
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
