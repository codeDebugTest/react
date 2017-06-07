import {fetchSchoolList, updateSchool} from '../utils/httpReqApi'

export const FETCH_SCHOOL_LIST = 'fetch_school_list';
export const FETCH_SCHOOL_SUCCESS = 'fetch_school_success';
export const FETCH_SCHOOL_FAILED = 'fetch_school_failed';
export const DELETE_SCHOOL_SUCCESS = 'delete_school_success';
export const DELETE_SCHOOL_FAILED = 'delete_school_failed';
export const SHOW_SCHOOL_DETAIL = 'show_school_detail';

const doFetch = () => {
    return {
        type: FETCH_SCHOOL_LIST,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_SCHOOL_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_SCHOOL_FAILED,
        response: response
    }
};

const deleteSuccess = (index) => {
    return {
        type: DELETE_SCHOOL_SUCCESS,
        index: index
    }
}

const deleteFailed = (response) => {
    return {
        type: DELETE_SCHOOL_FAILED,
        index: response
    }
}

const showDetail = (school) => {
    return {
        type: SHOW_SCHOOL_DETAIL,
        school: school
    }
};

export function doFetchSchoolList(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(doFetch(data));

        return fetchSchoolList(data).then(
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

export function doDeleteSchool(data, successFunc, failedFunc) {
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

export function doUpdateSchool(data, successFunc, failedFunc) {
    return updateSchool(data).then(
        response => {
            if (response.code === undefined) {
                alert(`更新学校失败！`);
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