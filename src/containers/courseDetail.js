import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import KnowledgeTreeItem from '../components/knowledgeTreeItem'
import {ID_ALL} from '../utils/TreeToo'
import {varEmpty} from '../utils/util'
import {mapTagIdsToNames} from '../utils/util'
import {Button, Icon, Input, message, Radio, Tooltip} from 'antd'
import {doCreateLivePlayer, doReleaseLivePlayer} from '../actions/livePlayer.action'
import {doAuditResource} from '../actions/auditResource.action'
import {Biz_Target_Type, CourseItemType} from '../utils/constants'
import '../App.css'
const RadioGroup = Radio.Group;

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        const {course} = this.props.detail;
        this.state = {
            startPlay: false,
            knowledgeTreePaths: [],
            knowledgeTreeIds: varEmpty(course.knowledgeTreeIds) ? ID_ALL : '' + course.knowledgeTreeIds,
            passed: true,
        };
    }

    getFileInfo(fileItem) {
        if (!fileItem) {
            return {};
        }
        const pathNames = fileItem.fileAddress.split('/');
        return {
            fileName: pathNames[pathNames.length - 1],
            fileUrl: fileItem.fileAddress,
            fileType: fileItem.fileType
        }
    }

    getCourseItemByType(type) {
        const {course} = this.props.detail;
        const files = course.courseItems.filter(item => item.itemTypeCode === type);
        return files.length && files[0];
    }

    onCheckStatusChange(e) {
        this.setState({passed: e.target.value})
    }

    onLivePlayerClick() {
        this.setState({startPlay: true});
    }

    closePage() {
        browserHistory.goBack();
    }

    auditFailed() {
        message.error('审批失败！');
    }
    onConfirmBtnClick() {
        console.log(this.knowledgeTreeIdList);
        const textArea = document.getElementById('comment');
        if (!this.state.passed) {
            if (textArea.value === '') {
                message.warning('请输入未通过原因');
                return;
            }
        }

        const {detail, userState} = this.props;
        const requestInfo = {
            auditComment: textArea.value,
            auditPassed: this.state.passed,
            bizTargetType: Biz_Target_Type.COURSE,
            targetId: detail.course.id,
            userToken: userState.userInfo.userToken
        };

        doAuditResource(requestInfo, this.closePage, this.auditFailed);
    }

    addKnowledgeTree() {
        this.knowledgeTreeIdList = this.knowledgeTreeIdList.concat([ID_ALL]);

        this.setState({knowledgeTreeIds: this.knowledgeTreeIdList.join(',')});
    }

    removeKnowledgeTree() {
        this.knowledgeTreeIdList.pop();
        this.knowledgeTreeIdList = this.knowledgeTreeIdList.concat([]);

        this.setState({knowledgeTreeIds: this.knowledgeTreeIdList.join(',')});
    }

    componentWillMount() {
        this.courseCase = this.getFileInfo(this.getCourseItemByType(CourseItemType.COURSE_CASE));
        this.liveVideo = this.getFileInfo(this.getCourseItemByType(CourseItemType.VIDEO));
        this.learningCase = this.getFileInfo(this.getCourseItemByType(CourseItemType.LEARNING_CASE));

        this.knowledgeTreeIdList = this.state.knowledgeTreeIds.split(',');
    }

    componentDidUpdate() {
        if (this.state.startPlay) {
            const {dispatch} = this.props;
            doCreateLivePlayer({
                liveBox: 'video-box',
                playerType: 'video/mp4',
                pullStreamUrl: this.liveVideo.fileUrl,
            })(dispatch);
        }
    }

    componentWillUnmount() {
        if (this.props.liveObj.livePlayer) {
            this.props.liveObj.livePlayer.release();
        }
    }

    LivePlayerRender() {
        if (this.state.startPlay) {
            return (
                <div className="row-form live-player">
                    <label className='control-label'>视频：</label>
                    <div className="live-box margin-left-20">
                        <video id="video-box" className="video-js vjs-big-play-centered vjs-fluid"></video>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row-form">
                    <label className='control-label'>视频：</label>
                    <Button type="primary" className="margin-left-20 player-btn"
                            onClick={this.onLivePlayerClick.bind(this)}
                            style={{display: this.liveVideo.fileUrl ? '' : 'none'}}> ▶ </Button>
                </div>
            )
        }
    }

    render() {
        const {course} = this.props.detail;
        const {dictionary} = this.props.dictionary;

        return (
            <div className="detail-warp">
                <div className="row-form">
                    <label className='control-label'>课程名称：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {course.title}</label>
                    </div>
                </div>
                <div className="row-form">
                    <label className='control-label'>课程描述：</label>
                    <label className="margin-left-20 info-label"> {course.description}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>标签：</label>
                    <label className="margin-left-20 info-label">
                        {mapTagIdsToNames(dictionary.courseTagList, course.tags)}
                    </label>
                </div>

                <KnowledgeTreeItem knowledgeTreeIds={this.knowledgeTreeIdList}/>

                <div className="row-form">
                    <label className='control-label'>知识树：</label>
                    <div className="margin-left-20 info-label">
                        <Tooltip title="添加知识树" placement="top" >
                            <span className="add-tree" onClick={() => this.addKnowledgeTree()}>
                                <Icon type="plus-circle-o" />
                            </span>
                        </Tooltip>
                        <Tooltip title="删除知识树" placement="top" >
                            <span className="remove-tree" onClick={() => this.removeKnowledgeTree()}>
                                <Icon type="minus-circle-o" />
                            </span>
                        </Tooltip>
                    </div>
                </div>

                <div className="row-form">
                    <label className='control-label'>课件：</label>

                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: this.courseCase.fileName ? '' : 'none'}}/>
                    <a href={this.courseCase.fileUrl} target="new">{this.courseCase.fileName}</a>
                </div>

                {this.LivePlayerRender()}

                <div className="row-form">
                    <label className='control-label'>学案：</label>
                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: this.learningCase.fileName ? '' : 'none'}}/>
                    <a href={this.learningCase.fileUrl} target="new">{this.learningCase.fileName}</a>
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

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因"/>
                </div>

                <div className="confirm-box">
                    <Button type="primary" onClick={() => this.onConfirmBtnClick()}>确定</Button>
                    <Button type="default" onClick={this.closePage}>取消</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary,
        userState: state.login,
        detail: state.course,
        liveObj: state.livePlayer,
    }
};

export default connect(mapStateToProps)(CourseDetail)