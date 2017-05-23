function livePlayer(divId, initOptions, initCallback) {
    const pullStreamObj = new neplayer(divId, initOptions,
        () => {
            initCallback(pullStreamObj);
        }
    );
}

window.livePlayer = livePlayer;