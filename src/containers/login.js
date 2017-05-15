import { Form, Icon, Input, Button } from 'antd';
import { message } from 'antd';
import React, {Component } from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {fetchLogin}from '../actions/login'
const FormItem = Form.Item;

message.config({
    top: 150,
    duration: 3,
});
class LoginForm extends Component {

    loginSuccessFuc(){
        browserHistory.push({pathname: '/management'})
    }

    loginFailedFuc(msg){
        message.error(msg);
    }

    handleSubmit = (e) => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            fetchLogin(values)(dispatch)
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state && state.message,
        userHasLogin: state && state.userHasLogin
    }
}

export default connect(mapStateToProps)(LoginForm)
