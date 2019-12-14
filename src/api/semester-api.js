import {sendGetRequest} from "./api-sender";

export function getSemesters() {
    let route = "/semesters";
    return sendGetRequest(route);
}
export function getCoursesByIdSemester(id_semester) {
    let route = `/courses/?id_semester=${id_semester}`;
    return sendGetRequest(route);
}