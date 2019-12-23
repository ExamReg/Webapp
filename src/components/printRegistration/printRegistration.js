import React from "react"
import "./style.css"
import {getUserInfo} from "../../api/authentication-api";
import {getSemesters} from "../../api/semester-api";
import {getFile, getListExamRegisted} from "../../api/course-api";
import {notification} from "../../utils/noti";
import moment from "moment";
const URL_BASE = process.env.REACT_APP_API_URL;

class PrintRegistration extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            nameUser:"",
            idUser:"",
            birthday:"",

            semesters:[],
            idSemester:"",

            examsRegistered: [],
            numberSubjectRegisted: ""
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
    async handleGetListSemester() {
        const res = await getSemesters();
        if (res.success) {
            this.setState({semesters: res.data.semesters})
        } else {
            console.log(res.message);
        }
    }
    getListExamRegisted = async () => {
        const {idSemester} = this.state;
        if(idSemester){
            const res = await getListExamRegisted(idSemester);
            if (res.success) {
                this.setState({
                    examsRegistered: res.data.exams,
                    numberSubjectRegisted: res.data.exams.length
                })
            } else {
                notification("error", res.message);
            }
        }
    };
    selectSemester = (event) => {
        const idSems = event.target[event.target.selectedIndex].value;
        this.setState({idSemester: idSems});
    };
    printScreen = async () => {
        if(!this.state.idSemester){
            notification("warning", "Vui lòng chọn một kì học.")
        }else{
            let res = await getFile(this.state.idSemester);
                if(res.success)
                {
                    let a_tag = document.createElement('a');
                    let href = URL_BASE + "/static/" + res.data.file_name;
                    a_tag.setAttribute('target', '_blank');
                    a_tag.setAttribute('href', href);
                    a_tag.click();
                }
                else
                {
                    notification("error", res.message);
                }
        }
    };

    componentDidMount() {
        this.getInfoUser();
        this.handleGetListSemester();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.idSemester !== prevState.idSemester)
        {
            this.getListExamRegisted();
        }
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
                <div className="header-print-left">
                    <div className="dropdown-semester">
                        <span>Học kì</span>
                        <select onChange={this.selectSemester} defaultValue={0}>
                            <option key="0" value="0" disabled>---</option>
                            {
                                (this.state.semesters || []).map((e, index) => {
                                    return <option key={e.id_semester} value={e.id_semester}>{e.value}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="header-print-right">
                    <button className="btn-print" onClick={this.printScreen}>
                        <span className="icon-print"> </span>
                        In kết quả
                    </button>
                </div>

                {
                    this.state.idSemester === ""
                    ? <div><i>Bạn chưa chọn học kỳ!</i></div>
                    : <div className="tbl-print ">
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
                                <div className="name-tbl-print">KẾT QUẢ ĐĂNG KÍ THI - {this.state.examsRegistered.findIndex(e => e.id_semester === this.state.idSemester).value}</div>
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
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.examsRegistered.length === 0
                                            ? <tr><td colSpan={6}><i>Không có dữ liệu cho học kỳ này!</i></td></tr>
                                            :
                                            (this.state.examsRegistered).map((e, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{e.id_course}</td>
                                                        <td>{e.course_name}</td>
                                                        <td>{moment(parseInt(e.time_start)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                                        <td>{moment(parseInt(e.time_end)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                                        <td>{e.location}</td>
                                                    </tr>
                                                )})
                                    }
                                    </tbody>
                                </table>
                                <div style={{marginTop:"30px"}}>Tổng số môn thi đã đăng kí: [{this.state.numberSubjectRegisted}]</div>
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
                }

        </div>);
    }
}
export default PrintRegistration;