import {sendPostRequestWithoutToken} from "./api-sender";

export function login(data)
{
    let route = "/login";
    return sendPostRequestWithoutToken(route, data);
}