import {FETCH_DICTIONARY, FETCH_DICTIONARY_SUCCESS, FETCH_DICTIONARY_FAILED,
    FETCH_KNOWLEDGE_TREE_SUCCESS} from '../actions/knowledge.ation'

export function knowledgeTreeReducer(state = {}, action){
    switch (action.type) {
        case FETCH_DICTIONARY:
            return Object.assign({}, state, {loading: true});
        case FETCH_DICTIONARY_SUCCESS:
            return Object.assign({}, state, {loading: false, dictionary: action.response.content});
        case FETCH_KNOWLEDGE_TREE_SUCCESS:
            return Object.assign({}, state, {loading: false, knowledgeTree: action.response.content});
        case FETCH_DICTIONARY_FAILED:
            return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
}
