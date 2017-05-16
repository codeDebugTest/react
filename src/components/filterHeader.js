import React, {Component} from 'react'
import {Row, Col, Radio} from 'antd'

const RadioGroup = Radio.Group;

class FilterHeader extends Component {

    onRadioSelectChange = (e) => {
        console.log('radio checked', e.target.value);
    };

    render() {
        const searchLabel ='课程名称';
        const gradeLabel ='年级';
        const subjectLabel ='科目';
        const radioOptions = [
            { label: '未审核', value: 0},
            { label: '已审核', value: 1},
            { label: '全部', value: 2},
        ];

        const radioValue = 2;
        return (
            <div>
                <Row>
                    <Col span={2}><label>{searchLabel}</label></Col>
                    <Col span={6}>
                        <Select mode="combobox" style={{ width: 200 }}
                            onChange={this.handleChange}
                            filterOption={false}
                            placeholder={'请输入' + searchLabel}
                        >
                            {this.props.options}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}><label>{gradeLabel}</label></Col>
                    <Col span={2}>
                        <Select showSearch style={{ width: 200 }}
                            optionFilterProp="children"
                            onChange={handleChange}
                            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>

                    <Col span={2}><label>{subjectLabel}</label></Col>
                    <Col span={2}>
                        <Select showSearch style={{ width: 200 }}
                                optionFilterProp="children"
                                onChange={handleChange}
                                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}><label> </label></Col>
                    <Col span={2}>
                        <RadioGroup options={radioOptions} onChange={this.onRadioSelectChange} value={radioValue} />
                    </Col>
                </Row>
            </div>
        )
    }
}
