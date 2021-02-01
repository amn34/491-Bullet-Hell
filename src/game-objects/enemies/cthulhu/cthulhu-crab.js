class CthulhuCrab extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 71;
        const height = 42;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuCrab.png")
        this.loadAnimations();
        this.animationType = 0; // Starting animation.

        this.velocity = { x: 0, y: 0 };
        this.direction = 3; // Starting direction of minion movement.
        this.moveTimer = 0; // Time for sin/cos functions.

        this.life = 2;
        this.startTimer = Date.now()
    };

    loadAnimations() {
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 4, 0.4,
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
        const Direction = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 }; // Keep track of direction.
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4 }; // Tied to moveFunction.
        const VELOCITY = { SUPERFAST: 150, FAST: 100, REGULAR: 75, SLOW: 50, SUPERSLOW: 25 }

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.velocity.x <= 0 && this.direction === Direction.LEFT) { // SPRITE MOVING LEFT
            if (this.BB.left < 0) {
                this.direction = Direction.RIGHT;
            } else {
                this.velocity.x += this.moveFunction(VELOCITY.SUPERSLOW, Movement.LEFT);
                let amplitude = 50;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.COS);
            }
        } else if (this.velocity.x >= 0 && this.direction === Direction.RIGHT) { // SPRITE MOVING RIGHT
            if (this.BB.right > PARAMS.CANVAS_WIDTH) {
                this.direction = Direction.LEFT;
            } else {
                this.velocity.x += this.moveFunction(VELOCITY.SUPERSLOW, Movement.RIGHT);
                let amplitude = 50;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.SIN);
            }
        }

        if (this.BB.top < 300) {
            this.velocity.y += 1;
            this.y += 1;
        }

        if (this.moveTimer > 10000) this.moveTimer = 1; // Reset move timer so not to overflow.

        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        this.bulletPattern(200, 250, 50);

        if (this.y >= PARAMS.CANVAS_HEIGHT) {
            this.removeFromWorld = true;
        }
    };

    updateBB() {
        const radius = 35;
        super.updateBB(radius);
    };

    /**
     * Controls the firing mechanism for minions. There are two different firing modes based on the location
     * of the minion along the y-coordinate. There is a regular firing pattern in which the minion will fire
     * at the regular fireInterval rate that is specified in milliseconds. If comes within a certain distance
     * of the bottom of the canvas then the firing interval is dependent on  fireIntervalSpecial.
     * @param distance from the bottom of the canvas.
     * @param fireInterval regular fire interval.
     * @param fireIntervalSpecial fire interval when minion comes within a certain distance of the bottom of canvas.
     */
    bulletPattern(distance, fireInterval, fireIntervalSpecial) {
        this.endTimer = Date.now();
        this.elapsedTime = this.startTimer - this.endTimer;

        // Regular fire interval.
        if (this.elapsedTime % fireInterval === 0) {
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height - 15, 1));
        }
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
