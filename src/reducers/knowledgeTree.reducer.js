import {FETCH_DICTIONARY, FETCH_SUCCESS, FETCH_FAILED} from '../actions/knowledge.ation'

export function knowledgeTreeReducer(state = {}, action){
    switch (action.type) {
        case FETCH_DICTIONARY:
            return Object.assign({}, state, {loading: true});
        case FETCH_SUCCESS:
            return Object.assign({}, state, {loading: false, dictionary: action.response.content});
        case FETCH_FAILED:
            return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
}
