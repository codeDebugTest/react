import {userLogin} from '../utils/httpReqApi'
export const LOGIN = 'login';
export const LOGIN_SUCCESS= 'login_success';
export const LOGIN_FAILED = 'login_failed';

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
    }
};

const loginFailed = (response) => {
    return {
        type: LOGIN_FAILED,
        response: response,
    }
};

export function fetchLogin(data, successFunc, failedFuc) {
    return dispatch => {
        dispatch(login(data));

        return userLogin(data).then(
            response => {
                if (!response || response.code === undefined) {
                    alert(`No code in result of post: login`);
                    return;
                }

                if(response.code === 0 && response.content) {
                    dispatch(loginSuccess(response));
                    successFunc();
                } else {
                    dispatch(loginFailed(response));
                    failedFuc(response.message);
                }
            }
        );
    }
}
