import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchLiveList} from '../actions/live.action'
import {Table, message, Spin} from 'antd'
import '../App.css'
import {getLiveColumns} from '../utils/tableColumnsDef'

class Live extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
    }

    editRecord(record) {
        console.log('edit live record: ' + record)
    }
    deleteRecord(record) {
        console.log('delete live record: ' + record);
    }

    componentWillMount() {
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

    render() {
        const {dictionary} = this.props.dictionary;
        const {liveList, loading} = this.props.live;

        return (
            <div className="content-wrapper">
                <FilterHeader knowledgeTree={dictionary.knowledgeTree}> </FilterHeader>
                <div className="table-style">{
                    loading ? (
                        <Spin tip="Loading..."/>
                    ) : (
                        <Table dataSource={liveList} rowKey={record => record.userId}
                               columns={getLiveColumns(dictionary.knowledgeTree, this.editRecord.bind(this), this.deleteRecord.bind(this))}/>
                    )
                }</div>
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
