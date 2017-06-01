import { Form, Icon, Input, Button } from 'antd';
import { message } from 'antd';
import React, {Component } from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {userList} from '../config'
import {fetchLogin}from '../actions/login.action'
import '../index.css'
const FormItem = Form.Item;


message.config({
    top: 200,
    duration: 3,
});

class LoginForm extends Component {

    loginSuccessFunc() {
        browserHistory.push({pathname: '/management'});
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

            if (userList.hasOwnProperty(values.userName)) {
                fetchLogin(values, this.loginSuccessFunc, this.loginFailedFuc)(dispatch);
            } else {
                message.error('登录失败，请检查用户名密码!')
            }

        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div className="login-page">
            <div className="login-wrap">
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <FormItem>
                        <img src={process.env.PUBLIC_URL + '/imgs/logo.png'} className="login-img"/>
                    </FormItem>
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
            </div>
        </div>
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
