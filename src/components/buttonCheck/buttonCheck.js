import React from "react";
import {getListExamRegisted, getListSubjectStudentStudy} from "../../api/course-api";
import {notification} from "../../utils/noti";

class ButtonCheck extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            childContent:"",
            subjectsStudentStudy:[],
            examsRegistered:[],

            maxN: this.props.maximum_seating,
            seated : this.props.seated,
            idCourse: this.props.id_course,
            idCs: this.props.id_cs,

            iconUncheck: "far fa-square",
            iconCheck: "far fa-check-square"
        }
    }
    getListSubjectStudentStudy = async () => {
        const res = await getListSubjectStudentStudy();
        if (res.success) {
            this.setState({subjectsStudentStudy: res.data.courses});
        } else {
            notification("error", res.message);
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

    checkTypeButtonWhenSelect = () => {
        const {maxN, seated, idCourse, id_cs} = this.state;
        let result;
        const {subjectsStudentStudy, examsRegistered} = this.state;
        if (maxN > seated) {
            let checkEligible = false;
            let checkExist = false;
            for (let i = 0; i < subjectsStudentStudy.length; i++) {
                if (subjectsStudentStudy[i].id_course === idCourse && subjectsStudentStudy.is_eligible === 1) {
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
                if (!checkExist) {
                    result =  <button>
                        <i className={this.state.iconCheck}>&nbsp;</i>
                    </button> ;

                } else
                    result = "";

            } else
                result = "";
        } else
            result = "";
        this.setState({childContent: result});
    };
    componentDidMount() {
        this.getListExamRegisted();
        this.getListSubjectStudentStudy();
        this.checkTypeButtonWhenSelect();
    }

    render() {
        return (
            <td>{this.state.childContent}</td>
        );
    }
}
export default ButtonCheck;