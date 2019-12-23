import React from "react";
import "./header.css"
import logo from "./icons/logo-uet2.png";
import Modal from "../modal/modal";
import {changepassword, getUserInfo} from "../../api/authentication-api";
import {notification} from "../../utils/noti";

class Header extends React.Component{
    constructor(props)
    {

        super(props);
        const token = localStorage.getItem("token");
        let logout = false;
        if(token === null)
        {
            logout = true
        }
        this.state = {
            logout,
            isOpen: false,

            oldPassword:"",
            newPassword:"",
            rePassword:"",

            nameUser:"",
            IdUser:""
        }
    }
    handleChange = (e) =>{
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]:val});
    };
    getInfoUser = async () =>{
        const res = await getUserInfo();
        if(res.success)
        {
            this.setState({nameUser: res.data.profile.name, IdUser: res.data.profile.id_student})
        }
        else{
            notification("error", res.message)
        }
    }
    changePassword = async () =>{
        const {oldPassword, newPassword, rePassword} = this.state;
        if( oldPassword && newPassword && rePassword) {
            if(newPassword === rePassword) {
                let data = {
                    new_password: newPassword,
                    old_password: oldPassword
                }
                const res = await changepassword(data);
                if(res.success)
                {
                    notification("success", "Thay đổi mật khẩu thành công ")
                    this.toggleModal();
                }
                else
                    notification("error", res.message)
            }
            else {
                notification("error", "Nhập lại mật khẩu không đúng ")
            }
        }
        else
            notification("warning", "Xin điền đủ thông tin ")
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
    componentDidMount() {
        this.getInfoUser();
    }
    render() {
        if(this.state.logout)
        {
            window.location.replace('/login')
        }
        return(
            <div className="header">
                <div className="group-title">
                    <img  className="logo" src={logo} alt={"logo-uet.jpg"}/>
                    <div className="title">CỔNG THÔNG TIN ĐĂNG KÍ LỊCH THI  </div>
                </div>
                <div className="group-user-menu">
                    <div className="dropdown">
                        <button className="dropdown-toggle btn-size btn-dropdown" type="button"
                                data-toggle="dropdown">
                            Chào mừng: {this.state.nameUser} - <b>{this.state.IdUser}</b>
                            <span className="caret"/>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li className="btn-user btn-size" onClick={this.toggleModal}>
                                <div>
                                    <i className="fas fa-user"/>
                                    Thay đổi mật khẩu
                                </div>
                            </li>
                            <li className="btn-logout btn-size" onClick={this.handleLogout}>
                                <div>
                                    <i className="fas fa-sign-out-alt"/>
                                    Đăng xuất
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal}
                       addNew={this.changePassword}
                       title="Thay đổi mật khẩu  "
                       childrenContent={
                           <form>
                               <div className="modal-group">
                                   <label>Mật khẩu hiện cũ: </label>
                                   <input type="password" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange}/>
                               </div>
                               <div className="modal-group">
                                   <label>Mật khẩu mới  : </label>
                                   <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange}/>
                               </div>
                               <div className="modal-group">
                                   <label>Xác nhận lại  : </label>
                                   <input type="password" name="rePassword" value={this.state.rePassword} onChange={this.handleChange}/>
                               </div>
                           </form>
                       }
                       brandButton={"Lưu "}
                />
            </div>
        );
    }
}
export default Header;