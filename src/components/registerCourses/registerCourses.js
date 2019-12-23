import React from "react"
import "./style.css"
import {getListExam, getListExamRegisted, getNewEastSemster, saveChange} from "../../api/course-api";
import moment from "moment"
import {notification} from "../../utils/noti";


class RegisterCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            examsRegistered: [],


            idCurrentSemester: "",
            currentSemester: "",
            timeStartRegister: "",
            timeEndRegister: "",

            numberSubjectRegisted: "",

            imgIcon: "far fa-square",
            toggleCheck: false,
            checkOutRegister: false

        };

    }

    getListExam = async () => {
        const {idCurrentSemester} = this.state;
        const res = await getListExam(idCurrentSemester);
        if (res.success) {
            this.setState({exams: res.data.exams})
        } else {
            console.log(res.message);
        }

    };

    handleClickSelectExam = (id_cs, id_slot, id_course, course_name, time_start, time_end, location) => {
        let data = {
            id_course: id_course,
            course_name: course_name,
            time_start: time_start,
            time_end: time_end,
            location: location,
            id_cs: id_cs,
            id_slot: id_slot
        };
        let arr = this.state.examsRegistered;
        arr.push(data);

        this.setState({
            examsRegistered: arr,
            toggleCheck: true
        });

        notification("info", "Môn học chỉ được chấp nhận khi bạn ấn lưu thay đổi")
    };

    handleClickButtonDelete = (id_slot) => {
        let arr = this.state.examsRegistered;

        arr.splice(arr.findIndex(e => e.id_slot === id_slot), 1);

        this.setState({
            examsRegistered: arr,
            toggleCheck: true
        });
        notification("info", "Môn học chỉ được chấp nhận khi bạn ấn lưu thay đổi")

    };

    checkReturnButton = (maximum_seating, seated, is_eligible, id_cs
        , id_slot, id_course, course_name, time_start, time_end, location) => {

        const {examsRegistered} = this.state;
        if (maximum_seating <= seated || is_eligible === 0) {
            return "";
        } else {
            for (let e of examsRegistered) {
                if (e.id_cs === id_cs) {
                    return "";
                }
            }
            return <button className="btn-tick"
                           onClick={() => this.handleClickSelectExam(id_cs, id_slot, id_course, course_name, time_start, time_end, location)}>
                Chọn
            </button>;
        }
    };
    handleSaveChange = async () => {
        const {idCurrentSemester, examsRegistered} = this.state;

        let slota = [];
        for (let e of examsRegistered) {
            slota.push({id_slot: e.id_slot});
        }

        let data = {
            slots: slota
        };

        const res = await saveChange(idCurrentSemester, data);
        if (res.success) {
            notification("success", "Ghi nhận thành công");
            this.setState({
                toggleCheck: true,
                numberSubjectRegisted: examsRegistered.length
            })
        } else {
            notification("error", res.message)
        }
    };

    async componentDidMount() {

        const resS = await getNewEastSemster();
        if (resS.success) {
            const data = resS.data.semester;

            let date = Date.now();

            if (parseInt(date) >= parseInt(data.register_from) && parseInt(date) <= parseInt(data.register_to)) {
                const resE = await getListExam(data.id_semester);
                const resERegisted = await getListExamRegisted(data.id_semester);

                if (resE.success && resERegisted.success) {
                    this.setState({
                        idCurrentSemester: data.id_semester,
                        currentSemester: data.value,
                        timeStartRegister: moment(parseInt(data.register_from)).utcOffset(420).format("YYYY/MM/DD HH:mm"),
                        timeEndRegister: moment(parseInt(data.register_to)).utcOffset(420).format("YYYY/MM/DD HH:mm"),

                        exams: resE.data.exams,

                        examsRegistered: resERegisted.data.exams,
                        numberSubjectRegisted: resERegisted.data.exams.length
                    })
                } else {
                    notification("error", resE.message);
                    notification("error", resERegisted.message);
                }
            } else {
                this.setState({
                    checkOutRegister: true,
                    idCurrentSemester: data.id_semester,
                    currentSemester: data.value,
                    timeStartRegister: moment(parseInt(data.register_from)).utcOffset(420).format("YYYY/MM/DD HH:mm"),
                    timeEndRegister: moment(parseInt(data.register_to)).utcOffset(420).format("YYYY/MM/DD HH:mm"),
                })
            }
        } else {
            notification("error", resS.message);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.toggleCheck) {
            this.setState({
                toggleCheck: false,
            });
            this.getListExam();
        }
    }

    render() {
        return (
            this.state.checkOutRegister
                ? <div className="container-claim">
                    <div className="header-register">
                        <div className="title-register">Đăng ký thi - {this.state.currentSemester}</div>
                        <i className="time-register">Thời gian đăng ký:
                            [{this.state.timeStartRegister} - {this.state.timeEndRegister}]</i>
                    </div>
                    <h3 className="header-claim">Thông báo </h3>
                    <div className="content-claim">
                        <div>Đang khóa đăng ký học, bạn vui lòng thử lại sau!</div>
                    </div>
                </div>
                :
                <div className="container-register">
                    <div className="header-register">
                        <div className="title-register">Đăng ký thi - {this.state.currentSemester}</div>
                        <i className="time-register">Thời gian đăng ký:
                            [{this.state.timeStartRegister} - {this.state.timeEndRegister}]</i>
                    </div>
                    <div className="body-register">
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
                                        <th>Chọn  </th>
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
                                                    <td className="style-center">
                                                        {this.checkReturnButton(e.maximum_seating, e.seated, e.is_eligible, e.id_cs
                                                            , e.id_slot, e.id_course, e.course_name, parseInt(e.time_start), parseInt(e.time_end), e.location)}
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
                            <div className="box-header">Danh sách môn thi đã đăng ký hoặc đã chọn</div>
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
                                        this.state.examsRegistered.length === 0
                                            ? <tr>
                                                <td colSpan={7}><i>Bạn chưa chọn môn thi nào!</i></td>
                                            </tr>
                                            :
                                            (this.state.examsRegistered).map((e, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="style-center">{index + 1}</td>
                                                        <td>{e.id_course}</td>
                                                        <td>{e.course_name}</td>
                                                        <td>{moment(parseInt(e.time_start)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                                        <td>{moment(parseInt(e.time_end)).utcOffset(420).format("YYYY/MM/DD HH:mm")}</td>
                                                        <td>{e.location}</td>
                                                        <td className="style-center">
                                                            <button className="btn-delete"
                                                                    onClick={() => this.handleClickButtonDelete(e.id_slot)}>
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
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
                            <button className="btn-register" onClick={this.handleSaveChange}><i className="fas fa-save btn-space"></i>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default RegisterCourses;