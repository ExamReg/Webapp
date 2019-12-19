import {sendGetRequest} from "./api-sender";

export function getListExam() {
    let route = "/exams";
    return sendGetRequest(route);
}