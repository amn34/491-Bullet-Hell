class Brain {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.frameWidth = 32;
        this.frameHeight = 32;

        this.sprite = ASSET_MANAGER.getAsset("./res/brain.png");
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animations = [];

        this.animations.push(new Animator(this.sprite, 0, 0, this.frameWidth, this.frameHeight, 12, 0.2, 0, false, true));

        this.scale = 3;

        this.width = this.frameWidth * this.scale;
        this.height = this.frameHeight * this.scale;

        this.startX = this.x;
        this.startY = this.y;

        // Can shoot once this reaches 100
        this.canShoot = 9;
        this.threshHold = 200;
        this.damage = 1;

        // Determines the path of the enemy
        this.goRight = true;

        this.updateBB();
    }

    draw(ctx) {
        this.canShoot++;

        if (this.canShoot === this.threshHold) {
            let center = this.x + (this.width / 2);
            this.game.addEntity(new BrainBullet(this.game, center, this.y + this.height, 1));
            this.canShoot = 0;
        }

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    update() {
        if (this.x <= this.startX + 50 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === this.startX + 50 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 50 && !this.goRight) {
            this.goRight = !this.goRight;
        }

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };
}

/**
 * Chululu sprite has potential to be a boss level sprite. Default animation is hovering while tentacles move.
 */
class Cthulhu {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.sprite = ASSET_MANAGER.getAsset("./res/cthulhuSprite.png");

        this.startX = this.x;
        this.startY = this.y;

        // May update to include more animations later on depending on damage received, attack moves, etc.
        this.animations = [];
        // Default floating animation.
        this.animations.push(new Animator(this.sprite, 0, 0, 270, 245, 10, 0.3,
            false, false, true));

        // Control size of sprite (may come up w/ better solution).
        this.scaleSize = 1;
        this.goRight = true;
    };

    /**
     * Chutulu update method.
     */
    update() {
        if (this.x <= this.startX + 125 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === this.startX + 125 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 125 && !this.goRight) {
            this.goRight = !this.goRight;
        }
    };

    /**
     * Chutulu draw method. Single default animation.
     * @param ctx context.
     */
    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleSize);
    };
}

class EyeMinion {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.sprite = ASSET_MANAGER.getAsset("./res/eye.png");

        this.animations = [];
        this.animations.push(new Animator(this.sprite, 0, 0, 32, 32, 8, 0.2, 0, false, true));

        this.scale = 3;

        this.updateBB();
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

    update() {
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    };
}


class FingerGunDudue {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 32;
        this.height = 28;

        this.startX = this.x;
        this.startY = this.y;

        this.sprite = ASSET_MANAGER.getAsset("./res/finger_gun_dude.png");
        this.animations = [];

        this.canShoot = 0;
        this.threshHold = 100;
        this.animationIndex = 0;

        // Determines the path of the enemy
        this.goRight = true;
        this.scale = 3;

        this.loadAnimations();
    }

    loadAnimations() {
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        // Idle Animation
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false));
        // Finger 1 
        this.animations.push(new Animator(this.sprite, 0, 32, this.width, this.height, 0.3, 1, 0, false, false));
        // Finger 2
        this.animations.push(new Animator(this.sprite, 32, 32, this.width, this.height, 0.3, 1, 0, false, false));
    }

    draw(ctx) {
        this.animations[this.animationIndex].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (this.animationIndex === 1) {
            let center = this.x + (this.width / 1.5);
            this.game.addEntity(new FingerGunDudeBullet(this.game, center, this.y + this.height * 3, 1));
            this.animations[0] = new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false);
        } else if (this.animationIndex === 2) {
            let center = this.x + (this.width * 3 / 1.5);
            this.game.addEntity(new FingerGunDudeBullet(this.game, center, this.y + this.height * 3, 1));
            this.animations[1] = new Animator(this.sprite, 0, 32, this.width, this.height, 0.3, 1, 0, false, false);
        } else {
            this.animations[2] = new Animator(this.sprite, 32, 32, this.width, this.height, 0.3, 1, 0, false, false);
        }

        if (this.animations[this.animationIndex].isDone()) {
            this.animationIndex = (this.animationIndex + 1) % 3;
        }
    }

    update() {
        if (this.x <= this.startX + 50 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === this.startX + 50 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 50 && !this.goRight) {
            this.goRight = !this.goRight;
        }
    }
}