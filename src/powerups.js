class PowerUp {
    constructor(game, x, y, image) {
        Object.assign(this, {game, x, y});
        this.scale = 1;
        this.width = 32;
        this.height = 32;
        this.timeBeforeDeletion = 250;
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
        
        this.timeBeforeDeletion--;
        if (this.y >= PARAMS.HEIGHT || this.timeBeforeDeletion <= 0) {
            this.destroy();
        }

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

    destroy() {
        this.removeFromWorld = true;
    }
}


class IncreaseFireRatePowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}

class IncreaseHealthPowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}

class IncreasePowerPowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}

class IncreaseShieldPowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}

class AdditionalProjectilePowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}

class MultipleProjectilePowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}