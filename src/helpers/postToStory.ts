import bridge from "@vkontakte/vk-bridge";

export const postToStory = async (url: string) => {
    try {
        await bridge
            .send("VKWebAppShowStoryBox", {
                background_type: "image",
                url: url,
                attachment: {
                    text: "open",
                    type: "url",
                    url: "https://vk.com/app54237274",
                },
            })

            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (err) {
        console.log("Ошибка выполнения VKWebAppShowStoryBox:", err);
    }
};
