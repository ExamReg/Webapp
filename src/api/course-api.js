import {sendGetRequest, sendPutRequest} from "./api-sender";

export function getListExam(id_semedter) {
    let route = `/exams?id_semester=${id_semedter}`;
    return sendGetRequest(route);
}
export function getListExamRegisted(id_semedter) {
    let route = `/exams/registered?id_semester=${id_semedter}`;
    return sendGetRequest(route);
}

export function getNewEastSemster() {
    let route = "/semesters/newest";
    return sendGetRequest(route);
}
export function saveChange(id_semester, data) {
    let route = `/exams?id_semester=${id_semester}`;
    return sendPutRequest(route, data)
}

export function getFile(id_semester) {
    let route = `/exams/print?id_semester=${id_semester}`;
    return sendGetRequest(route);
}