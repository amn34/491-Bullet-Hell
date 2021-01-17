class Background {
    constructor(game, x, y, image) {
        this.sprite = ASSET_MANAGER.getAsset(image);
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animation = new Animator(this.sprite, 0, 1, 760, 768, 1, 0.5, 0, false, true);

        this.game = game;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }

    update() {
        this.y += 2;
        //change later to user global constants 
        if(this.y >= 760) {
            this.y -= 760 * 2;
        }
    }
}
