
import { ReactNode } from "react";
import css from "./Button.module.css";
import { classNames, usePlatform } from "@vkontakte/vkui";

export const Button = ({
    onClick,
    children,
    color = "red",
    size = "normal",
    href,
    disabled,
    className,
}: {
    onClick?: () => void;
    children: ReactNode
    color?: string;
    size?: "normal" | "small" | "big";
    href?: string;
    disabled?: boolean;
    className?: string;
}) => {

    const platform = usePlatform()

    if (href) {
        return (
            <a
                onClick={onClick}
                href={href}
                className={classNames(
                    css["button"],
                    css[`button_platform_${platform}`],
                    color && css[`button_color_${color}`],
                    size && css[`button_size_${size}`],
                    className && className
                )}
                target="_blank"
            >
                <span>{children}</span>
            </a>
        );
    } else {
        return (
            <button
                disabled={disabled}
                onClick={onClick}
                className={classNames(
                    css["button"],
                    css[`button_platform_${platform}`],
                    color && css[`button_color_${color}`],
                    size && css[`button_size_${size}`],
                    className && className
                )}
            >
                <span>{children}</span>
            </button>
        );
    }
};
