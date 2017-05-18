import {fetchDictionary} from '../utils/httpReqApi'

export const FETCH_COURSE_LIST = 'fetch_course_list';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_FAILED = 'fetch_failed';

const doFetch = () => {
    return {
        type: FETCH_COURSE_LIST,
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