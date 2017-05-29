import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import KnowledgeTreeLinePrivate from '../components/knowledgeTreeLine'
import {getRecordTreeNames, getKnowledgeTreePath} from '../utils/TreeToo'
import {varNotEmpty} from '../utils/util'
import {mapTagIdsToNames} from '../utils/util'
import {Button, Icon, Input, message, Radio} from 'antd'
import {doCreateLivePlayer, doReleaseLivePlayer} from '../actions/livePlayer.action'
import '../App.css'
const RadioGroup = Radio.Group;

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        const {course} = props.detail;
        this.state = {
            startPlay: false,
            knowledgeTreePath: [],
            checkStatus: course.checkStatus !== undefined ? course.checkStatus : 0
        }
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
        const files = course.courseItems.filter(item => item.itemType === type);
        return files.length && files[0];
    }

    onCheckStatusChange(e) {
        this.setState({checkStatus: e.target.value})
    }

    onLivePlayerClick() {
        this.setState({startPlay: true});
    }

    onConfirmBtnClick() {
        if (this.state.checkStatus) {
            const textArea = document.getElementById('comment');
            if (textArea.value === '') {
                message.warning('请输入未通过原因');
                return;
            }
        }

        browserHistory.goBack();
    }

    componentWillMount() {
        this.liveFile = this.getFileInfo(this.getCourseItemByType(2));
        this.liveVideo = this.getFileInfo(this.getCourseItemByType(1));
        this.courseCase = this.getFileInfo(this.getCourseItemByType(3));

        const {course} = this.props.detail;
        const {dictionary} = this.props.dictionary;
        let knowledgeTreeId = course.knowledgeTreeIds && course.knowledgeTreeIds.split(',')[0];
        if (varNotEmpty(knowledgeTreeId)) {
            this.setState({
                knowledgeTreePath: getKnowledgeTreePath(dictionary.knowledgeTree, knowledgeTreeId),
            });
        }
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
        doReleaseLivePlayer();
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
                        <label className="info-label"> {course.courseTitle}</label>
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
                <div className="row-form">
                    <label className='control-label'>知识树：</label>
                    <label className="margin-left-20 info-label">
                        {/*{getRecordTreeNames(dictionary.knowledgeTree, course)}*/}
                        <KnowledgeTreeLinePrivate selectedIdsPath={this.state.knowledgeTreePath}
                        />
                    </label>
                </div>
                <div className="row-form">
                    <label className='control-label'>课件：</label>

                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: this.liveFile.fileName ? '' : 'none'}}/>
                    <a href={this.liveFile.fileUrl} target="new">{this.liveFile.fileName}</a>
                </div>

                {this.LivePlayerRender()}

                <div className="row-form">
                    <label className='control-label'>教案：</label>
                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: this.courseCase.fileName ? '' : 'none'}}/>
                    <a href={this.courseCase.fileUrl} target="new">{this.courseCase.fileName}</a>
                </div>

                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.checkStatus}>
                            <Radio value={0}>通过</Radio>
                            <Radio value={1}>否决</Radio>
                        </RadioGroup>
                    </div>
                </div>

                <div className={'row-form textarea-height ' + (this.state.checkStatus ? '' : 'item-hide')}>
                    <label className='control-label'>备注：</label>

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因"/>
                </div>

                <div className="confirm-box">
                    <Button type="primary" onClick={() => this.onConfirmBtnClick()}>确定</Button>
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
        detail: state.course,
        liveObj: state.livePlayer,
    }
};

export default connect(mapStateToProps)(CourseDetail)