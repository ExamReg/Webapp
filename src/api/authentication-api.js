import {sendGetRequest, sendPostRequestWithoutToken, sendPutRequest} from "./api-sender";

export function login(data)
{
    let route = "/login";
    return sendPostRequestWithoutToken(route, data);
}

export function changepassword(data) {
    let route = "/users/password";
    return sendPutRequest(route, data)
}
export function getUserInfo() {
    let route = "/profile";
    return sendGetRequest(route);
}