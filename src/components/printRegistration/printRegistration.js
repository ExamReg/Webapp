import React from "react"
import "./style.css"
import {getUserInfo} from "../../api/authentication-api";

class PrintRegistration extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            nameUser:"",
            idUser:"",
            birthday:""
        }
    }
    async getInfoUser() {
        const res = await getUserInfo();
        if (res.success) {
            this.setState({
                nameUser: res.data.profile.name,
                idUser: res.data.profile.id_student,
                birthday: res.data.profile.birthday
            })
        } else {
            console.log(res.message)
        }
    }

    printScreen = () => {
      window.print();
    };
    componentDidMount() {
        this.getInfoUser();
    }

    render() {
        let dateObj = new Date();
        let  month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return (
            <div className="container-print ">
                <div className="title-print ">
                    Lịch thi
                </div>
                <button className="btn-print" onClick={this.printScreen}>
                    <span className="icon-print"> </span>
                    In kết quả
                </button>
                <div className="tbl-print ">
                    <div className="title-form">
                        <div className="title-left">
                            <p>ĐẠI HỌC QUỐC GIA HÀ NỘI</p>
                            <p style={{fontWeight:"bold"}}>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ</p>
                        </div>
                        <div className="title-right">
                            <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                            <p style={{fontWeight:"bold"}}>Độc lập - Tự do - Hạnh phúc </p>
                        </div>
                    </div>
                    <div className="header-tbl-print ">
                        <div className="name-tbl-print">KẾT QUẢ ĐĂNG KÍ THI - HỌC KÌ I NĂM 2018-2019</div>
                        <div className="name-tbl-print date">Ngày {day} tháng {month} năm {year}</div>
                        <div className="student-info">
                            <dl>
                                <dt>Họ và tên:</dt>
                                <dd>{this.state.nameUser}</dd>
                                <dt>Ngày sinh:</dt>
                                <dd>{this.state.birthday}</dd>
                                <dt>Mã sinh viên:</dt>
                                <dd>{this.state.idUser}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="body-tbl-print ">
                        <table>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã KT</th>
                                <th>Kỳ thi </th>
                                <th>Ngày thi </th>
                                <th>Giờ thi </th>
                                <th>Phòng thi </th>
                                <th>SBD </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>

                                <td>308G2</td>
                                <td>1</td>

                            </tr>
                            <tr>
                                <td>1</td>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>

                                <td>308G2</td>
                                <td>1</td>

                            </tr>
                            <tr>
                                <td>1</td>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>

                                <td>308G2</td>
                                <td>1</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{marginTop:"30px"}}>Tổng số môn thi đã đăng kí: [3]</div>
                        <div style={{marginTop:"30px"}} className="title-form">
                            <div className="title-left">
                                <p>SINH VIÊN </p>
                                <p style={{fontStyle:"intalic"}}>(Ký và ghi rõ họ tên) </p>
                            </div>
                            <div className="title-right">
                                <p>Hà Nội, ngày ... tháng ... năm 2019 </p>
                                <p style={{fontWeight:"bold"}}>XÁC NHẬN CỦA PHÒNG ĐÀO TẠO </p>
                            </div>
                        </div>
                    </div>


                </div>
        </div>);
    }
}
export default PrintRegistration;