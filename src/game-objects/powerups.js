class PowerUp {
    constructor(game, x, y, image) {
        Object.assign(this, { game, x, y });
        this.scale = 1.5;
        this.width = 32;
        this.height = 32;
        this.timeBeforeDeletion = 250;
        this.sprite = ASSET_MANAGER.getAsset(image);
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animation = new Animator(this.sprite, 0, 0, this.width, this.height, 1, 1, 0, false, true);
        this.updateBB();
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            this.drawBB(ctx);
        }
    }

    drawBB(ctx) {
        ctx.strokeStyle = 'Red';
        ctx.beginPath();
        ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    update() {
        this.y += 3;

        this.timeBeforeDeletion--;
        if (this.y >= PARAMS.HEIGHT || this.timeBeforeDeletion <= 0) {
            this.destroy();
        }

        //if the player is near the powerup move the powerup towards the player
        const distX = this.game.entities.player.x - this.x;
        const distY = this.game.entities.player.y - this.y;
        const distT = distX * distX + distY * distY;
        const pickupDist = 60;
        if(distT < pickupDist * pickupDist) { 
            this.x += Math.min(Math.max(distX, -3), 3);
            this.y += Math.min(Math.max(distY, -3), 3);
        }

        this.updateBB(20);
    }

    updateBB(radius) {
        this.BB = new BoundingCircle(this.x + (this.width / 2) * this.scale, this.y + (this.height / 2) * this.scale, radius);
    };


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

class CompanionPowerUp extends PowerUp {
    constructor(game, x, y, image) {
        super(game, x, y, image);
    }
}