import {fetchExamList} from '../utils/httpReqApi'

export const FETCH_EXAM_LIST = 'fetch_exam_list';
export const FETCH_EXAM_SUCCESS = 'fetch_exam_success';
export const FETCH_EXAM_FAILED = 'fetch_exam_failed';
export const DELETE_EXAM_SUCCESS = 'delete_exam_success';
export const DELETE_EXAM_FAILED = 'delete_exam_failed';
export const SHOW_EXAM_DETAIL = 'show_exam_detail';

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

const deleteSuccess = (index) => {
    return {
        type: DELETE_EXAM_SUCCESS,
        index: index
    }
};

const showDetail = (exercise) => {
    return {
        type: SHOW_EXAM_DETAIL,
        exercise: exercise
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

export function doDeleteExam(data, successFunc, failedFunc) {
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