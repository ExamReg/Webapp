import axios from "axios";
const URL_BASE = process.env.REACT_APP_API_URL + "/api/s";

function handleResult(res) {
    return res.data;
}
export function sendPostRequestWithoutToken(route, payload)
{
    let route_api = `${URL_BASE}${route}`;
    console.log(route_api)
    return axios.post(route_api, payload).then(handleResult);
}
export function sendGetRequest(route) {
    let route_api = `${URL_BASE}${route}`;
    let token =  localStorage.getItem("token");
    let headers = {
        token:token
    }
    return axios.get(route_api,{headers}).then(handleResult);
}
export function sendPutRequest(route, payload) {
    let route_api = `${URL_BASE}${route}`;
    let token =  localStorage.getItem("token");
    let headers = {
        token:token
    }
    return axios.put(route_api,payload, {headers}).then(handleResult);
}