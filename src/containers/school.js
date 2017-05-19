import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchBox from '../components/SearchBox'
import {doFetchSchoolList} from '../actions/school.action'
import {Table, Popconfirm, message, Icon, Spin, Row} from 'antd'
import '../App.css'

class School extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
        this.columns = [
            {
                title: '名称',
                dataIndex: 'courseTitle',
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
        console.log('edit course record: ' + record)
    }
    deleteRecord(record) {
        console.log('delete course record: ' + record);
    }

    searchFunc(value) {
        console.log('searching school: ' + value);
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
        // doFetchSchoolList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
    }

    render() {
        const {schoolList, loading} = this.props.school;

        return (
            <div>
                <Row className="filter-header">
                    <SearchBox searchLabel="学校名：" searchFunc={this.searchFunc.bind(this)}/>
                </Row>

                <div className="table-style">{
                    loading ? (
                        <div className="center-point">
                            <Spin tip="Loading..."/>
                        </div>
                    ) : (
                        <Table columns={this.columns} dataSource={schoolList}
                               rowKey={record => record.courseId}/>
                    )
                }</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        school: state.school,
        userState: state.login,
    }
}
export default connect(mapStateToProps)(School)
