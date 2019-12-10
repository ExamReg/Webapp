import React from "react"
import "./style.css"
import iconBin from "./icons/icons8-trash-24 (2).png";
import iconUncheck from "./icons/icons8-unchecked-checkbox-24 (1).png";
import iconCheck from "./icons/icons8-checked-checkbox-24.png";

class RegisterCourses extends React.Component{
    render() {
        return (
            <div className="container-register">
                <div className="part-register">
                    <div className="title-register">Đăng ký thi - Học kì 1 2019-2020 </div>
                    <div className="header-register">
                        <input type="text" className="" placeholder="Nhập mã môn học/tên môn học "/>
                        <button type="button" className="btn-register">Tìm kiếm </button>
                    </div>
                    <div className="tbl-register register">
                        <table>
                            <thead>
                            <tr>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                                <th>Ngày thi </th>
                                <th>Giờ thi </th>
                                <th>Ca thi </th>
                                <th>Phòng thi </th>
                                <th>Đăng kí </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>
                                <td>3</td>
                                <td>308G2</td>
                                <td><img src={iconCheck}/> </td>
                            </tr>
                            <tr>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>
                                <td>3</td>
                                <td>308G2</td>
                                <td><img src={iconCheck}/></td>
                            </tr>
                            <tr>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>
                                <td>3</td>
                                <td>308G2</td>
                                <td><img src={iconUncheck}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="part-result-register">
                    <div className="title-register">Danh sách môn học đã đăng ký hoặc đã chọn </div>
                    <div className="tbl-register result">
                        <table>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                                <th>Ngày thi </th>
                                <th>Giờ thi </th>
                                <th>Ca thi </th>
                                <th>Phòng thi </th>
                                <th>SBD </th>
                                <th>Hủy đăng kí </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>
                                <td>3</td>
                                <td>308G2</td>
                                <td>1</td>
                                <td><img src={iconBin}/></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>
                                <td>3</td>
                                <td>308G2</td>
                                <td>1</td>
                                <td><img src={iconBin}/></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>INT2028 2</td>
                                <td>Toán rời rạc </td>
                                <td>23/04/2019</td>
                                <td>7 AM</td>
                                <td>3</td>
                                <td>308G2</td>
                                <td>1</td>
                                <td><img src={iconBin}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="footer-register">
                        <div>Tổng số môn đã đăng kí: [3]</div>
                        <button className="btn-register">Lưu thay đổi </button>
                    </div>

                </div>

            </div>);
    }
}
export default RegisterCourses;