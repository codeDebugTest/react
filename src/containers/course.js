import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {Table} from 'antd'


const columns = [{
    title: '名称',
    dataIndex: 'courseTitle',
}, {
    title: '年级',
    render: (text, record, index) => {

    }
}, {
    title: '科目',
    render: (text, record, index) => {
        record
    }
}, {
    title: 'Address',
    dataIndex: 'address',
}, {
    title: 'Action',
    render: (text, record) => {

    }
}];

class Course extends Component {

    render() {
        const data = [];
        return (
            <div>
                <FilterHeader knowledgeTree={this.props.knowledgeTree}> </FilterHeader>
                <div style={{padding: '15px 5px'}}>
                    <Table columns={columns} dataSource={data} rowKey={record => record.courseId}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        courseList: state.courseList,
        userInfo: state.loginReducer && state.loginReducer.userInfo,
        knowledgeTree: state.knowledgeTreeReducer && state.knowledgeTreeReducer.dictionary.knowledgeTree
    }
}
export default connect(mapStateToProps)(Course)
