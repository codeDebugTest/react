import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecordTreeNames} from '../utils/TreeToo'
import {mapTagIdsToNames} from '../utils/util'
import {Button, Icon, Input, message} from 'antd'
import {doCreateLivePlayer} from '../actions/livePlayer'
import '../App.css'

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startPlay: false
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

    handleUnPassClick() {
        const textArea = document.getElementById('comment');
        if (textArea.value === '') {
            message.warning('请输入未通过原因');
            return;
        }
        console.log(textArea.value);
    }

    onLivePlayerClick() {
        this.setState({startPlay: true});
    }

    getLivePlayerComponent() {
        if (this.state.startPlay) {

            doCreateLivePlayer({
                liveBox: 'video-box',
                playerType: 'video/mp4',
                pullStreamUrl: this.getFileInfo(this.getCourseItemByType(1)).fileUrl,
            });

            return (
                <div className="row-form live-player">
                    <label className='control-label'> </label>
                    <div className="live-box">
                        <video id="video-box" className="video-js vjs-big-play-centered vjs-fluid"></video>
                    </div>
                </div>
            )
        }
    }

    componentDidMount() {
        const {livePlayer} = this.props.liveObj;
        if (livePlayer) {
            livePlayer.play();
        }
    }

    componentWillUnmount() {
        const {livePlayer} = this.props.liveObj;
        if (livePlayer) {
            livePlayer.release();
        }
    }

    render() {
        const {course} = this.props.detail;
        const {dictionary} = this.props.dictionary;
        const courseFile = this.getFileInfo(this.getCourseItemByType(2));
        const courseVideo = this.getFileInfo(this.getCourseItemByType(1));
        const courseCase = this.getFileInfo(this.getCourseItemByType(3));

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
                        <label className="margin-left-20 info-label">{mapTagIdsToNames(dictionary.courseTagList, course.tags)}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>知识树：</label>
                        <label className="margin-left-20 info-label">{getRecordTreeNames(dictionary.knowledgeTree, course)}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>课件：</label>

                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: courseFile.fileName ? '': 'none'}}/>
                    <a href={courseFile.fileUrl} target="new">{courseFile.fileName}</a>
                </div>
                <div className="row-form">
                    <label className='control-label'>视频：</label>
                    <Button type="primary" className="margin-left-20 player-btn" onClick={this.onLivePlayerClick.bind(this)}
                            style={{display: courseVideo.fileUrl ? '': 'none'}}> ▶ </Button>
                </div>

                {this.getLivePlayerComponent()}

                <div className="row-form">
                    <label className='control-label'>教案：</label>
                    <Icon type="file-text margin-left-20 file-icon" style={{display: courseCase.fileName ? '': 'none'}}/>
                    <a href={courseCase.fileUrl} target="new">{courseCase.fileName}</a>
                </div>
                <div className="row-form" style={{height: '70px'}}>
                    <label className='control-label'>备注：</label>

                    <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                </div>
                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <Button type="primary">通过</Button>
                        <Button type="danger" onClick={this.handleUnPassClick.bind(this)}>否决</Button>
                    </div>
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