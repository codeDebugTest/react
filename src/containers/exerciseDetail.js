import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {getRecordTreeNames} from '../utils/TreeToo'
import {EXERCISE_TYPE, FILL_EXERCISE, SUBJECT_EXERCISE} from '../utils/constants'
import {varNotEmpty} from '../utils/util'
import ExerciseContent from '../components/ExerciseConent'
import {Button, Input, message, Radio, Rate} from 'antd'
import '../App.css'
const RadioGroup = Radio.Group;


class ExerciseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passed: true
        }
    }

    onCheckStatusChange(e) {
        this.setState({passed: e.target.value})
    }

    onConfirmBtnClick() {
        if (this.state.passed) {
            const textArea = document.getElementById('comment');
            if (textArea.value === '') {
                message.warning('请输入未通过原因');
                return;
            }
        }
        browserHistory.goBack()
    }

    getStage(level) {
        if (level === '1') {
            return '新课';
        } else if (level === '2') {
            return '阶段性复习';

        } else if (level === '3') {
            return '总复习';
        }
        return '未知阶段';
    }

    render() {
        const {exercise} = this.props.detail;
        const {dictionary} = this.props.dictionary;

        return (
            <div className="detail-warp">
                <div className="exercise-line clearfixed">
                    <label className="exercise-label">类型：</label>

                    <p className="exercise-content"> {EXERCISE_TYPE[exercise.type] && EXERCISE_TYPE[exercise.type].name}</p>
                </div>

                <div className="exercise-line clearfixed">
                    <label className="exercise-label">题干： </label>

                    {varNotEmpty(exercise.content)
                        ? <p className="exercise-content"><ExerciseContent text={exercise.content}/></p>
                        : ''
                    }
                </div>

                {  exercise.type !== FILL_EXERCISE.value && exercise.type !== SUBJECT_EXERCISE.value && varNotEmpty(exercise.choiceItems)
                    ? exercise.choiceItems.map((item, index) => (
                        <div className="exercise-line clearfixed" key={index}>
                            <label className="exercise-label"> {'选项 ' + item.title + '： '}</label>
                            {varNotEmpty(item.content)
                                ? <p className="exercise-content"><ExerciseContent text={item.content}/></p>
                                : ''
                            }
                        </div>
                        ))
                    : ''
                }

                { varNotEmpty(exercise.answers)
                    ? exercise.answers.map((answer, index) => (
                        <div className="exercise-line clearfixed" key={index}>
                            <label className="exercise-label"> {'答案' + (index + 1) + '：'}</label>
                            {varNotEmpty(answer.rightAnswer)
                                ? <p className="exercise-content"> {answer.title}&nbsp;&nbsp;&nbsp;&nbsp; <ExerciseContent text={answer.rightAnswer}/></p>
                                : ''
                            }
                        </div>
                        ))
                    : ''
                }

                <div className="exercise-line clearfixed">
                    <label className="exercise-label">解释： </label>
                        {varNotEmpty(exercise.explanation)
                            ? <p className="exercise-content"><ExerciseContent text={exercise.explanation}/></p>
                            : ''
                        }
                </div>

                <div className="row-form">
                    <label className='control-label'>知识树：</label>
                    <label className="margin-left-20 info-label">{getRecordTreeNames(dictionary.knowledgeTree, exercise)}</label>
                </div>

                { varNotEmpty(exercise.difficultyDegree)
                    ? exercise.difficultyDegree.map((item, index) => (
                        <div className="row-form" key={index}>
                            <label className='control-label'>{this.getStage(item.stageLevel) + '：'}</label>
                            <div className="margin-left-20">
                                <label className="info-label" style={{marginRight: "10px"}}>容易</label>
                                <Rate count={9} value={Number(item.difficultyDegree)}/>
                                <label className="info-label">难</label>
                            </div>
                        </div>
                      ))
                    : ''
                }

                <div className="row-form">
                    <label className='control-label'>完成时间：</label>
                    <label className="margin-left-20 info-label">{exercise.takeTime}</label>
                </div>

                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.passed}>
                            <Radio value={true}>通过</Radio>
                            <Radio value={false}>否决</Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div className={'row-form textarea-height ' + (this.state.passed ? 'item-hide' : '')}>
                    <label className='control-label'>备注：</label>

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                </div>

                <div className="confirm-box">
                    <Button type="primary" onClick={()=> this.onConfirmBtnClick()}>确定</Button>
                    <Button type="default" onClick={browserHistory.goBack}>取消</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary,
        userState: state.login,
        detail: state.exam,
    }
};
export default connect(mapStateToProps)(ExerciseDetail)
