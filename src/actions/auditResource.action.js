import {auditResource, udpateResourceKnowledgeTree} from '../utils/httpReqApi'

export function doAuditResource(data, successFunc, failedFuc) {
    auditResource(data).then(
        response => {
            if (!response || response.code === undefined) {
                alert(`审批失败：未收到请求结果！`);
                return;
            }

            if(response.code === 0) {
                successFunc();
            } else {
                failedFuc(response.message);
            }
        }
    );
}

export function doUpdateKnowledgeTree(data, successFunc, failedFunc) {
    return udpateResourceKnowledgeTree(data).then(
        response => {
            if (!response || response.code === undefined) {
                alert(`更新资源知识树失败！`);
                return;
            }

            if(response.code === 0) {
                successFunc();
            } else {
                failedFunc(response.message);
            }
        }
    )
}