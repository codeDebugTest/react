import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import FilterHeader from '../components/filterHeader'
import {doFetchLiveList, doDeleteLive, doShowDetail} from '../actions/live.action'
import {Table, message, Spin, Button} from 'antd'
import '../App.css'
import {getLiveColumns} from '../utils/tableColumnsDef'

class Live extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
    }

    editRecord(index) {
        console.log('edit course record: ' + index);
        const {liveList} = this.props.live;
        const {dispatch} = this.props;

        doShowDetail(liveList[index])(dispatch);
        browserHistory.push({
            pathname: `/management/live/${liveList[index].courseId}`
        })
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete live record: ' + index);
        const successFunc = () => message.success('delete live record success');
        doDeleteLive(index, successFunc, null)(dispatch);
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

        doFetchLiveList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
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
        const {liveList, loading} = this.props.live;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree} searchLabel="教师："> </FilterHeader>
                <div className="table-style">
                    {
                        loading ? (
                            <Spin tip="Loading..."/>
                        ) : (
                            <Table dataSource={liveList} rowKey={record => record.liveId}
                                   pagination={false}
                                   columns={
                                       getLiveColumns(dictionary.knowledgeTree,
                                           this.editRecord.bind(this),
                                           this.deleteRecord.bind(this))
                                   }
                            />
                        )
                    }
                    <div className="pagination">
                        <Button disabled={this.offset <= 0} onClick={this.prevPage.bind(this)}>上一页</Button>
                        <Button disabled={!liveList || liveList.length < this.limit} onClick={this.nextPage.bind(this)}>下一页</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        live: state.live,
        userState: state.login,
        dictionary: state.dictionary,
    }
}
export default connect(mapStateToProps)(Live)
