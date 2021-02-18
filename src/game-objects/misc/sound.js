class Sound {
    constructor(game, volume, loop) {
        Object.assign(this, { game, volume, loop });
    }
}

class HitSound {
    constructor(game, volume, loop) {
        const audio = ASSET_MANAGER.getAsset("./res/sfx/Shoot.wav");
    }
}