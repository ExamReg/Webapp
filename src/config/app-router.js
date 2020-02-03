import Login from "../components/login/login";
import Home from "../components/home/home";


export const APP_ROUTER = [
    {
        path:"/login",
        component:Login,
        requiredToken:false
    },
    {
        path:"/home",
        component:Home,
        requiredToken: true
    }
];