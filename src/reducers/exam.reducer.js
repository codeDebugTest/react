import {FETCH_EXAM_LIST,FETCH_EXAM_SUCCESS, FETCH_EXAM_FAILED} from '../actions/exam.action'

export function examReducer(state = {}, action){
    switch (action.type) {
        case FETCH_EXAM_LIST:
            return Object.assign({}, state, {loading: true, examList: []});
        case FETCH_EXAM_SUCCESS:
            return Object.assign({}, state, {loading: false, examList: action.response.content});
        case FETCH_EXAM_FAILED:
            return Object.assign({}, state, {loading: false, examList: []});
        default:
            return state;
    }
}
