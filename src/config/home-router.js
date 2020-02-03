
import ResultStudy from "../components/resultStudy/resultStudy";
import RegisterCourses from "../components/registerCourses/registerCourses";
import PrintRegistration from "../components/printRegistration/printRegistration";

export const HOME_ROUTER = [
    {
        path:"/home/resultStudy",
        component:ResultStudy
    },
    {
        path:"/home/register",
        component:RegisterCourses
    },
    {
        path:"/home/print",
        component:PrintRegistration
    }

];