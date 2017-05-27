import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import FilterHeader from '../components/filterHeader'
import {doFetchCourseList, doDeleteCourse, doShowDetail} from '../actions/course.action'
import {getCourseColumns} from '../utils/tableColumnsDef'
import {Table, message, Spin, Button} from 'antd'
import '../App.css'

class Course extends Component {
    constructor(props) {
        super(props);
        this.offset = 0;
        this.limit = 30;
    }

    editRecord(index) {
        console.log('edit course record: ' + index);
        const {courseList} = this.props.course;
        const {dispatch} = this.props;

        doShowDetail(courseList[index])(dispatch);
        browserHistory.push({
            pathname: `/management/course/${courseList[index].courseId}`
        })
    }

    deleteRecord(index) {
        const {dispatch} = this.props;
        console.log('delete course record: ' + index);
        const successFunc = () => message.success('delete course record success');
        doDeleteCourse(index, successFunc, null)(dispatch);
    }

    loadData() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo && userState.userInfo.userToken,
            'knowledgeTreeId': '3-2',
            'regionId': userState.userInfo && userState.userInfo.regionId,
            'offset': this.offset,
            'limit': this.limit
        };
        doFetchCourseList(requestInfo, null, (msg) => message.error(msg))(dispatch);
    }

    prevPage() {
        this.offset -= this.limit;
        this.loadData();
    }
    nextPage() {
        this.offset += this.limit;
        this.loadData();
    }

    componentDidMount() {
        this.offset = 0;
        this.loadData();
    }

    render() {
        const {dictionary} = this.props.dictionary;
        const {courseList, loading} = this.props.course;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree}> </FilterHeader>
                <div className="table-style">
                    {
                        loading ? (
                            <Spin tip="Loading..."/>
                        ) : (
                            <Table dataSource={courseList} rowKey={record => record.courseId}
                                   pagination={false}
                                   columns={
                                       getCourseColumns(dictionary.knowledgeTree,
                                           this.editRecord.bind(this),
                                           this.deleteRecord.bind(this))
                                   }
                            />
                        )
                    }
                    <div className="pagination">
                        <Button disabled={this.offset <= 0} onClick={this.prevPage.bind(this)}>上一页</Button>
                        <Button disabled={!courseList || courseList.length < this.limit} onClick={this.nextPage.bind(this)}>下一页</Button>
                    </div>
                </div>
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
