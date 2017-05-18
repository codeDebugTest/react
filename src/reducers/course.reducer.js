import {FETCH_COURSE_LIST, FETCH_COURSE_SUCCESS, FETCH_COURSE_FAILED} from '../actions/course.action'

export function courseReducer(state = {}, action){
    switch (action.type) {
        case FETCH_COURSE_LIST:
            return Object.assign({}, state, {loading: true, courseList: []});
        case FETCH_COURSE_SUCCESS:
            return Object.assign({}, state, {loading: false, courseList: action.response.content});
        case FETCH_COURSE_FAILED:
            return Object.assign({}, state, {loading: false, courseList: []});
        default:
            return state;
    }
}
