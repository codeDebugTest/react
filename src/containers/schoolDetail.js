import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Input, message} from 'antd'
import '../App.css'

class SchoolDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    handleUnPassClick() {
        const textArea = document.getElementById('comment');
        if (textArea.value === '') {
            message.warning('请输入未通过原因');
            return;
        }
        console.log(textArea.value);
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
                        <span><Icon type="edit"/></span>
                    </div>
                    <div style={{display: this.state.edit ? '' : 'none'}}>
                        <Input defaultValue={school.address} />
                    </div>
                </div>

                <div className="row-form" style={{height: '70px'}}>
                    <label className='control-label'>备注：</label>

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                </div>
                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <Button type="primary">通过</Button>
                        <Button type="danger" onClick={this.handleUnPassClick.bind(this)}>否决</Button>
                    </div>
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