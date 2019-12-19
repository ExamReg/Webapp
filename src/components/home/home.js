import React from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import "./style.css"
import MenuBar from "../menubar/menubar";
import {HOME_ROUTER} from "../../config/home-router";
import Header from "../header/header";

class Home extends React.Component{
    render() {

        return (
                <div className="container-home">
                    <Header/>
                    <div className="content-home">
                        <div className="menubar">
                            <MenuBar/>
                        </div>
                        <div className="content">
                            <Switch>
                                {
                                    HOME_ROUTER.map((route, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                component={route.component}
                                            />
                                        )
                                    })
                                }
                                <Redirect to='/home/resultStudy'/>
                            </Switch>
                        </div>
                    </div>

                </div>
        );
    }

}
export default Home;