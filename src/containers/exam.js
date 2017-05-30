import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import FilterHeader from '../components/filterHeader'
import {doFetchExamList, doDeleteExam, doShowDetail} from '../actions/exam.action'
import {getExamColumns} from '../utils/tableColumnsDef'
import {TABLE_PAGE_SIZE} from '../utils/constants'
import {Table, message, Spin, Button} from 'antd'
import '../App.css'

class Exam extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= TABLE_PAGE_SIZE;
        this.knowledgeTreeId = null;
        this.verified = null;
    }

    editRecord(index) {
        console.log('edit exam record: ' + index);
        const {examList} = this.props.exam;
        const {dispatch} = this.props;

        doShowDetail(examList[index])(dispatch);
        browserHistory.push({
            pathname: `/management/exercise/${examList[index].exerciseItemId}`
        })
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete course record: ' + index);
        const successFunc = () => message.success('delete course record success');
        doDeleteExam(index, successFunc, null)(dispatch);
    }

    filterChangeCallback(filterObj) {
        const {knowledgeTreeId, verified} = filterObj;
        this.knowledgeTreeId = knowledgeTreeId;
        this.verified = verified;
        this.offset = 0;

        this.loadData();
    }

    loadData() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo && userState.userInfo.userToken,
            'knowledgeTreeId': this.knowledgeTreeId,
            'bizTargetStatus': this.verified,
            'onlyMyself': false,
            'regionId': userState.userInfo && userState.userInfo.regionId,
            'offset': this.offset,
            'limit': this.limit
        };
        doFetchExamList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
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
        const {examList, loading} = this.props.exam;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree} hideSearchBox="true"
                              searchFunc={this.filterChangeCallback.bind(this)}> </FilterHeader>
                <div className="table-style">
                    {
                        loading ? (
                            <Spin tip="Loading..."/>
                        ) : (
                            <Table dataSource={examList} rowKey={record => record.exerciseItemId}
                                   pagination={false}
                                   columns={
                                       getExamColumns(dictionary.knowledgeTree,
                                           this.editRecord.bind(this),
                                           this.deleteRecord.bind(this))
                                   }
                            />
                        )
                    }
                    <div className="pagination">
                        <Button disabled={this.offset <= 0} onClick={this.prevPage.bind(this)}>上一页</Button>
                        <Button disabled={!examList || examList.length < this.limit} onClick={this.nextPage.bind(this)}>下一页</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        exam: state.exam,
        userState: state.login,
        dictionary: state.dictionary,
    }
}
export default connect(mapStateToProps)(Exam)
