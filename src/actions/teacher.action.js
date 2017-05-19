import {fetchTeacherList} from '../utils/httpReqApi'

export const FETCH_TEACHER_LIST = 'fetch_teacher_list';
export const FETCH_TEACHER_SUCCESS = 'fetch_teacher_success';
export const FETCH_TEACHER_FAILED = 'fetch_teacher_failed';

const doFetch = () => {
    return {
        type: FETCH_TEACHER_LIST,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_TEACHER_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_TEACHER_SUCCESS,
        response: response
    }
};

export function doFetchTeacherList(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(doFetch(data));

        return fetchTeacherList(data).then(
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