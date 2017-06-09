
export const CREATE_LIVE_PLAYER = 'create_live_player';

const createLiveAction = (data) => {
    return {
        type: CREATE_LIVE_PLAYER,
        livePlayer: data
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

            dispatch(createLiveAction(livePlayer))
        }
    );

};

export function doCreateLivePlayer(liveConfig) {
    return dispatch => {
        createLivePlayer(liveConfig, dispatch)
    }
}
