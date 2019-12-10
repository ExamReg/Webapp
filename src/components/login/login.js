import React from 'react';
import "./style.css";
import logo from "../home/icons/logo-uet2.png";
import {login} from "../../api/authentication-api";

class Login extends React.Component{
    constructor()
    {
        super();

        this.state={
            login:false,
            username:"",
            password:""
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
        let data = {
            user_name:username,
            password:password
        }
        const response = await login(data);
        if(response.success)
        {
            console.log(response)
            localStorage.setItem("token", response.data.token);
            this.setState({login:true})
        }
        else
        {
            console.log("fail login");
        }
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
                            <button className="btn-forgetpass space">Quên mật khẩu? </button>
                        </div>
                    </div>
                    <div className="login-card-footer">
                        <button className="btn-login" onClick={this.handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
};
export default Login;