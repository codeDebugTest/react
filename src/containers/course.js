import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchCourseList, doDeleteCourse} from '../actions/course.action'
import {Table, message, Spin} from 'antd'
import '../App.css'
import {getCourseColumns} from '../utils/tableColumnsDef'

class Course extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
    }

    editRecord(record) {
        console.log('edit course record: ' + record)
    }

    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete course record: ' + index);
        const successFunc = () => message.success('delete course record success');
        doDeleteCourse(index, successFunc, null)(dispatch);
    }

    componentDidMount() {
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
                        <Table dataSource={courseList} rowKey={record => record.courseId}
                            columns={getCourseColumns(dictionary.knowledgeTree, this.editRecord.bind(this), this.deleteRecord.bind(this))}/>
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
