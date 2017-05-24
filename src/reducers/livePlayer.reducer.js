import {CREATE_LIVE_PLAYER, RELEASE_LIVE_PLAYER} from '../actions/livePlayer.action'


export function livePlayerReducer(state = {}, action){
    switch (action.type) {
        case CREATE_LIVE_PLAYER:
            return Object.assign({}, state, {livePlayer: action.livePlayer});
        case RELEASE_LIVE_PLAYER:
            if (state.livePlayer)
                state.livePlayer.release();
            return Object.assign({}, state, {livePlayer: null});
        default:
            return state;
    }
}
