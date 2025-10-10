export const preloadImages = (images: string[]) => {
    const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve; // Успешная загрузка
            img.onerror = reject; // Ошибка загрузки
        });
    });

    Promise.all(promises)
        .then(() => {})
        .catch((error) => console.error("Error loading images:", error));
};
