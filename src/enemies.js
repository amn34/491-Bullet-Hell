class Brain {
    constructor(game) {
        this.sprite = ASSET_MANAGER.getAsset("./../res/enemy.png");
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animation = new Animator(this.sprite, 0, 1, 31, 30, 1, 0.5, 0, false, true);

        
        this.game = game;
        this.x = 50;
        this.y = 50
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    }

    update() {

    }
}