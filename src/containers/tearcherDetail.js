import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {mapGradeIdToName, mapSubjectIdToName} from '../utils/TreeToo'
import {Button, Input, Tabs, Radio, message, Popover} from 'antd'
import '../App.css'
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const teacherCertificates = [
    { "code": "idCard", "display": "身份证"},
    { "code": "degreeCert", "display": "学位证" },
    { "code": "levelCert", "display": "职称" },
    { "code": "empCard", "display": "工作证" },
    { "code": "quaCert", "display": "教师资格证" },
    { "code": "psyCert", "display": "心理学证书" },
    { "code": "eduCert", "display": "教育学证书" },
];

class TeacherDetail extends Component {
    constructor(props) {
        super(props);
        const {teacher} = props.detail;
        this.state = {
            checkStatus: teacher.passed !== undefined ? teacher.passed : 0
        }
    }
    onCheckStatusChange(e) {
        this.setState({checkStatus: e.target.value})
    }
    onConfirmBtnClick() {
        if (this.state.passed) {
            const textArea = document.getElementById('comment');
            if (textArea.value === '') {
                message.warning('请输入未通过原因');
                return;
            }
        }
        browserHistory.goBack()
    }

    certificateRender() {
        const {teacher} = this.props.detail;
        return (
            <Tabs defaultActiveKey={teacherCertificates[0].code}>
                {teacherCertificates.map(certificate => {
                    return (
                        <TabPane tab={certificate.display} key={certificate.code}>
                            <Popover content={<img src={teacher[certificate.code]}/>} trigger="click">
                                <img className="small-img" src={teacher[certificate.code]}/>
                            </Popover>
                        </TabPane>
                    )
                })}
            </Tabs>
        )
    }

    render() {
        const {teacher} = this.props.detail;
        const {dictionary} = this.props.dictionary;

        return (
            <div className="detail-warp">
                <div className="row-form">
                    <label className='control-label'>名称：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {teacher.userName}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>性别：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {teacher.genderId ==='1' ? '男' : '女' }</label>
                    </div>
                </div>
                <div className="row-form">
                    <label className='control-label'>生日：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {teacher.birthday}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>年级：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {mapGradeIdToName(dictionary.knowledgeTree, teacher.gradeId)}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>科目：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {mapSubjectIdToName(dictionary.subjectList, teacher.subjectIds)}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>所在学校：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {teacher.name}</label>
                    </div>
                </div>

                <div className="row-form certificate-height">
                    <label className='control-label'>认证：</label>
                    <div className="margin-left-20"  style={{width: '360px'}}>
                        {this.certificateRender()}
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.passed}>
                            <Radio value={0}>通过</Radio>
                            <Radio value={1}>否决</Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div className={'row-form textarea-height ' + (this.state.passed ? '' : 'item-hide')}>
                    <label className='control-label'>备注：</label>

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                </div>

                <div className="confirm-box">
                    <Button type="primary" onClick={()=> this.onConfirmBtnClick()}>确定</Button>
                    <Button type="default" onClick={browserHistory.goBack}>取消</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary,
        detail: state.teacher
    }
};
export default connect(mapStateToProps)(TeacherDetail)