import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import FilterHeader from '../components/filterHeader'
import {doFetchLiveList, doDeleteLive, doShowDetail} from '../actions/live.action'
import {getLiveColumns} from '../utils/tableColumnsDef'
import {TABLE_PAGE_SIZE, Biz_Target_Type} from '../utils/constants'
import {Table, message, Spin, Button} from 'antd'
import '../App.css'


class Live extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= TABLE_PAGE_SIZE;
        this.knowledgeTreeId = null;
        this.searchKey = null;
        this.verified = null;
    }

    editRecord(index) {
        console.log('edit course record: ' + index);
        const {liveList} = this.props.live;
        const {dispatch} = this.props;

        doShowDetail(liveList[index])(dispatch);
        browserHistory.push({
            pathname: `/management/live/${liveList[index].liveId}`
        })
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete live record: ' + index);
        const successFunc = () => message.success('delete live record success');
        doDeleteLive(index, successFunc, null)(dispatch);
    }

    filterChangeCallback(filterObj) {
        const {knowledgeTreeId, searchKey, verified} = filterObj;
        this.knowledgeTreeId = knowledgeTreeId;
        this.searchKey = searchKey;
        this.verified = verified;
        this.offset = 0;

        this.loadData();
    }

    loadData() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo && userState.userInfo.userToken,
            'regionId': userState.userInfo && userState.userInfo.regionId,
            'bizTargetType': Biz_Target_Type.LIVE,
            'knowledgeTreeId': this.knowledgeTreeId,
            'searchKey': this.searchKey,
            'bizTargetStatus': this.verified,
            'offset': this.offset,
            'limit': this.limit,
            'fromAdmin': !this.verified || null
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
                <FilterHeader knowledgeTree={dictionary.knowledgeTree} searchLabel="教师："
                              searchFunc={this.filterChangeCallback.bind(this)}> </FilterHeader>
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
