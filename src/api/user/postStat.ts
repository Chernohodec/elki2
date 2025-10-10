import { makeRequest } from "../../helpers/makeRequest";

export const sendStat = (name:string) =>
    makeRequest("post", `/statistics/`, { name: name }, {});
