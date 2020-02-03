import React from 'react';
import "./style.css";
import logo from "../header/icons/logo-uet2.png";
import {login} from "../../api/authentication-api";
import {notification} from "../../utils/noti";
import Modal from "../modal/modal";

class Login extends React.Component{
    constructor()
    {
        super();

        this.state={
            login:false,
            username:"",
            password:"",

            isOpen:false,
            emailUser:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChange(e)
    {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]:val})
    }
    async handleLogin()
    {
        let {username, password} = this.state;
        if(username && password) {
            let data = {
                user_name: username,
                password: password
            }
            const response = await login(data);
            if (response.success) {
                console.log(response)
                localStorage.setItem("token", response.data.token);
                this.setState({login: true})
            } else {
                notification("error", response.message)
            }
        }
        else notification("warning", "Xin điền đủ thông tin")
    }
    toogleOpen = () =>
    {
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        if(this.state.login)
        {
            window.location.replace('/home/resultStudy')
        }
        return(
            <div className="container-login">
                <div className="header">
                    <div className="group-title">
                        <img  className="logo" src={logo} alt={"logo-uet.jpg"}/>
                        <div className="title">CỔNG THÔNG TIN ĐĂNG KÍ HỌC </div>
                    </div>
                </div>
                <div className="login-page">
                <div className="login-card">
                    <div className="login-card-header">
                        <div className="login-card-title">Đăng nhập hệ thống </div>
                    </div>
                    <div className="login-card-body">
                        <form>
                            <div className="login-group">
                                <label>Tên truy cập: </label>
                                <input type="text" name="username" onChange={this.handleChange}/>
                            </div>
                            <div className="login-group">
                                <label>Mật khẩu : </label>
                                <input type="password" name="password" onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>

                    <div className="login-card-help">
                        <div className="group-link">
                            <button className="btn-forgetpass space" onClick={this.toogleOpen}>Quên mật khẩu? </button>
                        </div>
                    </div>
                    <div className="login-card-footer">
                        <button className="btn-login" onClick={this.handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
                <Modal show={this.state.isOpen}
                       title="Quên mật khẩu "
                       onClose={this.toogleOpen}
                       addNew={() => {
                           if(this.state.emailUser) {
                               notification("success", "Yêu cầu của bạn đã gửi thành công ");
                               this.setState({emailUser: ""});
                               this.toogleOpen();
                           }
                           else {
                               notification("warning", "Xin điền đủ thông tin! ")
                           }
                       }}
                       brandButton={"Gửi "}
                       childrenContent={
                           <div className="modal-group">
                               <label>Email của bạn: </label>
                               <input type="text" name="emailUser" onChange={this.handleChange} value={this.state.emailUser}/>
                           </div>
                       }
                       />
            </div>

        );
    }
};
export default Login;