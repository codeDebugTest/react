import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {biz_Target_Type} from '../utils/constants'
import {doVerifyResource} from '../actions/verifyResource.action'
import {Button, Icon, Input, message} from 'antd'
import '../App.css'

class SchoolDetail extends Component {
    constructor(props) {
        super(props);
        const {school} = props.detail;
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

        const {userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo.userToken,
            'bizTargetType': biz_Target_Type.SCHOOL,
            'auditPassed': this.state.passed,
            'auditComment': this.state.passed ?  '' : textArea.value
        };

        doVerifyResource(requestInfo, this.closePage.bind(this), (msg)=> {message.error(msg)});
    }

    onConfirmBtnClick() {
        if(this.state.edit) {
            const address = document.getElementById('address');
            const {school} = this.props.detail;
            if (school.address != address) {
                return;
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
                        <label className="info-label"> {school.name}</label>
                    </div>
                </div> coverImageUrl
                <div className="row-form">
                    <label className='control-label'>地址：</label>
                    <div style={{display: this.state.edit ? 'none' : ''}}>
                        <label className="margin-left-20 info-label"> {school.address}</label>
                        <span onClick={this.onEditAddress.bind(this)}><Icon type="edit"/></span>
                    </div>
                    <div style={{display: this.state.edit ? '' : 'none'}}>
                        <Input id="address" defaultValue={school.address} />
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.passed}>
                            <Radio value={true}>通过</Radio>
                            <Radio value={false}>否决</Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div className={'row-form textarea-height ' + (this.state.passed ? 'item-hide' : '')}>
                    <label className='control-label'>备注：</label>

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                </div>

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