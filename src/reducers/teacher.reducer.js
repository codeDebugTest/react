import {FETCH_TEACHER_LIST, FETCH_TEACHER_SUCCESS, FETCH_TEACHER_FAILED,
    DELETE_TEACHER_SUCCESS, DELETE_TEACHER_FAILED} from '../actions/teacher.action'

export function teacherReducer(state = {}, action){
    switch (action.type) {
        case FETCH_TEACHER_LIST:
            return Object.assign({}, state, {loading: true, teacherList: []});
        case FETCH_TEACHER_SUCCESS:
            return Object.assign({}, state, {loading: false, teacherList: action.response.content});
        case FETCH_TEACHER_FAILED:
            return Object.assign({}, state, {loading: false, teacherList: []});
        case DELETE_TEACHER_SUCCESS:
            state.teacherList.splice(action.index, 1);
            return Object.assign({}, state);
        default:
            return state;
    }
}
