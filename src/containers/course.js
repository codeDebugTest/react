import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchCourseList} from '../actions/course'
import {Table, Popconfirm, message, Icon, Spin} from 'antd'
import '../App.css'

class Course extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '名称',
                dataIndex: 'courseTitle',
            }, {
                title: '年级',
                width: '100',
                render: (text, record, index) => {

                }
            }, {
                title: '科目',
                width: '100',
                render: (text, record) => {

                }
            }, {
                title: '知识树',
                render: (text, record) => {

                }
            }, {
                title: 'Action',
                width: '150',
                render: (text, record) => {
                    const deleteMsg = 'Are you sure delete this record';
                    return (
                        <div>
                            <span className="add-icon" onClick={()=>this.editRecord(record)}><Icon type="edit"/></span>

                            <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                         onConfirm={()=>this.deleteRecord(record)}>
                                <span className="delete-icon"><Icon type="delete" /></span>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];
    }

    editRecord(record) {
        console.log('edit course record: ' + record)
    }
    deleteRecord(record) {
        console.log('delete course record: ' + record);
    }
    componentWillMount() {
        const {dispatch, userState, offset, limit} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo.userToken,
            'knowledgeTreeId': -1,
            'regionId': userState.userInfo.regionId,
            'offset': offset,
            'limit': limit
        };
        doFetchCourseList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
    }

    render() {
        const {dictionary} = this.props.dictionary;
        const {courseList, loading} = this.props.course;

        return (
            <div>
                <FilterHeader knowledgeTree={dictionary.knowledgeTree}> </FilterHeader>
                <div className="table-style">{
                    loading ? (
                        <div className="center-point">
                            <Spin tip="Loading..."/>
                        </div>
                    ) : (
                        <Table columns={this.columns} dataSource={courseList}
                               rowKey={record => record.courseId}/>
                    )
                }</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        course: state.course,
        userState: state.login,
        dictionary: state.dictionary,
        offset: 0,
        limit: 30
    }
}
export default connect(mapStateToProps)(Course)
