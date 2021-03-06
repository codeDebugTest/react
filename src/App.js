import React, {Component} from 'react';
import {Link} from 'react-router'
import {Layout, Menu, Icon, message} from 'antd';
import './App.css';

const {Content, Sider} = Layout;
message.config({
    top: 200,
    duration: 3,
});

class App extends Component {
    render() {
        const items = [
            {iconType: 'fork', code: 'knowledge_tree', text: '知识树'},
            {iconType: 'calendar', code: 'course', text: '课程'},
            {iconType: 'area-chart', code: 'exam', text: '题目'},
            {iconType: 'bar-chart', code: 'teacher', text: '教师'},
            {iconType: 'video-camera', code: 'live', text: '直播'},
            {iconType: 'appstore-o', code: 'school', text: '学校'},
        ];

        return (
            <div className="App">
                <Layout style={{height: '100vh'}}>
                    <Sider style={{overflow: 'auto'}}>
                        <div className="logo" style={{marginBottom: '15px'}}/>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            {items.map((item, index) => {
                                return (
                                    <Menu.Item key={index + 1}>
                                        <Link to={'/management/' + item.code}>
                                            <Icon type={item.iconType}/>
                                            <span className="nav-text nave-label">
                                                {item.text}
                                            </span>
                                        </Link>
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
