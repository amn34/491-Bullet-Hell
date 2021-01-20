class PowerUp {
    constructor(game, x, y, image) {
        Object.assign(this, {game, x, y});
        this.scale = 1;
        this.width = 32;
        this.height = 32;
        this.sprite = ASSET_MANAGER.getAsset(image);
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animation = new Animator(this.sprite, 0, 0, this.width, this.height, 1, 1, 0, false, true);
        this.updateBB();
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    update() {
        this.y += 3;
        //change later to user global constants 
        if(this.y >= 760) {
            this.y -= 760 * 2;
        }

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

    destroy() {
        this.removeFromWorld = true;
        console.log('destroying powerup');
    }
}
