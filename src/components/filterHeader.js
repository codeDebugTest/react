import React, {Component} from 'react'
import {Biz_Target_Status} from '../utils/constants'
import {Row, Input, Select} from 'antd'
import '../App.css'

const Search = Input.Search;
const Option  = Select.Option;

class FilterHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            selectedGrade: 'all',
            selectedSubject: "all",
            ...this.knowledgeToMap()
        };

        this.searchCondition = {
            knowledgeTreeId: null,
            searchKey: '',
            verified: null
        }
    }

    knowledgeToMap() {
        const result ={};
        if (this.props.knowledgeTree) {
            this.props.knowledgeTree.forEach(item => {
                result[item.id] = item;
            });
            return {grades:this.props.knowledgeTree, gradMap: result}
        }
        return {grades:[], gradMap: result}
    }

    onConditionChange() {
        if (this.props.searchFunc) {
            this.props.searchFunc(this.searchCondition);
        }
    }


    onGradeChange(value) {
        console.log(`grade selected: ${value}`);
        this.setState({
            subjects: value === 'all' ? [] : (this.state.gradMap[value].children || []),
            selectedSubject: 'all',
            selectedGrade: value === 'all' ? null : value
        });
        this.searchCondition.knowledgeTreeId = value === 'all' ? null : value;
        this.onConditionChange();
    }

    onSubjectChange(value) {
        console.log(`subject selected: ${value}`);
        this.setState({selectedSubject: value});
        this.searchCondition.knowledgeTreeId = value === 'all' ? this.state.selectedGrade : value;
        this.onConditionChange();
    }

    onSearchSelect(value) {
        console.log(`search text: ${value}`)
        this.searchCondition.searchKey = value;
        this.onConditionChange();
    }

    getVerifiedStatus(value) {
        switch (value) {
            case Biz_Target_Status.SUBMITTED.toString():
                return Biz_Target_Status.SUBMITTED;
            case Biz_Target_Status.RELEASED.toString():
                return Biz_Target_Status.RELEASED;
            case Biz_Target_Status.UN_PASSED.toString():
                return Biz_Target_Status.UN_PASSED;
            default:
                return null;
        }
    }
    onVerifiedStatusChange(value) {
        console.log(`check status change to: ${value}`);
        this.searchCondition.verified = this.getVerifiedStatus(value);
        this.onConditionChange();
    }

    getGradeOptions() {
        const options = this.state.grades.map(
            (item, index) => (<Option key={item.id}>{item.display}</Option>)
        );
        options.unshift(<Option key='all'>全部</Option>);
        return options;
    }

    getSubjectOptions() {
        const options = this.state.subjects.map(
            (item, index) => (<Option key={item.id}>{item.display}</Option>)
        );

        options.unshift(<Option key='all'>全部</Option>);
        return options;
    }

    render() {
        const searchLabel = this.props.searchLabel || '课程名称:';
        const gradeLabel ='年级:';
        const subjectLabel ='科目:';

        const gradeOptions = this.getGradeOptions();

        return (
            <Row className="filter-header">
                <div style={{display: this.props.hideSearchBox ? 'none' : '' }} className="margin-right-30">
                    <label>{searchLabel}</label>
                    <Search style={{marginLeft: 15, width: 200}}
                            placeholder="input search text"
                        onSearch={this.onSearchSelect.bind(this)}
                    />
                </div>

                <div className="item-warp margin-right-30">
                    <label>{gradeLabel}</label>
                    <Select className="select-style" showSearch defaultValue="all"
                            onChange={this.onGradeChange.bind(this)}>
                        {gradeOptions}
                    </Select>
                </div>

                <div className="item-warp margin-right-30">
                    <label>{subjectLabel}</label>
                    <Select className="select-style" showSearch defaultValue="all"
                            value={this.state.selectedSubject}
                            onChange={this.onSubjectChange.bind(this)}>
                        {this.getSubjectOptions()}
                    </Select>
                </div>

                <div className="item-warp">
                    <label>审核状态:</label>
                    <Select className="select-style" showSearch defaultValue="-1"
                            onChange={this.onVerifiedStatusChange.bind(this)}>
                        <Option value="-1">全部 </Option>
                        <Option value={Biz_Target_Status.SUBMITTED.toString()}>未审核</Option>
                        <Option value={Biz_Target_Status.RELEASED.toString()}>审核已通过</Option>
                        <Option value={Biz_Target_Status.UN_PASSED.toString()}>审核未通过</Option>
                    </Select>
                </div>
            </Row>
        )
    }
}

export default FilterHeader;