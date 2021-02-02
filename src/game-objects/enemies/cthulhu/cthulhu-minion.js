class CthulhuMinion extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 96;
        const height = 80;
        super(game, x, y, width, height, scale);

        this.spriteFloat = ASSET_MANAGER.getAsset("./res/enemies/cth_minion_float.png");
        this.spriteAttack = ASSET_MANAGER.getAsset("./res/enemies/cth_minion_attack.png");
        this.loadAnimations();
        this.animationType = 1;

        this.velocity = { x: 0, y: 0 };
        // Starting direction of minion movement.
        this.direction = 3;
        // Timer for Sin/Cos functions.
        this.moveTimer = 0;

        this.life = 1;

        this.startTimer = Date.now();

        this.score = 25;
    };

    loadAnimations() {
        this.animations.push(new Animator(this.spriteFloat, 0, 0, this.width, this.height, 5, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteAttack, 0, 0, this.width, this.height, 6, 0.2, 0, false, true));
    };

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animationType].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

        // Enums objects for legibility.
        const Mode = { FLOAT: 0, ATTACK: 1 }; // Two animations types (uses attack only so far - will likely remove).
        // Keep track of direction
        const Direction = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
        // Movement type (tied to moveFunction).
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4 };

        // Physics
        const TICK = this.game.clockTick;
        // Velocity based on movement
        const VELOCITY = { SUPERFAST: 150, FAST: 100, REGULAR: 75, SLOW: 50, SUPERSLOW: 25 }

        // Sprite velocity
        this.velocity.x = 0;
        this.velocity.y = 0;

        // SPRITE MOVING LEFT ( and/or UP/DOWN)
        if (this.velocity.x <= 0 && this.direction === Direction.LEFT) {
            if (this.x + this.BB.radius < 0) { // check if we need to reverse
                this.direction = Direction.RIGHT; // Switch directions and go right.
            } else { // We know we are going left.

                // x axis movement.
                this.velocity.x += this.moveFunction(VELOCITY.REGULAR, Movement.UP);
                // y axis movement.
                let amplitude = 100;
                let angularFrequency = 1 / 120;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.COS);
            }
        }

        // SPRITE MOVING RIGHT ( and/or UP/DOWN)
        else if (this.velocity.x >= 0 && this.direction === Direction.RIGHT) {
            if (this.x + this.BB.radius > PARAMS.CANVAS_WIDTH) { // check if we have gone off the right side of canvas
                this.direction = Direction.LEFT; // go left
            } else { // We know we are going right.

                // x axis movement.
                this.velocity.x += this.moveFunction(VELOCITY.REGULAR, Movement.RIGHT);
                // y axis movement.
                let amplitude = 100;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.SIN);
            }
        }

        /*
        Controls the behavior of the minion [300] pixels before the bottom of the canvas.
        Minions will begin to slow down until they reverse.
         */
        if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - 300) {
            this.velocity.y -= 1;
            this.y -= 1;
        }

        /*
        If the minion flies too far beyond the top of the canvas reverse their velocity.
         */
        if (this.BB.top < -200) {
            this.velocity.y = -this.velocity.y;
        }

        // Reset move timer so not to overflow.
        if (this.moveTimer > 10000) {
            this.moveTimer = 1;
        }

        // Update sprite position.
        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        // Bullet firing mechanism
        this.bulletPattern(200, 250, 50);

        // Collision

        if (this.y >= PARAMS.CANVAS_HEIGHT) {
            this.removeFromWorld = true;
        }
    };

    updateBB() {
        const radius = 45;
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
        // Controls the firing mechanism for the minions.
        this.endTimer = Date.now();
        this.elapsedTime = this.startTimer - this.endTimer;
        // Special fire interval.
        if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - distance && this.elapsedTime % fireIntervalSpecial === 0) {
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height - 15, 1));
        }
        // Regular fire interval.
        else if (this.elapsedTime % fireInterval === 0) {
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


class CthulhuMinionBullet extends Bullet {
    constructor(game, x, y, scale) {
        const radius = 10;
        const bulletSpeed = 5;
        const bulletType = 1;
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
    }

    draw(ctx) {
        super.draw(ctx);
    }

    update() {
        this.y += this.bulletSpeed;
        super.checkBounds();
        super.updateBB(10);
    }
}
