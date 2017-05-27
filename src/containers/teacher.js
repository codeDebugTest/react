import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import FilterHeader from '../components/filterHeader'
import {doFetchTeacherList, doDeleteTeacher, doShowDetail} from '../actions/teacher.action'
import {Table, message, Spin, Button} from 'antd'
import '../App.css'
import {getTeacherColumns} from  '../utils/tableColumnsDef'

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
    }

    editRecord(index) {
        console.log('edit course record: ' + index);
        const {teacherList} = this.props.teacher;
        const {dispatch} = this.props;

        doShowDetail(teacherList[index])(dispatch);
        browserHistory.push({
            pathname: `/management/teacher/${teacherList[index].userId}`
        })
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete teacher record: ' + index);
        const successFunc = () => message.success('delete teacher record success');
        doDeleteTeacher(index, successFunc, null)(dispatch);
    }

    loadData() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo && userState.userInfo.userToken,
            'knowledgeTreeId': -1,
            'regionId': userState.userInfo && userState.userInfo.regionId,
            'offset': this.offset,
            'limit': this.limit
        };

        doFetchTeacherList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
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
        const {teacherList, loading} = this.props.teacher;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree} hideSearchBox="true"> </FilterHeader>
                <div className="table-style">
                    {
                        loading ? (
                            <Spin tip="Loading..."/>
                        ) : (
                            <Table dataSource={teacherList} rowKey={record => record.userId}
                                   pagination={false}
                                   columns={getTeacherColumns(dictionary,
                                       this.editRecord.bind(this),
                                       this.deleteRecord.bind(this))
                                   }
                            />
                        )
                    }
                    <div className="pagination">
                        <Button disabled={this.offset <= 0} onClick={this.prevPage.bind(this)}>上一页</Button>
                        <Button disabled={!teacherList || teacherList.length < this.limit} onClick={this.nextPage.bind(this)}>下一页</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        teacher: state.teacher,
        userState: state.login,
        dictionary: state.dictionary,
    }
}
export default connect(mapStateToProps)(Teacher)
