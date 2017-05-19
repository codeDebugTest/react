import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchBox from '../components/SearchBox'
import {Table, message, Spin, Row, Select} from 'antd'
import '../App.css'
import {getSchoolColumns} from '../utils/tableColumnsDef'

class School extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= 30;
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

    onCheckStatusChange(value) {
        console.log(`check status change to: ${value}`)
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

                    <div className="item-warp">
                        <label>审核状态:</label>
                        <Select className="select-style" showSearch defaultValue="2"
                                onChange={this.onCheckStatusChange.bind(this)}>
                            <Option value="2">不限 </Option>
                            <Option value="0">未审核</Option>
                            <Option value="1">已审核</Option>
                        </Select>
                    </div>
                </Row>

                <div className="table-style">{
                    loading ? (
                        <div className="center-point">
                            <Spin tip="Loading..."/>
                        </div>
                    ) : (
                        <Table dataSource={[]} rowKey={record => record.schoolId}
                               columns={getSchoolColumns(this.editRecord.bind(this), this.deleteRecord.bind(this))}/>
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
