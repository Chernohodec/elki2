import bridge, { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";

export const postToWall = async (image: string,) => {
    const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );
    try {
        await bridge
            .send("VKWebAppShowWallPostBox", {
                owner_id: vk_user_id,
                message: `Открытка для финника`,
                attachments: `https://vk.com/app54237274`,
                upload_attachments: [{
                    "type": "photo",
                    "link": image
                  }],
                // link_button: "open_url",
                // link_image: image,
            })
            .then((data) => {
                if (data.post_id) {
                    // Запись размещена
                }
            })
            .catch((error) => {
                // Ошибка
                console.log(error);
            });
    } catch (err) {
        console.log("Ошибка выполнения VKWebAppShowWallPostBox:", err);
    }
};Ç