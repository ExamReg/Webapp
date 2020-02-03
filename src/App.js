import React, {Fragment} from 'react';
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom"
import {APP_ROUTER} from "./config/app-router";
import {ToastContainer} from "react-toastify";
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import '@fortawesome/fontawesome-free/css/all.css'
import 'react-toastify/dist/ReactToastify.css';
import Redirector from "./utils/redirector";

//ComponentDidMount -> register event from authen-service, call back la this.forceUpdate()
function App() {
    return (
            <Fragment>
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
                    <Redirect to="/home"/>
                    <Redirector/>
                </Switch>
                <ToastContainer/>
            </Fragment>
    );
}

function checkAuthen(component) {
    return localStorage.getItem("token") ? component : () => <Redirect to='/login'/>
}

function checkUnAuthen(component) {
    return !localStorage.getItem("token") ? component : () => <Redirect to='/home'/>

}

export default App;
