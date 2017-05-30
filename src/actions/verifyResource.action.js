import {verifyResource} from '../utils/httpReqApi'

export function doVerifyResource(data, successFunc, failedFuc) {
    verifyResource(data).then(
        response => {
            if (response.code === undefined) {
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