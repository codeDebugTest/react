import {FETCH_EXAM_LIST,FETCH_EXAM_SUCCESS, FETCH_EXAM_FAILED,
    DELETE_EXAM_SUCCESS, SHOW_EXAM_DETAIL} from '../actions/exam.action'

export function examReducer(state = {}, action){
    switch (action.type) {
        case FETCH_EXAM_LIST:
            return Object.assign({}, state, {loading: true, examList: []});
        case FETCH_EXAM_SUCCESS:
            return Object.assign({}, state, {loading: false, examList: action.response.content});
        case FETCH_EXAM_FAILED:
            return Object.assign({}, state, {loading: false, examList: []});
        case SHOW_EXAM_DETAIL:
            return Object.assign({}, state, {exercise: action.exercise});
        case DELETE_EXAM_SUCCESS:
            state.examList.splice(action.index, 1);
            return Object.assign({}, state);
        default:
            return state;
    }
}
