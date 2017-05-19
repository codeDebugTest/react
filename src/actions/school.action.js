import {fetchTeacherList} from '../utils/httpReqApi'

export const FETCH_SCHOOL_LIST = 'fetch_school_list';
export const FETCH_SCHOOL_SUCCESS = 'fetch_school_success';
export const FETCH_SCHOOL_FAILED = 'fetch_school_failed';

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

export function doFetchSchoolList(data, successFunc, failedFuc) {
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