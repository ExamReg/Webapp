import React from 'react';
import "./style.css";
import {NavLink } from "react-router-dom";

class MenuItem extends React.Component{

    render() {
        return (
            <li className="menu-item">
                <NavLink exact
                    activeStyle={{
                        backgroundColor : "#fff",
                        color:"#1b548b"
                    }}
                    to={this.props.route} className="link-text">

                    <div className="icon-content">
                        <i className={this.props.name}></i>
                    </div>
                    <span>{this.props.title}</span>

                </NavLink>
            </li>
        );
    }
}
export default MenuItem;