import React from "react"
import "./style.css"
import {getSemesters, getCoursesByIdSemester} from "../../api/semester-api";
import {getUserInfo} from "../../api/authentication-api";

class ResultStudy extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            semesters:[],
            courses:[],
            idSemester:"",

            idUser:"",
            nameUser:"",
            birthday:""
        }
        this.handleGetListSemester = this.handleGetListSemester.bind(this);
        this.handleGetListCoursesByIdSemester = this.handleGetListCoursesByIdSemester.bind(this);
        this.selectSemester = this.selectSemester.bind(this);
        this.getInfoUser = this.getInfoUser.bind(this);
    }
    async handleGetListSemester()
    {
        const res = await getSemesters();
        if(res.success)
        {
            this.setState({semesters: res.data.semesters})
        }
        else
        {
            console.log(res.message);
        }
    }
    async handleGetListCoursesByIdSemester()
    {
        const {idSemester} = this.state;
        const res = await getCoursesByIdSemester(idSemester);
        if(res.success)
        {
            this.setState({courses: res.data.courses})
        }
        else
            console.log(res.message);
    }
    selectSemester(event)
    {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems});
    }
    async getInfoUser (){
        const res = await getUserInfo();
        if(res.success)
        {
            this.setState({
                nameUser: res.data.profile.name,
                idUser: res.data.profile.id_student,
                birthday: res.data.profile.birthday
            })
        }
        else{
            console.log(res.message)
        }
    }
    componentDidMount() {
        this.handleGetListSemester();
        this.handleGetListCoursesByIdSemester();
        this.getInfoUser();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.idSemester !== prevState.idSemester)
        {
            this.handleGetListCoursesByIdSemester();
        }
    }

    render() {
        return (
            <div className="container-study">
                <div className="title-study">
                    Quản lý môn học
                </div>
                <div className="dropdown-semester">
                    <span>Học kì</span>
                    <select onChange={this.selectSemester}>
                        <option key="0" value="0">---</option>
                        {
                            (this.state.semesters || []).map((e, index) =>{
                                return <option key={e.id_semester} value={e.id_semester}>{e.value}</option>
                            })
                        }
                    </select>
                </div>
                <div className="tbl-study">
                    <div className="header-tbl-study">
                        <div className="name-tbl-study">KẾT QUẢ HỌC TẬP  </div>
                        <div className="student-info">
                            <div>
                                Mã sinh viên:
                                <span>{this.state.idUser}</span>
                            </div>
                            <div>
                                Sinh viên:
                                <span>{this.state.nameUser}</span>
                            </div>
                            <div>
                                Ngày sinh:
                                <span>{this.state.birthday}</span>
                            </div>

                        </div>
                    </div>
                    <div className="body-tbl-study">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã môn học </th>
                                    <th>Tên môn học </th>
                                    <th>Hoàn thành MH</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.courses || []).map((e, index) =>{
                                    return (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{e.id_course}</td>
                                            <td>{e.course_name}</td>
                                            <td>{ e.is_done === 1 ? "Hoàn thành " : "Chưa hoàn thành"}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ResultStudy;