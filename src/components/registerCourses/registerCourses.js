import React from "react"
import "./style.css"
import {getListExam, getListExamRegisted, getListSubjectStudentStudy} from "../../api/course-api";
import moment from "moment"
import {notification} from "../../utils/noti";
import {getSemesters} from "../../api/semester-api";

class RegisterCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [{
                is_check: true
            },{
                is_check: false
            }],
            examsRegistered: [],
            subjectsStudentStudy: [],
            idCurrentSemester: "",
            currentSemester: "",

            numberSubjectRegisted: "",

            imgIcon: "far fa-square",
            toggleUnCheck: false
        };

    }

    getListSubjectStudentStudy = async () => {
        const res = await getListSubjectStudentStudy();
        if (res.success) {
            this.setState({subjectsStudentStudy: res.data.courses});
        } else {
            notification("error", res.message);
        }
    };
    getCurrentSemester = async () => {
        const res1 = await getSemesters();
        if (res1.success) {
            let nSemester = res1.data.semesters.length;
            this.setState({
                idCurrentSemester: res1.data.semesters[nSemester - 1].id_semester,
                currentSemester: res1.data.semesters[nSemester - 1].value
            })
        } else {
            console.log(res1.message);
        }
    };
    getListExam = async () => {
        const res = await getListExam();
        if (res.success) {
            this.setState({exams: res.data.exams})
        } else {
            console.log(res.message);
        }

    };
    getListExamRegisted = async () => {
        const res = await getListExamRegisted();
        if (res.success) {
            this.setState({
                examsRegistered: res.data.exams,
                numberSubjectRegisted: res.data.exams.length
            })
        } else {
            notification("error", res.message);
        }
    };

    handleChangeButtonCheck = (idCs, nameCs, times, timee, room) => {
        let data = {
            id_course: idCs,
            name_course: nameCs,
            time_start: times,
            time_end: timee,
            location: room,
        };
        let arr = this.state.examsRegistered;
        arr.push(data);
        this.setState({
            examsRegistered: arr,
            imgIcon: this.state.imgIcon==="far fa-check-square" ? "far fa-square" :"far fa-check-square"
        });



    };

   /* checkReturnButton = (row) =>{
        if(row.seated >= row.maximum_seating || row.is_eligible) {
            return "";
        }else{
            for(let e of this.state.examsRegistered){
                if(e.id_cs === row.id_cs){
                    return "";
                }
            }
            return <button></button>
        }
    };


    toggleButtonCheck = () =>{

    }
*/
    checkTypeButtonWhenSelect = (maxN, seated, idCourse, id_cs, times, timee, room, cs_name) => {
        const {subjectsStudentStudy, examsRegistered} = this.state;
        if (maxN > seated) {
            let checkEligible = false;
            let checkExist = false;
            for (let i = 0; i < subjectsStudentStudy.length; i++) {
                if (subjectsStudentStudy[i].id_course === idCourse && subjectsStudentStudy[i].is_eligible === 1) {
                    checkEligible = true;
                    break;
                }
            }
            if (checkEligible) {
                for (let i = 0; i < examsRegistered.length; i++) {
                    if (examsRegistered[i].id_cs === id_cs) {
                        checkExist = true;
                        break;
                    }
                }
                if (checkExist) {
                    return (
                    <button onClick={() =>
                        this.handleChangeButtonCheck(idCourse,cs_name,times, timee, room)
                    }>

                    </button>);

                } else
                    return "";

            } else
                return "";
        } else
            return "";
    };

    componentDidMount() {
        this.getCurrentSemester();
        this.getListExam();
        this.getListExamRegisted();
        this.getListSubjectStudentStudy();
    }

    render() {
        return (
            <div className="container-register">
                <div className="title-register">Đăng ký thi - {this.state.currentSemester}</div>
                <div className="input-find">
                    <input type="text" className="" placeholder="Nhập mã môn học/tên môn học "/>
                    <button type="button" className="btn-register">Tìm kiếm</button>
                </div>
                <div className="box blue-border">
                    <div className="box-header">Đăng kí lịch thi - {this.state.currentSemester}</div>
                    <div className="box-content">
                        <table>
                            <thead>
                            <tr>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                                <th className="style-center">Tổng SV</th>
                                <th className="style-center">Đã ĐK</th>
                                <th>Bắt đầu</th>
                                <th>Kết thúc</th>
                                <th>Phòng thi</th>
                                <th className="style-center">Chọn</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.exams || []).map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{e.id_course}</td>
                                            <td>{e.course_name}</td>
                                            <td className="style-center">{e.maximum_seating}</td>
                                            <td className="style-center">{e.seated}</td>
                                            <td>{moment(parseInt(e.time_start)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                            <td>{moment(parseInt(e.time_end)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                            <td>{e.location}</td>
                                            <td>
                                                {this.checkTypeButtonWhenSelect(e.maximum_seating,e.seated, e.id_course,
                                                    e.id_cs,parseInt(e.time_start),parseInt(e.time_end), e.location, e.course_name )}
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
                                <th className="style-center">STT</th>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                                <th>Bắt đầu</th>
                                <th>Kết thúc</th>
                                <th>Phòng thi</th>
                                <th className="style-center">Hủy đăng kí</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                (this.state.examsRegistered).map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="style-center">{index + 1}</td>
                                            <td>{e.id_course}</td>
                                            <td>{e.course_name}</td>
                                            <td>{moment(parseInt(e.time_start)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                            <td>{moment(parseInt(e.time_end)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                            <td>{e.location}</td>
                                            <td className="style-center" style={{color: "red"}}>
                                                <i className="fas fa-trash-alt"></i>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="footer-register">
                    <div>Tổng số môn đã đăng kí: [{this.state.numberSubjectRegisted}]</div>
                    <button className="btn-register">Lưu thay đổi</button>
                </div>
            </div>);
    }
}

export default RegisterCourses;