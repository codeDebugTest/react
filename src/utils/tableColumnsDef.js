import React from 'react'
import {Popconfirm, Icon} from 'antd'
import {getRecordTreeGrad, getRecordTreeNames, getRecordTreeSubject} from '../utils/TreeToo'

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
            render: (text, record) => {
                if(record.checkStatus) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 150,
            render: (text, record, index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];
};

const getExamColumns = (knowledgeTree, editRecord, deleteRecord) => {
    return [
        {
            title: '名称',
            dataIndex: 'examName',
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
            render: (text, record) => {
                if(record.checkStatus) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 150,
            render: (text, record,index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
};

const getTeacherColumns = (knowledgeTree, editRecord, deleteRecord) => {
    return [
        {
            title: '姓名',
            dataIndex: 'userName',
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
        render: (text, record) => {
            if(record.checkStatus) {
                return '已审核';
            } else {
                return '未审核';
            }
        }
    }, {
        title: 'Action',
        width: 150,
        render: (text, record, index) => {
            const deleteMsg = 'Are you sure delete this record';
            return (
                <div>
                    <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

                    <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                 onConfirm={()=>deleteRecord(index)}>
                        <span className="delete-icon"><Icon type="delete" /></span>
                    </Popconfirm>
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
            render: (text, record) => {
                if(record.checkStatus) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 150,
            render: (text, record, index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>
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
                if(record.checkStatus) {
                    return '已审核';
                } else {
                    return '未审核';
                }
            }
        }, {
            title: 'Action',
            width: 150,
            render: (text, record, index) => {
                const deleteMsg = 'Are you sure delete this record';
                return (
                    <div>
                        <span className="add-icon" onClick={()=>editRecord(index)}><Icon type="edit"/></span>

                        <Popconfirm  placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                                     onConfirm={()=>deleteRecord(index)}>
                            <span className="delete-icon"><Icon type="delete" /></span>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];
}

export {getCourseColumns, getExamColumns, getTeacherColumns, getLiveColumns, getSchoolColumns}