
export const CREATE_LIVE_PLAYER = 'create_live_player';
export const RELEASE_LIVE_PLAYER = 'release_live_player';

const createAction = (data) => {
    return {
        type: CREATE_LIVE_PLAYER,
        livePlayer: data
    }
};

const releaseAction = () => {
    return {
        type: RELEASE_LIVE_PLAYER,
    }
};

const createLivePlayer = function (liveConfig, dispatch) {
    window.livePlayer(
        liveConfig.liveBox,
        {
            "controls":true,
            "autoplay":false,
            "preload":"metadata",
            "techOrder": ["html5", "flash"],
            "loop":false,
            "bigPlayButton":true,
            "streamTimeoutTime": 10 * 1000,
            "controlBar":{
                "playToggle":true,
                "volumeMenuButton":true,
                "currentTimeDisplay":true,
                "timeDivider":true,
                "durationDisplay":true,
                "progressControl":true,
                "liveDisplay":true,
                "remainingTimeDisplay":false,
                "fullscreenToggle":true,
            }
        },
        livePlayer => {
            livePlayer.setDataSource({
                type: liveConfig.playerType,
                src: liveConfig.pullStreamUrl
            });

            dispatch(createAction(livePlayer))
        }
    );

};

export function doCreateLivePlayer(liveConfig) {
    return dispatch => {
        createLivePlayer(liveConfig, dispatch)
    }
}

export function doReleaseLivePlayer() {
    return dispatch => {
        dispatch(releaseAction())
    }
}