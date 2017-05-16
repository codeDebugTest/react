import {userLogin} from '../utils/httpReqApi'
export const LOGIN = 'login';
export const LOGIN_SUCCESS= 'login_success';
export const LOGIN_FAILED = 'login_failed';
export const SWITCH_HOME_ROUTE = 'home_route';

const login = (obj) => {
    return {
        type: LOGIN,
        info: obj
    }
};

const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        response: response,
        // successFunc: successFunc
    }
};

const loginFailed = (response) => {
    return {
        type: LOGIN_FAILED,
        response: response,
        // failedFuc: failedFuc
    }
};
const switchRoute = (path) => {
    return {
        type: SWITCH_HOME_ROUTE,
        path: path
    }
};

export function fetchLogin(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(login(data));

        const callback = (response) => {
            if(response.code === 0) {
                dispatch(loginSuccess(response));
                dispatch(switchRoute('/management'))
            } else {
                dispatch(loginFailed(response));
                failedFuc(response.message);
            }
        };
        return userLogin(data, callback);
    }
}
