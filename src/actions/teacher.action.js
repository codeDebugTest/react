import {fetchTeacherList} from '../utils/httpReqApi'

export const FETCH_TEACHER_LIST = 'fetch_teacher_list';
export const FETCH_TEACHER_SUCCESS = 'fetch_teacher_success';
export const FETCH_TEACHER_FAILED = 'fetch_teacher_failed';
export const DELETE_TEACHER_SUCCESS = 'delete_teacher_success';
export const DELETE_TEACHER_FAILED = 'delete_teacher_failed';
export const SHOW_TEACHER_DETAIL = 'show_teacher_detail';

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

const deleteSuccess = (index) => {
    return {
        type: DELETE_TEACHER_SUCCESS,
        index: index
    }
}

const deleteFailed = (response) => {
    return {
        type: DELETE_TEACHER_FAILED,
        index: response
    }
}

const showDetail = (teacher) => {
    return {
        type: SHOW_TEACHER_DETAIL,
        teacher: teacher
    }
};

export function doFetchTeacherList(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(doFetch(data));

        return fetchTeacherList(data).then(
            response => {
                if (!response || response.code === undefined) {
                    alert(`No code in result of post: fetch course list`);
                    return;
                }

                if(response.code === 0 && response.content) {
                    dispatch(doSuccess(response));
                } else {
                    dispatch(doFailed(response));
                    failedFuc(response.message);
                }
            }
        );
    }
}

export function doDeleteTeacher(data, successFunc, failedFunc) {
    return dispatch => {
        dispatch(deleteSuccess(data));
        successFunc();
    }
}

export function doShowDetail(data) {
    return dispatch => {
        dispatch(showDetail(data))
    }
}