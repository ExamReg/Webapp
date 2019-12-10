import React from "react"
import "./style.css"

class ResultStudy extends React.Component{

    render() {
        return (
            <div className="container-study">
                <div className="title-study">
                    Kết quả học tập
                </div>
                <div className="dropdown-semester">
                    <span>Học kì</span>
                    <select>
                        <option value="191">191. Học kì 1 năm 2017-2018</option>
                        <option value="192">192. Học kì 2 năm 2018-2019</option>
                        <option value="193">193. Học kì 1 năm 2019-2020</option>
                    </select>
                </div>
                <div className="tbl-study">
                    <div className="header-tbl-study">
                        <div className="name-tbl-study">KẾT QUẢ HỌC TẬP  </div>
                        <div className="student-info">
                            <div>Sinh viên: Phùng Thị Tuyết Mai </div>
                            <div>Mã sinh viên: 17020875 </div>
                            <div>Lớp quản lý :QH-2017-I/CQ-C-D </div>
                        </div>
                    </div>
                    <div className="body-tbl-study">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã môn học </th>
                                    <th>Tên môn học </th>
                                    <th>Số TC  </th>
                                    <th>Điểm hệ 10 </th>
                                    <th>Điểm hệ 4 </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>INT2208 2</td>
                                    <td>Giải tích 1</td>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>INT2208 2</td>
                                    <td>Giải tích 1</td>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>INT2208 2</td>
                                    <td>Giải tích 1</td>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>INT2208 2</td>
                                    <td>Giải tích 1</td>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>4</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ResultStudy;