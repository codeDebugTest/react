import {FETCH_COURSE_LIST, FETCH_SUCCESS, FETCH_FAILED} from '../actions/course'

export function knowledgeTreeReducer(state = {}, action){
    switch (action.type) {
        case FETCH_COURSE_LIST:
            return Object.assign({}, state, {loading: true});
        case FETCH_SUCCESS:
            return Object.assign({}, state, {loading: false, dictionary: action.response.content});
        case FETCH_FAILED:
            return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
}
