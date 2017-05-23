import {CREATE_LIVE_PLAYER} from '../actions/livePlayer'


export function livePlayerReducer(state = {}, action){
    switch (action.type) {
        case CREATE_LIVE_PLAYER:
            return Object.assign({}, state, {livePlayer: action.livePlayer});
        default:
            return state;
    }
}
