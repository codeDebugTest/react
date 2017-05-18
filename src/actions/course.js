import {fetchCourseList} from '../utils/httpReqApi'

export const FETCH_COURSE_LIST = 'fetch_course_list';
export const FETCH_COURSE_SUCCESS = 'fetch_course_success';
export const FETCH_COURSE_FAILED = 'fetch_course_failed';

const doFetch = () => {
    return {
        type: FETCH_COURSE_LIST,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_COURSE_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_COURSE_FAILED,
        response: response
    }
};

export function doFetchCourseList(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(doFetch(data));

        return fetchCourseList(data).then(
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