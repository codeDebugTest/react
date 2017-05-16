import React, {Component} from 'react'
import {Row, Input, Select} from 'antd'
import '../App.css'

const Search = Input.Search;
const Option  = Select.Option;

class FilterHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            selectedSubject: "",
            ...this.knowledgeToMap()
        };
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


    onGradeChange(value) {
        console.log(`grade selected: ${value}`);
        this.selectedSubject = '';
        this.setState({
            subjects: this.state.gradMap[value].children || [],
            selectedSubject: ""
        });
    }

    onSubjectChange(value) {
        this.setState({selectedSubject: value});
        console.log(`subject selected: ${value}`);
    }

    onSearchSelect(value) {
        console.log(`search text: ${value}`)
    }

    onCheckStatusChange(value) {
        console.log(`check status change to: ${value}`)
    }

    getGradeOptions() {
        return this.state.grades.map(
            (item, index) => (<Option key={item.id}>{item.display}</Option>)
        )
    }

    getSubjectOptions() {
        return this.state.subjects.map(
            (item, index) => (<Option key={item.id}>{item.display}</Option>)
        )
    }

    render() {
        const searchLabel ='课程名称:';
        const gradeLabel ='年级:';
        const subjectLabel ='科目:';

        return (
            <Row>
                <div>
                    <label>{searchLabel}</label>
                    <Search placeholder="input search text"
                        style={{marginLeft: 15, width: 200 }}
                        onSearch={this.onSearchSelect.bind(this)}
                    />
                </div>

                <div className="item-warp">
                    <label>{gradeLabel}</label>
                    <Select showSearch style={{marginLeft: 15, width: 100}}
                            onChange={this.onGradeChange.bind(this)}>
                        {this.getGradeOptions()}
                    </Select>
                </div>

                <div className="item-warp">
                    <label>{subjectLabel}</label>
                    <Select showSearch style={{marginLeft: 15, width: 100 }}
                            value={this.state.selectedSubject}
                            onChange={this.onSubjectChange.bind(this)}>
                        {this.getSubjectOptions()}
                    </Select>
                </div>

                <div className="item-warp">
                    <label>审核状态:</label>
                    <Select showSearch style={{marginLeft: 15, width: 100 }}
                            defaultValue="2"
                            onChange={this.onCheckStatusChange.bind(this)}>
                        <Option value="2">不限 </Option>
                        <Option value="0">未审核</Option>
                        <Option value="1">已审核</Option>
                    </Select>
                </div>
            </Row>
        )
    }
}

export default FilterHeader;