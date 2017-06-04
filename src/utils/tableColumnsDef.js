import React from 'react'
import {Popconfirm, Icon} from 'antd'
import {getRecordTreeGrad, getRecordTreeNames, getRecordTreeSubject,
    mapGradeIdToName, mapSubjectIdToName} from '../utils/TreeToo'
import {EXERCISE_TYPE, Biz_Target_Status, GENDER_MALE, GENDER_FEMALE} from '../utils/constants'

const getCourseColumns = (knowledgeTree, editRecord, deleteRecord) => {
    return [
        {
            title: '名称',
            dataIndex: 'courseTitle',
        }, {
            title: '年级',
            width: 100,
            render: (text, record, index) => {
                return getRecordTreeGrad(knowledgeTree, record);
            }
        }, {
            title: '科目',
            width: 100,
            render: (text, record) => {
                return getRecordTreeSubject(knowledgeTree, record);
            }
        }, {
            title: '知识树',
            render: (text, record) => {
                return getRecordTreeNames(knowledgeTree, record);
            }
        }, {
            title: '审核状态',
            width: 120,
            render: (text, record) => {
                if(record.bizTargetStatus === Biz_Target_Status.UN_PASSED ||
                    record.bizTargetStatus === Biz_Target_Status.RELEASED) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 80,
            render: (text, record, index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

                        {/*<Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"*/}
                                     {/*onConfirm={()=>deleteRecord(index)}>*/}
                            {/*<span className="delete-icon"><Icon type="delete" /></span>*/}
                        {/*</Popconfirm>*/}
                    </div>
                )
            }
        }
    ];
};

const getExamColumns = (knowledgeTree, editRecord, deleteRecord) => {
    return [
        {
            title: '题干',
            dataIndex: 'content',
        },{
            title: '类型',
            width: 100,
            render: (text, record) => {
                return EXERCISE_TYPE[record.type] && EXERCISE_TYPE[record.type].name
            }
        }, {
            title: '年级',
            width: 100,
            render: (text, record) => {
                return getRecordTreeGrad(knowledgeTree, record);
            }
        }, {
            title: '科目',
            width: 100,
            render: (text, record) => {
                return getRecordTreeSubject(knowledgeTree, record);
            }
        }, {
            title: '知识树',
            render: (text, record) => {
                return getRecordTreeNames(knowledgeTree, record);
            }
        }, {
            title: '审核状态',
            width: 100,
            render: (text, record) => {
                if(record.bizTargetStatus === Biz_Target_Status.UN_PASSED ||
                    record.bizTargetStatus === Biz_Target_Status.RELEASED) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 60,
            render: (text, record,index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

{/*                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>*/}
                    </div>
                )
            }
        }
    ]
};

const getTeacherColumns = (dictionary, editRecord, deleteRecord) => {
    return [
        {
            title: '姓名',
            dataIndex: 'userName',
        },{
            title: '性别',
            render: (text, record) => {
                if (record.genderId === GENDER_MALE) {
                    return '男';
                } else if (record.genderId === GENDER_FEMALE) {
                    return '女';
                }
                return '';
            }
        }, {
        title: '年级',
        render: (text, record) => {
            return mapGradeIdToName(dictionary.knowledgeTree, record.gradeId);
        }
    }, {
        title: '科目',
        render: (text, record) => {
            return mapSubjectIdToName(dictionary.subjectList, record.subjectId);
        }
    }, {
        title: '审核状态',
        render: (text, record) => {
            if(record.verified) {
                return '已审核';
            } else {
                return '未审核';
            }
        }
    }, {
        title: 'Action',
        width: 80,
        render: (text, record, index) => {
            const deleteMsg = 'Are you sure delete this record';
            return (
                <div>
                    <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

{/*                    <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                 onConfirm={()=>deleteRecord(index)}>
                        <span className="delete-icon"><Icon type="delete" /></span>
                    </Popconfirm>*/}
                </div>
            )
        }
    }
    ];
};

const getLiveColumns = (knowledgeTree, editRecord, deleteRecord) => {
    return [
        {
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '年级',
            width: 100,
            render: (text, record, index) => {
                return getRecordTreeGrad(knowledgeTree, record);
            }
        }, {
            title: '科目',
            width: 100,
            render: (text, record) => {
                return getRecordTreeSubject(knowledgeTree, record);
            }
        }, {
            title: '审核状态',
            width: 120,
            render: (text, record) => {
                if(record.verified) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 80,
            render: (text, record, index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

{/*                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>*/}
                    </div>
                )
            }
        }
    ]
};

const getSchoolColumns = (editRecord, deleteRecord) => {
    return [
        {
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '审核状态',
            width: 150,
            render: (text, record) => {
                if(record.verified) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 80,
            render: (text, record, index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

{/*                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>*/}
                    </div>
                )
            }
        }
    ];
};


export {getCourseColumns, getExamColumns, getTeacherColumns, getLiveColumns, getSchoolColumns}