import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchCourseList} from '../actions/course.action'
import {Table, Popconfirm, message, Icon, Spin} from 'antd'
import '../App.css'
import {getRecordTreeGrad, getRecordTreeNames, getRecordTreeSubject} from '../utils/TreeToo'

class Course extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
        this.columns = [
            {
                title: '名称',
                dataIndex: 'courseTitle',
            }, {
                title: '年级',
                width: 100,
                render: (text, record, index) => {
                    const {dictionary} = this.props.dictionary;
                    return getRecordTreeGrad(dictionary.knowledgeTree, record);
                }
            }, {
                title: '科目',
                width: 100,
                render: (text, record) => {
                    const {dictionary} = this.props.dictionary;
                    return getRecordTreeSubject(dictionary.knowledgeTree, record);
                }
            }, {
                title: '知识树',
                render: (text, record) => {
                    const {dictionary} = this.props.dictionary;
                    return getRecordTreeNames(dictionary.knowledgeTree, record);
                }
            }, {
                title: '审核状态',
                render: (text, record) => {
                    if(record.checkStatus) {
                        return '已审核';
                    } else {
                        return '未审核';
                    }
                }
            }, {
                title: 'Action',
                width: 150,
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
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo && userState.userInfo.userToken,
            'knowledgeTreeId': -1,
            'regionId':  userState.userInfo && userState.userInfo.regionId,
            'offset': this.offset,
            'limit': this.limit
        };
        doFetchCourseList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
    }

    render() {
        const {dictionary} = this.props.dictionary;
        const {courseList, loading} = this.props.course;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree}> </FilterHeader>
                <div className="table-style">{
                    loading ? (
                        <Spin tip="Loading..."/>
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
    }
}
export default connect(mapStateToProps)(Course)
