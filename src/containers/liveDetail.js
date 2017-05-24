import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecordTreeNames} from '../utils/TreeToo'
import {mapTagIdsToNames} from '../utils/util'
import {Button, Icon, Input, message} from 'antd'
import {doCreateLivePlayer} from '../actions/livePlayer'
import '../App.css'

class LiveDetail extends Component {
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

    getLiveItemByType(type) {
        const {live} = this.props.detail;
        // const files = live.courseItems.filter(item => item.itemType === type);
        const files = [];
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

    componentWillMount() {
        this.liveFile = this.getFileInfo(this.getLiveItemByType(2));
        this.liveVideo = this.getFileInfo(this.getLiveItemByType(1));
    }

    componentDidUpdate() {
        const {dispatch} = this.props;
        doCreateLivePlayer({
            liveBox: 'video-box',
            playerType: 'video/mp4',
            pullStreamUrl: this.liveVideo.fileUrl,
        })(dispatch);
    }

    componentWillUnmount() {
        const {livePlayer} = this.props.liveObj;
        if (livePlayer) {
            livePlayer.release();
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
                    <Button type="primary" className="margin-left-20 player-btn" onClick={this.onLivePlayerClick.bind(this)}
                            style={{display: this.liveVideo.fileUrl ? '': 'none'}}> ▶ </Button>
                </div>
            )
        }
    }

    render() {
        const {live} = this.props.detail;
        const {dictionary} = this.props.dictionary;

        return (
            <div className="detail-warp">
                <div className="row-form img-height">
                    <label className='control-label'>封面：</label>
                    <div className="margin-left-20">
                        <img src={live.coverImageUrl}/>
                    </div>
                </div>
                <div className="row-form">
                    <label className='control-label'>名称：</label>
                    <div className="margin-left-20">
                        <label className="info-label"> {live.title}</label>
                    </div>
                </div>
                <div className="row-form">
                    <label className='control-label'>简介：</label>
                    <label className="margin-left-20 info-label"> {live.introduction}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>发布教师：</label>
                    <label className="margin-left-20 info-label"> {live.teacherName}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>日期：</label>
                    <label className="margin-left-20 info-label">{live.liveDate}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>开始时间：</label>
                    <label className="margin-left-20 info-label">{live.startTime.split(' ')[1]}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>结束时间：</label>
                    <label className="margin-left-20 info-label">{live.endTime.split(' ')[1]}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>知识树：</label>
                    <label className="margin-left-20 info-label">{getRecordTreeNames(dictionary.knowledgeTree, live)}</label>
                </div>
                <div className="row-form">
                    <label className='control-label'>课件：</label>

                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: this.liveFile.fileName ? '': 'none'}}/>
                    <a href={this.liveFile.fileUrl} target="new">{this.liveFile.fileName}</a>
                </div>

                {this.LivePlayerRender()}

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
        detail: state.live,
        liveObj: state.livePlayer,
    }
};

export default connect(mapStateToProps)(LiveDetail)