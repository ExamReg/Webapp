import {sendGetRequest} from "./api-sender";

export function getListExam() {
    let route = "/exams?id_semester=8";
    return sendGetRequest(route);
}