import {fetchLiveList} from '../utils/httpReqApi'

export const FETCH_LIVE_LIST = 'fetch_live_list';
export const FETCH_LIVE_SUCCESS = 'fetch_live_success';
export const FETCH_LIVE_FAILED = 'fetch_live_failed';

const doFetch = () => {
    return {
        type: FETCH_LIVE_LIST,
    }
};
const doSuccess = (response) => {
    return {
        type: FETCH_LIVE_SUCCESS,
        response: response
    }
};

const doFailed = (response) => {
    return {
        type: FETCH_LIVE_FAILED,
        response: response
    }
};

export function doFetchLiveList(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(doFetch(data));

        return fetchLiveList(data).then(
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