import {fetchKnowledgeTree} from '../utils/httpReqApi'

export const FETCH_KNOWLEDGE_TREE = 'fetch_knowledge_tree';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_FAILED = 'fetch_failed';

const doFetch = () => {
    return {
        type: FETCH_KNOWLEDGE_TREE,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_FAILED,
        response: response
    }
};

export function doFetchKnowledgeTree (regionId, successFunc, failedFuc){
    return dispatch => {
        dispatch(doFetch());

        return fetchKnowledgeTree(regionId).then(
            response => {
                if (response.code === undefined) {
                    alert(`No code in result of post: fetchKnowledgeTree`);
                    return;
                }
                if (response.code === 0) {
                    dispatch(doSuccess(response))
                } else {
                    dispatch(doFailed(response));
                    failedFuc(response.message);
                }
            }
        );
    }
}