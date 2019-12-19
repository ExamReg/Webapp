import React from "react"
import "./style.css"
import {getListExam} from "../../api/course-api";

class RegisterCourses extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            exams:[],
            examRegisters:[]
        }
        this.getListExam = this.getListExam.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
    }
    async getListExam()
    {
        const res = await getListExam();
        if(res.success)
        {
            this.setState({exams: res.data.exams})
        }
        else
        {
            console.log(res.message);
        }
    }
    selectCourse(index)
    {
        console.log(index)
    }
    componentDidMount() {
        this.getListExam();
    }

    render() {
        return (
            <div className="container-register">
                <div className="title-register">Đăng ký thi - Học kì 1 2019-2020 </div>
                <div className="input-find">
                    <input type="text" className="" placeholder="Nhập mã môn học/tên môn học "/>
                    <button type="button" className="btn-register">Tìm kiếm </button>
                </div>
                <div className="box blue-border">
                    <div className="box-header">Đăng kí lịch thi - Học kì 1 2018-2019</div>
                    <div className="box-content">
                        <table>
                            <thead>
                            <tr>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                                <th className="style-center">TC</th>
                                <th className="style-center">Tổng SV</th>
                                <th className="style-center">Đã ĐK</th>
                                <th>Ngày thi </th>
                                <th>Giờ thi </th>
                                <th>Phòng thi </th>
                                <th className="style-center">Chọn </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.exams || []).map((e, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{e.id_course}</td>
                                            <td>{e.course_name}</td>
                                            <td className="style-center">3</td>
                                            <td className="style-center">{e.maximum_seating}</td>
                                            <td className="style-center">{e.seated}</td>
                                            <td>{e.date}</td>
                                            <td>{e.time_start}</td>
                                            <td>{e.location}</td>
                                            <td className="style-center" onClick={() => this.selectCourse(index)}>
                                                    <i className="far fa-square "></i>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="box green-border">
                    <div className="box-header">Danh sách môn học đã đăng ký hoặc đã chọn</div>
                    <div className="box-content">
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
                                <th className="style-center">Hủy đăng kí </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.examRegisters || []).map((e, index) =>{
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{e.id_course}</td>
                                            <td>{e.course_name}</td>
                                            <td>{e.date}</td>
                                            <td>{e.time_start}</td>
                                            <td>{e.location}</td>
                                            <td>{index}</td>
                                            <td className="style-center" style={{color:"red"}}><i className="fas fa-trash-alt"></i></td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="footer-register">
                    <div>Tổng số môn đã đăng kí: [3]</div>
                    <button className="btn-register">Lưu thay đổi </button>
                </div>
            </div>);
    }
}
export default RegisterCourses;