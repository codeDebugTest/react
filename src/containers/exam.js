import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchExamList, doDeleteExam} from '../actions/exam.action'
import {Table, message, Spin, Button} from 'antd'
import '../App.css'
import {getExamColumns} from '../utils/tableColumnsDef'

class Exam extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
    }

    editRecord(index) {
        console.log('edit exam record: ' + index)
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete course record: ' + index);
        const successFunc = () => message.success('delete course record success');
        doDeleteExam(index, successFunc, null)(dispatch);
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
                <FilterHeader knowledgeTree={dictionary.knowledgeTree} hideSearchBox="true"> </FilterHeader>
                <div className="table-style">
                    {
                        loading ? (
                            <Spin tip="Loading..."/>
                        ) : (
                            <Table dataSource={examList} rowKey={record => record.examId}
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
