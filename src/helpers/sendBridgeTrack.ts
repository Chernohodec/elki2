import bridge from "@vkontakte/vk-bridge";

export const sendBridgeTrack = async (event: string) => {
    const statResult = await bridge.send("VKWebAppTrackEvent" as any, {
        event_name: event,
    });
    console.log("sendBridgeTrackStatResult", statResult, "event_name", event);
};
