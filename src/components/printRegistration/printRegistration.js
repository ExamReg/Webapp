import React from "react"
import "./style.css"

class PrintRegistration extends React.Component{
    render() {
        return (<div><div className="container-print ">
            <div className="title-print ">
                Lịch thi
            </div>
            <div className="dropdown-semester">
                <span>Học kì</span>
                <select>
                    <option value="191">191. Học kì 1 năm 2017-2018</option>
                    <option value="192">192. Học kì 2 năm 2018-2019</option>
                    <option value="193">193. Học kì 1 năm 2019-2020</option>
                </select>
            </div>
            <div className="tbl-print ">
                <div className="header-tbl-print ">
                    <div className="name-tbl-print ">KẾT QUẢ ĐĂNG KÍ THI </div>
                    <div className="student-info">
                        <div>Sinh viên: Phùng Thị Tuyết Mai </div>
                        <div>Mã sinh viên: 17020875 </div>
                        <div>Lớp quản lý :QH-2017-I/CQ-C-D </div>
                    </div>
                </div>
                <div className="body-tbl-print ">
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
                        </tr>
                        </tbody>
                    </table>
                </div>
                <button className="btn-print">
                    <span className="icon-print"> </span>
                    In kết quả
                </button>
            </div>
        </div></div>);
    }
}
export default PrintRegistration;