import { makeRequest } from "../../helpers";

export const postUser = (data:{}) =>
    makeRequest(
        "post",
        `user/`,
        {...data},
        {}
    );
