import {FETCH_COURSE_LIST, FETCH_COURSE_SUCCESS, FETCH_COURSE_FAILED,
    DELETE_COURSE_SUCCESS, SHOW_COURSE_DETAIL} from '../actions/course.action'

export function courseReducer(state = {}, action){
    switch (action.type) {
        case FETCH_COURSE_LIST:
            return Object.assign({}, state, {loading: true, courseList: []});
        case FETCH_COURSE_SUCCESS:
            return Object.assign({}, state, {loading: false, courseList: action.response.content});
        case FETCH_COURSE_FAILED:
            return Object.assign({}, state, {loading: false, courseList: []});
        case SHOW_COURSE_DETAIL:
            return Object.assign({}, state, {course: action.course});
        case DELETE_COURSE_SUCCESS:
            state.courseList.splice(action.index, 1);
            return Object.assign({}, state);
        default:
            return state;
    }
}
