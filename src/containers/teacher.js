import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchTeacherList, doDeleteTeacher} from '../actions/teacher.action'
import {Table, message, Spin} from 'antd'
import '../App.css'
import {getTeacherColumns} from  '../utils/tableColumnsDef'

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
    }

    editRecord(record) {
        console.log('edit teacher record: ' + record)
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete teacher record: ' + index);
        const successFunc = () => message.success('delete teacher record success');
        doDeleteTeacher(index, successFunc, null)(dispatch);
    }

    componentDidMount() {
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

    render() {
        const {dictionary} = this.props.dictionary;
        const {teacherList, loading} = this.props.teacher;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree} hideSearchBox="true"> </FilterHeader>
                <div className="table-style">{
                    loading ? (
                        <Spin tip="Loading..."/>
                    ) : (
                        <Table dataSource={teacherList} rowKey={record => record.userId}
                               columns={getTeacherColumns(dictionary.knowledgeTree, this.editRecord.bind(this), this.deleteRecord.bind(this))}/>
                    )
                }</div>
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
