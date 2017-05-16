import React, {Component} from 'react';
import {Link} from 'react-router'
import {Layout, Menu, Icon} from 'antd';
import './App.css';

const {Content, Sider} = Layout;

class App extends Component {
    render() {
        const items = [
            {iconType: 'user', code: 'knowledge_tree', text: '知识树'},
            {iconType: 'video-camera', code: 'course', text: '课程'},
            {iconType: 'upload', code: 'exam', text: '题目'},
            {iconType: 'bar-chart', code: 'teacher', text: '教师'},
            {iconType: 'cloud-o', code: 'live', text: '直播'},
            {iconType: 'appstore-o', code: 'school', text: '学校'},
        ];

        return (
            <div className="App">
                <Layout style={{height: '100vh'}}>
                    <Sider style={{overflow: 'auto'}}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            {items.map((item, index) => {
                                return (
                                    <Menu.Item key={index + 1}>
                                        <Icon type={item.iconType}/>
                                        <span className="nav-text">
                                            <Link to={'/management/' + item.code} className="nave-label">{item.text}</Link>
                                        </span>
                                    </Menu.Item>
                                )
                            })}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className="main-container">
                            <div className="main-wrapper">
                                {this.props.children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
