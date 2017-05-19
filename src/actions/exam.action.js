import {fetchExamList} from '../utils/httpReqApi'

export const FETCH_EXAM_LIST = 'fetch_exam_list';
export const FETCH_EXAM_SUCCESS = 'fetch_exam_success';
export const FETCH_EXAM_FAILED = 'fetch_exam_failed';

const doFetch = () => {
    return {
        type: FETCH_EXAM_LIST,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_EXAM_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_EXAM_FAILED,
        response: response
    }
};

export function doFetchExamList(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(doFetch(data));

        return fetchExamList(data).then(
            response => {
                if (response.code === undefined) {
                    alert(`No code in result of post: fetch course list`);
                    return;
                }

                if(response.code === 0) {
                    dispatch(doSuccess(response));
                } else {
                    dispatch(doFailed(response));
                    failedFuc(response.message);
                }
            }
        );
    }
}