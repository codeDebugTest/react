import {FETCH_LIVE_LIST, FETCH_LIVE_SUCCESS, FETCH_LIVE_FAILED,
    DELETE_LIVE_SUCCESS, DELETE_LIVE_FAILED} from '../actions/live.action'

export function liveReducer(state = {}, action){
    switch (action.type) {
        case FETCH_LIVE_LIST:
            return Object.assign({}, state, {loading: true, liveList: []});
        case FETCH_LIVE_SUCCESS:
            return Object.assign({}, state, {loading: false, liveList: action.response.content.liveCourseList});
        case FETCH_LIVE_FAILED:
            return Object.assign({}, state, {loading: false, liveList: []});
        case DELETE_LIVE_SUCCESS:
            state.liveList.splice(action.index, 1);
            return Object.assign({}, state);
        default:
            return state;
    }
}
