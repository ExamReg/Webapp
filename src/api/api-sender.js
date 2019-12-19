import axios from "axios";
import {notification} from "../utils/noti";
import {logOut} from "../service/authen-service";
const URL_BASE = process.env.REACT_APP_API_URL + "/api/s";

function handleResult(res) {
    if (res.data.code === 23) {
        notification("error", "Phiên làm việc đã hết hạn. Xin vui lòng đăng nhập lại.");
        logOut();
        return res.data;
    } else {
        return res.data;
    }
}
export function sendPostRequestWithoutToken(route, payload)
{
    let route_api = `${URL_BASE}${route}`;
    return axios.post(route_api, payload).then(handleResult);
}
export function sendGetRequest(route) {
    let route_api = `${URL_BASE}${route}`;
    let token =  localStorage.getItem("token");
    let headers = {
        token:token
    };
    return axios.get(route_api,{headers}).then(handleResult);
}
export function sendPutRequest(route, payload) {
    let route_api = `${URL_BASE}${route}`;
    let token =  localStorage.getItem("token");
    let headers = {
        token:token
    };
    return axios.put(route_api,payload, {headers}).then(handleResult);
}