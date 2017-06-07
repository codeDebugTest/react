import {fetchDictionary, fetchKnowledgeTree, updateKnowledgeTree} from '../utils/httpReqApi'

export const FETCH_DICTIONARY = 'fetch_dictionary';
export const FETCH_DICTIONARY_SUCCESS = 'fetch_dictionary_success';
export const FETCH_DICTIONARY_FAILED = 'fetch_dictionary_failed';
export const FETCH_KNOWLEDGE_TREE_SUCCESS = 'fetch_knowledge_tree_success';

const doFetch = () => {
    return {
        type: FETCH_DICTIONARY,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_DICTIONARY_SUCCESS,
        response: response
    }
};

const fetchKnowledgeTreeSuccess = (response) => {
    return {
        type: FETCH_KNOWLEDGE_TREE_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_DICTIONARY_FAILED,
        response: response
    }
};

export function doFetchKnowledgeTree(requestInfo, successFunc, failedFunc) {
    return dispatch => {
        return fetchKnowledgeTree (requestInfo).then(
            response => {
                if (response.code === undefined) {
                    alert(`获取知识树失败！`);
                    dispatch(doFailed(response));
                    return;
                }

                if (response.code === 0) {
                    dispatch(fetchKnowledgeTreeSuccess(response))
                } else {
                    dispatch(doFailed(response));
                    failedFunc(response.message);
                }
            }
        )
    }
}

export function doFetchDictionary (regionId, successFunc, failedFuc){
    return dispatch => {
        dispatch(doFetch());

        return fetchDictionary(regionId).then(
            response => {
                if (response.code === undefined) {
                    alert(`No code in result of post: fetchKnowledgeTree`);
                    dispatch(doFailed(response));
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

export function doUpdateKnowledgeTree(requestInfo, successFunc, failedFunc) {
   return updateKnowledgeTree(requestInfo).then(
            response => {
                if (response.code === undefined) {
                    alert(`更新知识树失败！`);
                    return;
                }

                if (response.code === 0) {
                    successFunc()
                } else {
                    failedFunc(response.message);
                }
            }
        )
}

