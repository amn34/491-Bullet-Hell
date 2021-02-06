class CthulhuArrow extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 54;
        const height = 62;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuTriangle.png");
        this.loadAnimations();
        this.animationType = 0;

        this.velocity = { x: 0, y: 0 };

        this.life = 1;

        this.startTimer = Date.now();

        this.score = 100;
    };

    loadAnimations() {
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 1, 0.2,
            0, false, true));
        this.animations.push(new Animator(this.sprite, this.width, 0, this.width, this.height, 1, 0.2,
            0, false, true));
    };

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animationType].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

        const TICK = this.game.clockTick;
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4 }; // Tied to moveFunction.
        const VELOCITY = { SUPERFAST: 150, FAST: 100, REGULAR: 75, SLOW: 50, SUPERSLOW: 25 }
        let startLaser = 350;

        this.velocity.x = 0;
        this.velocity.y = 0;

        this.velocity.y += this.moveFunction(VELOCITY.REGULAR, Movement.DOWN);

        if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - startLaser) {
            this.velocity.y += this.moveFunction(VELOCITY.SUPERFAST, Movement.DOWN);
            this.animationType = 1;
        }

        // Update sprite position.
        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - startLaser) {
            this.bulletPattern();
        }

        if (this.y >= PARAMS.CANVAS_HEIGHT) {
            this.removeFromWorld = true;
        }
    };

    updateBB() {
        const radius = 30;
        super.updateBB(radius);
    };

    bulletPattern() {
        this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2 - 1, this.y + this.height, 1 / 4));
    };

    /**
     * Controls the velocity of the sprite.
     * @param velocity
     * @param direction
     * @returns {number|*|number}
     */
    moveFunction(velocity, direction) {
        let movementFunctions = [-velocity, velocity, velocity * velocity, -Math.sin(velocity), Math.cos(velocity)];
        return movementFunctions[direction];
    };
}