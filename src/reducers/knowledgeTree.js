import {FETCH_KNOWLEDGE_TREE, FETCH_SUCCESS, FETCH_FAILED} from '../actions/knowledge'

export function knowledgeTreeReducer(state = {}, action){
    switch (action.type) {
        case FETCH_KNOWLEDGE_TREE:
            return Object.assign({}, state, {loading: true});
        case FETCH_SUCCESS:
            return Object.assign({}, state, {loading: false, knowledgeTree: action.response.content});
        case FETCH_FAILED:
            return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
}
