import {FETCH_SCHOOL_LIST, FETCH_SCHOOL_SUCCESS, FETCH_SCHOOL_FAILED, SHOW_SCHOOL_DETAIL} from '../actions/school.action'

export function schoolReducer(state = {schoolList: []}, action){
    switch (action.type) {
        case FETCH_SCHOOL_LIST:
            return Object.assign({}, state, {loading: true, schoolList: []});
        case FETCH_SCHOOL_SUCCESS:
            return Object.assign({}, state, {loading: false, schoolList: action.response.content});
        case FETCH_SCHOOL_FAILED:
            return Object.assign({}, state, {loading: false, schoolList: []});
        case SHOW_SCHOOL_DETAIL:
            return Object.assign({}, state, {school: action.school});
        default:
            return state;
    }
}
