import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import KnowledgeTreeItem from '../components/knowledgeTreeItem'
import {ID_ALL} from '../utils/TreeToo'
import {varEmpty, isVerified} from '../utils/util'
import {doCreateLivePlayer, doReleaseLivePlayer} from '../actions/livePlayer.action'
import {doAuditResource} from '../actions/auditResource.action'
import {Biz_Target_Type, Biz_Target_Status} from '../utils/constants'
import {Button, Icon, Input, message, Radio, Tooltip} from 'antd'
import '../App.css'
const RadioGroup = Radio.Group;

class LiveDetail extends Component {
    constructor(props) {
        super(props);
        const {live} = this.props.detail;
        this.state = {
            startPlay: false,
            passed: false,
            knowledgeTreeIds: varEmpty(live.knowledgeTreeIds) ? ID_ALL : '' + live.knowledgeTreeIds,
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

    getLiveItemByType(type) {
        const {live} = this.props.detail;
        // const files = live.courseItems.filter(item => item.itemType === type);
        const files = [];
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
        if (this.isVerified) {
            this.closePage();
            return;
        }

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
            bizTargetType: Biz_Target_Type.LIVE,
            targetId: detail.live.liveId,
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
        const {live} = this.props.detail;

        this.courseCase = this.getFileInfo(this.getLiveItemByType(2));
        this.liveVideo = this.getFileInfo(this.getLiveItemByType(1));

        if (this.state.knowledgeTreeIds === '-1') {
            this.knowledgeTreeIdList = live.knowledgeTreeId ? live.knowledgeTreeId : ['-1'];
        } else {
            this.knowledgeTreeIdList = this.state.knowledgeTreeIds.split(',');
        }

        this.isVerified = isVerified(live.auditStatus);
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
                    <Button type="primary" className="margin-left-20 player-btn" onClick={this.onLivePlayerClick.bind(this)}
                            style={{display: this.liveVideo.fileUrl ? '': 'none'}}> ▶ </Button>
                </div>
            )
        }
    }

    render() {
        const {live} = this.props.detail;

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

                <KnowledgeTreeItem knowledgeTreeIds={this.knowledgeTreeIdList}/>

                {!this.isVerified ?
                    <div className="row-form">
                        <label className='control-label'>知识树：</label>
                        <div className="margin-left-20 info-label">
                            <Tooltip title="添加知识树" placement="top">
                            <span className="add-tree" onClick={() => this.addKnowledgeTree()}>
                                <Icon type="plus-circle-o"/>
                            </span>
                            </Tooltip>
                            <Tooltip title="删除知识树" placement="top">
                            <span className="remove-tree" onClick={() => this.removeKnowledgeTree()}>
                                <Icon type="minus-circle-o"/>
                            </span>
                            </Tooltip>
                        </div>
                    </div>
                    : ''
                }

                <div className="row-form">
                    <label className='control-label'>课件：</label>

                    <Icon type="file-text margin-left-20 file-icon"
                          style={{display: this.courseCase.fileName ? '': 'none'}}/>
                    <a href={this.courseCase.fileUrl} target="new">{this.courseCase.fileName}</a>
                </div>

                {this.LivePlayerRender()}

                <div className="row-form">
                    <label className='control-label'>审核：</label>

                    {!this.isVerified ?
                        <div className="margin-left-20">
                            <RadioGroup onChange={e => this.onCheckStatusChange(e)} value={this.state.passed}>
                                <Radio value={true}>通过</Radio>
                                <Radio value={false}>否决</Radio>
                            </RadioGroup>
                        </div>
                        : <label className={"margin-left-20 info-label " + (live.bizTargetStatus === Biz_Target_Status.UN_PASSED ? 'warn-color' : 'info-color')} >
                            {live.auditStatus === Biz_Target_Status.UN_PASSED ? '未通过' : '已通过'}
                          </label>
                    }
                </div>

                {!this.isVerified ?
                    <div className={'row-form textarea-height ' + (this.state.passed ? 'item-hide' : '')}>
                        <label className='control-label'>备注：</label>

                        <Input id="comment" type="textarea" className="margin-left-20" placeholder="请输入否决原因" />
                    </div>
                    : ''
                }


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
        detail: state.live,
        liveObj: state.livePlayer,
    }
};
export default connect(mapStateToProps)(LiveDetail)