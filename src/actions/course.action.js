import {fetchCourseList} from '../utils/httpReqApi'

export const FETCH_COURSE_LIST = 'fetch_course_list';
export const FETCH_COURSE_SUCCESS = 'fetch_course_success';
export const FETCH_COURSE_FAILED = 'fetch_course_failed';
export const DELETE_COURSE_SUCCESS = 'delete_course_success';
export const DELETE_COURSE_FAILED = 'delete_course_failed';

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

const deleteSuccess = (index) => {
    return {
        type: DELETE_COURSE_SUCCESS,
        index: index
    }
}

const deleteFailed = (response) => {
    return {
        type: DELETE_COURSE_FAILED,
        index: response
    }
}

export function doFetchCourseList(data, successFunc, failedFunc) {
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
                    failedFunc(response.message);
                }
            }
        );
    }
}

export function doDeleteCourse(data, successFunc, failedFunc) {
    return dispatch => {
        dispatch(deleteSuccess(data));
        successFunc();
    }
}