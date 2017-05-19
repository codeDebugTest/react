import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'
import {doFetchLiveList} from '../actions/live.action'
import {Table, Popconfirm, message, Icon, Spin} from 'antd'
import '../App.css'

class Live extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
            }, {
                title: '年级',
                width: 100,
                render: (text, record, index) => {

                }
            }, {
                title: '科目',
                width: 100,
                render: (text, record) => {

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
        console.log('edit live record: ' + record)
    }
    deleteRecord(record) {
        console.log('delete live record: ' + record);
    }

    componentWillMount() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo.userToken,
            'knowledgeTreeId': -1,
            'regionId': userState.userInfo.regionId,
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
                        <Table columns={this.columns} dataSource={liveList}
                               rowKey={record => record.userId}/>
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
