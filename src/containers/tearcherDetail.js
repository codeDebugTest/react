import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {mapGradeIdToName, mapSubjectIdToName} from '../utils/TreeToo'
import {doAuditResource} from '../actions/auditResource.action'
import {GENDER_FEMALE, GENDER_MALE, Biz_Target_Type} from '../utils/constants'
import {Button, Input, Tabs, Radio, message, Popover} from 'antd'
import '../App.css'
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

const teacherCertificates = [
    { "code": "idCard", "display": "身份证"},
    { "code": "empCard", "display": "工作证" },
    { "code": "quaCert", "display": "教师资格证" },
    { "code": "psyCert", "display": "心理学证书" },
    { "code": "eduCert", "display": "教育学证书" },
];

class TeacherDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passed: false,
        }
    }
    onCheckStatusChange(e) {
        this.setState({passed: e.target.value})
    }

    closePage() {
        browserHistory.goBack();
    }

    auditFailed() {
        message.error('审批失败！');
    }

    onConfirmBtnClick() {
        const {teacher} = this.props.detail;
        if (teacher.verified) {
            this.closePage();
            return;
        }

        const textArea = document.getElementById('comment');
        if (!this.state.passed) {
            if (textArea.value === '') {
                message.warning('请输入未通过原因');
                return;
            }
        }

        const {detail, userState} = this.props;
        const requestInfo = {
            auditComment: textArea.value,
            auditPassed: this.state.passed,
            bizTargetType: Biz_Target_Type.TEACHER,
            targetId: detail.teacher.userId,
            userToken: userState.userInfo.userToken
        };

        doAuditResource(requestInfo, this.closePage, this.auditFailed);
    }

    certificateRender() {
        const {teacher} = this.props.detail;
        return (
            <Tabs defaultActiveKey={teacherCertificates[0].code}>
                {teacherCertificates.map(certificate => {
                    return (
                        <TabPane tab={certificate.display} key={certificate.code}>
                            <Popover content={<img src={teacher[certificate.code]}/>} trigger="click">
                                {teacher[certificate.code] ?
                                    <img className="small-img" src={teacher[certificate.code]}/>
                                    : ''
                                }
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
                        <label className="info-label"> {teacher.userNameFull}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>性别：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {teacher.genderId ===GENDER_MALE ? '男' : teacher.genderId === GENDER_FEMALE ? '女' : ''}</label>
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
                        <label className="info-label"> {mapSubjectIdToName(dictionary.subjectList, teacher.subjectId)}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>所在学校：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {teacher.schoolName}</label>
                        <label className={teacher.schoolVerified ? 'info-color' : 'warn-color'} style={{marginLeft: '30px'}}>
                            {teacher.schoolVerified ? '已审核' : teacher.schoolVerified === false ? '未审核' : ''}
                        </label>
                    </div>
                </div>

                <div className="row-form certificate-height">
                    <label className='control-label'>认证：</label>
                    <div className="margin-left-20"  style={{width: '450px'}}>
                        {this.certificateRender()}
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    {!teacher.verified ?
                        <div className="margin-left-20">
                            <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.passed}>
                                <Radio value={true}>通过</Radio>
                                <Radio value={false}>否决</Radio>
                            </RadioGroup>
                        </div>
                        : <label className="info-label info-color info-color">已审核</label>
                    }

                </div>

                {!teacher.verified ?
                    <div className={'row-form textarea-height ' + (this.state.passed ? 'item-hide' : '')}>
                        <label className='control-label'>备注：</label>

                        <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                    </div>
                    : ''
                }

                {teacher.verified
                    ? <div className="confirm-box">
                        <Button type="primary" onClick={this.closePage}>返回</Button>
                    </div>
                    : <div className="confirm-box">
                        <Button type="primary" onClick={() => this.onConfirmBtnClick()}>确定</Button>
                        <Button type="default" onClick={this.closePage}>取消</Button>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary,
        detail: state.teacher,
        userState: state.login,
    }
};
export default connect(mapStateToProps)(TeacherDetail)