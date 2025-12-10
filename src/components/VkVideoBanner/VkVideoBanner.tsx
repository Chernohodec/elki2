import bridge from "@vkontakte/vk-bridge";
import { AspectRatio } from "@vkontakte/vkui";
import { useEffect, useRef } from "react";
import css from "./VkVideoBanner.module.css";

export const VkVideoBanner = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        if (iframeRef.current) {
            const player = VK.VideoPlayer(iframeRef.current);
            bridge.subscribe((e) => {
                if (e.detail.type === "VKWebAppViewHide") {
                    player.pause();
                }
            });
        }
    }, []);

    return (
        <AspectRatio ratio={16 / 9}>
            <div className={css["vk-banner"]}>
                <iframe
                    className={css["vk-banner__video"]}
                    src="https://vk.com/video_ext.php?oid=-218182715&id=456241404&js_api=1"
                    width="330"
                    height="160"
                    allow="autoplay; encrypted-media; fullscreen;"
                    allowFullScreen
                    ref={iframeRef}
                ></iframe>
            </div>
        </AspectRatio>
    );
};
