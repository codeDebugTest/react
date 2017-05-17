import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, } from '../actions/login'

export function loginReducer(state = {}, action){
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {username: action.info.username, isFetchingLogin: true});
        case LOGIN_SUCCESS:
            // action.successFunc();
            return Object.assign({}, state, {userInfo: action.response.content, userHasLogin: true });
        case LOGIN_FAILED:
            // action.failedFuc(action.response.message);
            return Object.assign({}, state, {message: action.response.message, userHasLogin: false });
        default:
            return state;
    }
}
