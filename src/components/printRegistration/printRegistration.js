import React from "react"
import "./style.css"

class PrintRegistration extends React.Component{
    render() {
        return (
            <div className="container-print ">
                <div className="title-print ">
                    Lịch thi
                </div>
                <button className="btn-print">
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
                        <div className="name-tbl-print date">Ngày 20 tháng 11 năm 2019</div>
                        <div className="student-info">
                            <div>
                                Sinh viên:
                                <span>Phùng Thị Tuyết Mai</span>
                            </div>
                            <div>
                                Ngày sinh:
                                <span>230-4-1999</span>
                            </div>
                            <div>
                                Mã sinh viên:
                                <span>17020875</span>
                            </div>
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