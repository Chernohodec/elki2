import { makeRequest } from "../../helpers";

export const checkQuest = (questID: number) =>
    makeRequest(
        "post",
        `check_quest/`,
        {quest_id: questID},
        {}
    );
