export const checkTimeIsAllowed = (activationTime: string) => {
    const nowTimeMS = new Date().getTime();
    const timeStartMS = new Date(activationTime).getTime();
    if (nowTimeMS > timeStartMS) {
        return true;
    } else {
        return false;
    }
};
