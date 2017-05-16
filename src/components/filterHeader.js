import React, {Component} from 'react'
import {Row, Input, Select} from 'antd'
import '../App.css'

const Search = Input.Search;
const Option = Select.Option;

class FilterHeader extends Component {
    constructor(props) {
        super(props);
    }

    onGradeChange(value) {
        console.log(`grade selected: ${value}`);
    }

    onSubjectChange(value) {
        console.log(`subject selected: ${value}`);
    }

    onSearchSelect(value) {
        console.log(`search text: ${value}`)
    }

    onCheckStatusChange(value) {
        console.log(`check status change to: ${value}`)
    }

    handleSearch(value) {
        if (value === '') {
            this.setState({dataSource: this.dataSource });
        } else {
            const matched = this.dataSource.filter(item => {
                return item.indexOf(value) !== -1;
            });
            this.setState({dataSource: matched});
        }
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
                            optionFilterProp="children"
                            onChange={this.onGradeChange.bind(this)}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </div>

                <div className="item-warp">
                    <label>{subjectLabel}</label>
                    <Select showSearch style={{marginLeft: 15, width: 100 }}
                            optionFilterProp="children"
                            onChange={this.onSubjectChange.bind(this)}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </div>

                <div className="item-warp">
                    <label>审核状态:</label>
                    <Select showSearch style={{marginLeft: 15, width: 100 }}
                            optionFilterProp="children"
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