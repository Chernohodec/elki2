import { makeRequest } from "../../helpers";

export const getUser = (referalID?: string) =>
    makeRequest(
        "get",
        `user/`,
        {},
        {referal: referalID}
    );
