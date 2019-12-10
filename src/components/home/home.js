import React from "react";
import {Redirect, Switch, Route, BrowserRouter} from "react-router-dom";
import "./style.css"
import MenuBar from "../menubar/menubar";
import logo from "./icons/logo-uet2.png";
import {HOME_ROUTER} from "../../config/home-router";
import Modal from "../modal/modal";

class Home extends React.Component{
    constructor()
    {
        super();
        const token = localStorage.getItem("token");
        let logout = false;
        if(token === null)
        {
            logout = true
        }
        this.state = {
            logout,
            isOpen: false
        }
    }
    handleLogout = () =>{
        localStorage.removeItem("token");
        this.setState({logout: true})
    }
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render() {
        if(this.state.logout)
        {
            window.location.replace('/login')
        }
        return(
            <div className="container-home">
                <div className="header">
                    <div className="group-title">
                        <img  className="logo" src={logo} alt={"logo-uet.jpg"}/>
                        <div className="title">CỔNG THÔNG TIN ĐĂNG KÍ HỌC </div>
                    </div>
                    <div className="group-user-menu">
                        <div className="dropdown">
                            <button className="dropbtn">Chao mung: Phung Thi Tuyet Mai - <b>[17020875]</b> </button>
                            <div className="dropdown-content">
                                <div className="btn-user" onClick={this.toggleModal}>
                                    <span className="icon-user"></span>
                                    Thay đổi mật khẩu
                                </div>
                                <div  className="btn-logout" onClick={this.handleLogout}>
                                    <span className="icon-logout"></span>
                                    Đăng xuất
                                </div>
                                <Modal show={this.state.isOpen}
                                       onClose={this.toggleModal}
                                       addNew={() => console.log("add new ")}
                                       title="Thay đổi mật khẩu  "
                                       childrenContent={
                                           <form>
                                               <div className="modal-group">
                                                   <label>Mật khẩu hiện cũ: </label>
                                                   <input type="password"/>
                                               </div>
                                               <div className="modal-group">
                                                   <label>Mật khẩu mới  : </label>
                                                   <input type="password"/>
                                               </div>
                                               <div className="modal-group">
                                                   <label>Xác nhận lại  : </label>
                                                   <input type="password"/>
                                               </div>
                                           </form>
                                       }
                                       brandButton={"Lưu "}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-home">
                    <BrowserRouter>
                        <div className="menubar">
                            <MenuBar/>
                        </div>
                        <div className="content">
                            <Switch>
                                {
                                    HOME_ROUTER.map((route, index) =>{
                                        return(
                                            <Route
                                                key={index}
                                                path={route.path}
                                                component={route.component}
                                            />
                                        )
                                    })
                                }
                                <Redirect to='/home'/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>

           </div>);
    }
}
export default Home;