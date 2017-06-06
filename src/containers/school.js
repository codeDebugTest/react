import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {getSchoolColumns} from '../utils/tableColumnsDef'
import {doFetchSchoolList, doDeleteSchool} from '../actions/school.action'
import SearchBox from '../components/SearchBox'
import {doShowDetail} from '../actions/school.action'
import {TABLE_PAGE_SIZE, Biz_Target_Status} from '../utils/constants'
import {Table, message, Spin, Row, Select} from 'antd'
import '../App.css'


class School extends Component {
    constructor(props) {
        super(props);
        this.searchKey = null;
        this.verified = null;
    }

    editRecord(index) {
        console.log('edit course record: ' + index)
        doShowDetail(index);
        const {schoolList} = this.props.school;
        const {dispatch} = this.props;

        doShowDetail(schoolList[index])(dispatch);
        browserHistory.push({
            pathname: `/management/school/${schoolList[index].userId}`
        })
    }
    deleteRecord(index) {
        const { dispatch } = this.props;
        console.log('delete school record: ' + index);
        const successFunc = () => message.success('delete school record success');
        doDeleteSchool(index, successFunc, null)(dispatch);
    }

    searchFunc(value) {
        console.log('searching school: ' + value);
        this.searchKey = value;
        this.loadData();
    }

    onVerifiedStatusChange(value) {
        console.log(`check status change to: ${value}`)
        this.verified = value === '0' ? false : value === '1' ? true : null;
        this.loadData();
    }

    loadData() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo.userToken,
            'provinceId': userState.userInfo.provinceId,
            'searchKey': this.searchKey,
            'verified': this.verified,
        };

        doFetchSchoolList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
    }
    
    componentDidMount() {
        this.loadData();
    }

    render() {
        const {schoolList, loading} = this.props.school;

        return (
            <div className="content-wrapper">
                <Row className="filter-header">
                    <SearchBox searchLabel="学校名：" searchFunc={this.searchFunc.bind(this)}/>

                    <div className="item-warp margin-left-30">
                        <label>审核状态:</label>
                        <Select className="select-style" showSearch defaultValue="2"
                                onChange={this.onVerifiedStatusChange.bind(this)}>
                            <Option value="2">不限 </Option>
                            <Option value="0">未审核</Option>
                            <Option value="1">已审核</Option>
                        </Select>
                    </div>
                </Row>

                <div className="table-style">
                    {
                        loading ? (
                            <div className="center-point">
                                <Spin tip="Loading..."/>
                            </div>
                        ) : (
                            <Table dataSource={schoolList} rowKey={record => record.id}
                                   pagination={false}
                                   columns={getSchoolColumns(this.editRecord.bind(this), this.deleteRecord.bind(this))}
                            />
                        )
                    }
                </div>
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
