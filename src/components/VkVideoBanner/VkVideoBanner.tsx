import { AspectRatio, usePlatform } from "@vkontakte/vkui";
import { MouseEventHandler } from "react";
import css from "./VkVideoBanner.module.css";

export const VkVideoBanner = ({
    href,
    onClick,
}: {
    href?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}) => {
    const platform = usePlatform();
    const isDesktop = platform === "vkcom";

    return (
        <AspectRatio ratio={16/9}>
            <div className={css["vk-banner"]}>
                <iframe
                    className={css["vk-banner__video"]}
                    src="https://vk.com/video_ext.php?oid=-51109251&id=456239677"
                    width="330"
                    height="160"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                    allowFullScreen
                ></iframe>
            </div>
        </AspectRatio>
    );
};
