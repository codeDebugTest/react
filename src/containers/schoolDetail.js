import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {Biz_Target_Type} from '../utils/constants'
import {doAuditResource} from '../actions/auditResource.action'
import {doUpdateSchool} from '../actions/school.action'
import {Button, Icon, Input, message, Radio} from 'antd'
import '../App.css'
const RadioGroup = Radio.Group;


class SchoolDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            passed: true
        }
    }

    closePage() {
        browserHistory.goBack();
    }

    onCheckStatusChange(e) {
        this.setState({passed: e.target.value})
    }

    onEditAddress() {
        this.setState({edit: true});
    }

    verifySchool() {
        const textArea = document.getElementById('comment');
        if (!this.state.passed) {
            if (textArea.value === '') {
                message.warning('请输入未通过原因');
                return;
            }
            console.log(textArea.value);
        }

        const {userState, detail} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo.userToken,
            'bizTargetType': Biz_Target_Type.SCHOOL,
            'auditPassed': this.state.passed,
            'targetId': detail.school.id,
            'auditComment': this.state.passed ?  '' : textArea.value
        };

        doAuditResource(requestInfo, this.closePage.bind(this), (msg)=> {message.error(msg)});
    }

    onConfirmBtnClick() {
        const {school} = this.props.detail;
        if (school.verified) {
            this.closePage();
            return ;
        }

        if(this.state.edit) {
            const schoolName = document.getElementById('schoolName').value;
            if (school.name !== schoolName) {
                const { userInfo} = this.props.userState;

                doUpdateSchool({
                    regionId: userInfo.regionId,
                    userToken: userInfo.userToken,
                    id: school.id,
                    name: schoolName,
                }, this.verifySchool.bind(this), (msg) => {message.error(msg)})
            }
        }
        this.verifySchool();
    }

    render() {
        const {school} = this.props.detail;

        return (
            <div className="detail-warp">
                <div className="row-form">
                    <label className='control-label'>名称：</label>
                    <div className="margin-left-20">
                        {this.state.edit
                            ? <Input className="modal-input" defaultValue={school.name} id="schoolName"/>
                            : <div>
                                <label className="info-label"> {school.name}</label>
                                <span className="edit-pen-style" onClick={this.onEditAddress.bind(this)}><Icon type="edit"/></span>
                            </div>
                        }
                    </div>
                </div>
                <div className="row-form">
                    <label className='control-label'>地址：</label>
                    <div >
                        <label className="margin-left-20 info-label"> {school.address}</label>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    {!school.verified ?
                        <div className="margin-left-20">
                            <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.passed}>
                                <Radio value={true}>通过</Radio>
                                <Radio value={false}>否决</Radio>
                            </RadioGroup>
                        </div>
                        : <label className="margin-left-20 info-label">已审核</label>
                    }

                </div>

                {!school.verified ?
                    <div className={'row-form textarea-height ' + (this.state.passed ? 'item-hide' : '')}>
                        <label className='control-label'>备注：</label>

                        <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                    </div>
                    : ''
                }


                <div className="confirm-box">
                    <Button type="primary" onClick={()=> this.onConfirmBtnClick()}>确定</Button>
                    <Button type="default" onClick={this.closePage}>取消</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userState: state.login,
        detail: state.school,
    }
};

export default connect(mapStateToProps)(SchoolDetail)