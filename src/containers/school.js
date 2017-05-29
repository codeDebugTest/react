import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSchoolColumns} from '../utils/tableColumnsDef'
import InfiniteScrollCtrl from '../components/InfiniteScrollCtrl'
import {doFetchSchoolList, doDeleteSchool} from '../actions/school.action'
import SearchBox from '../components/SearchBox'
import {TABLE_PAGE_SIZE} from '../utils/constants'
import {Table, message, Spin, Row, Select, Button} from 'antd'
import '../App.css'


class School extends Component {
    constructor(props) {
        super(props);
        this.offset= 0;
        this.limit= TABLE_PAGE_SIZE;
        this.searchKey = null;
        this.verified = null;
    }

    editRecord(record) {
        console.log('edit course record: ' + record)
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
        this.offset = 0;
        this.loadData();
    }

    onVerifiedStatusChange(value) {
        console.log(`check status change to: ${value}`)
        this.verified = value === '0' ? false : value === '1' ? true : null;
        this.offset = 0;
        this.loadData();
    }

    loadData() {
        const {dispatch, userState} = this.props;
        const requestInfo = {
            'userToken': userState.userInfo.userToken,
            'regionId': userState.userInfo.regionId,
            'searchKey': this.searchKey,
            'verified': this.verified,
            'offset': this.offset,
            'limit': this.limit
        };
        // doFetchSchoolList(requestInfo,  null, (msg)=> {message.error(msg)})(dispatch);
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
                            <Table dataSource={[]} rowKey={record => record.schoolId}
                                   pagination={false}
                                   columns={getSchoolColumns(this.editRecord.bind(this), this.deleteRecord.bind(this))}
                            />
                        )
                    }
                    <div className="pagination">
                        <Button disabled={this.offset <= 0} onClick={this.prevPage.bind(this)}>上一页</Button>
                        <Button disabled={!schoolList || schoolList.length < this.limit} onClick={this.nextPage.bind(this)}>下一页</Button>
                    </div>
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
