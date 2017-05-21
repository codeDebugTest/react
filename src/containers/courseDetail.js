import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRecordTreeNames} from '../utils/TreeToo'
import {mapTagIdsToNames} from '../utils/util'
import {Col, Button, Icon} from 'antd'
import '../App.css'

class CourseDetail extends Component {

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
                    <Button type="primary" className="margin-left-20 player-btn"
                            style={{display: courseVideo.fileUrl ? '': 'none'}}> ▶ </Button>
                </div>
                <div className="row-form">
                    <label className='control-label'>教案：</label>
                    <Icon type="file-text margin-left-20 file-icon" style={{display: courseCase.fileName ? '': 'none'}}/>
                    <a href={courseCase.fileUrl} target="new">{courseCase.fileName}</a>
                </div>
                <div className="row-form">
                    <label className='control-label'>审核：</label>
                    <div className="margin-left-20">
                        <Button type="primary">通过</Button>
                        <Button type="danger">否决</Button>
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
        detail: state.course
    }
};

export default connect(mapStateToProps)(CourseDetail)