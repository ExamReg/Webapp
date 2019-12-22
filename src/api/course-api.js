import {sendGetRequest} from "./api-sender";

export function getListExam() {
    let route = `/exams?id_semester=9`;
    return sendGetRequest(route);
}
export function getListExamRegisted() {
    let route = `/exams/registered?id_semester=9`;
    return sendGetRequest(route);
}
export function getListSubjectStudentStudy() {
    let route = `/courses?id_semester=9`;
    return sendGetRequest(route);
}