import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom"
import {APP_ROUTER} from "./config/app-router";


function App() {
    if(window.location.pathname === "/") {
        window.location.replace("/login");
    }
    else {
        return (
            <div>
                <Switch>
                    {
                        APP_ROUTER.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    component={
                                        route.requiredToken
                                            ? checkAuthen(route.component)
                                            : checkUnAuthen(route.component)
                                    }
                                />
                            );
                        })
                    }
                </Switch>
            </div>
        );
    }
}

function checkAuthen(component) {
    return localStorage.getItem("token") ? component : () => <Redirect to='/login'/>
}
function checkUnAuthen(component) {
    return !localStorage.getItem("token") ? component : () => <Redirect to='/home'/>

}
export default App;
