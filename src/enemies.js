class Brain {
    constructor(game) {

        this.game = game;

        this.frameWidth = 31;
        this.frameHeight = 30;

        this.sprite = ASSET_MANAGER.getAsset("./res/enemy.png");
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animation = new Animator(this.sprite, 0, 1, this.frameWidth, this.frameHeight, 1, 0.5, 0, false, true);

        this.x = 50;
        this.y = 50
        this.scale = 3;

        this.width = 31 * this.scale;
        this.height = 30 * this.scale;

        // Can shoot once this reaches 100
        this.canShoot = 9;
        this.threshHold = 200;
        this.damage = 1;

        // Determines the path of the enemy
        this.goRight = true;

    }

    draw(ctx) {
        this.canShoot++;

        if (this.canShoot === this.threshHold) {
            let center = this.x + (this.width / 2);
            this.game.addEntity(new BrainBullet(this.game, center, this.y + this.height, 1));
            this.canShoot = 0;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }

    update() {
        if (this.x <= 100 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === 100 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === 0 && !this.goRight) {
            this.goRight = !this.goRight;
        }
    }
}

/**
 * Chululu sprite has potential to be a boss level sprite. Default animation is hovering while tentacles move.
 */
class Cthulhu {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.sprite = ASSET_MANAGER.getAsset("./res/chutuluSprite.png");

        // May update to include more animations later on depending on damage received, attack moves, etc.
        this.animations = [];
        // Default floating animation.
        this.animations.push(new Animator(this.sprite, 0, 0, 270, 245, 10, 0.3,
            false, false, true));

        // Control size of sprite (may come up w/ better solution).
        this.scaleSize = 1;

        // Location of sprite
        this.x = 375;
        this.y = 40;

        this.goRight = true;

    };

    /**
     * Chutulu update method.
     */
    update() { };

    /**
     * Chutulu draw method. Single default animation.
     * @param ctx context.
     */
    draw(ctx) {

        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleSize);
    };
}
