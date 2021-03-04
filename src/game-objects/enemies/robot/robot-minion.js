class RobotMinion extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/joypad.png");
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 13, 0.2, 0, false, true));

        // For movement
        this.velocity = { x: 0, y: 0 };
        // Starting direction of minion movement.
        this.direction = 3;
        // Timer for Sin/Cos functions.
        this.moveTimer = 0;

        this.life = 2;
        this.canShoot = 100;
        this.threshHold = 150;
        this.startTimer = Date.now();

        this.score = 50;
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        super.draw(ctx);
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

        this.canShoot++;
        if (this.canShoot === this.threshHold) {
            let center = this.x + (this.width / 2) * this.scale;
            this.game.addBullet(new RobotBullet(this.game, center, this.y + 2 * this.height, 1));
            this.canShoot = 0;
        }

        // For movement
        const Direction = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4 };

        // Physics
        const TICK = this.game.clockTick;
        // Velocity based on movement
        const VELOCITY = { SUPERFAST: 150, FAST: 100, REGULAR: 75, SLOW: 50, SUPERSLOW: 25 }

        // Sprite velocity
        this.velocity.x = 0;
        this.velocity.y = 0;

        // SPRITE MOVING LEFT
        if (this.velocity.x <= 0 && this.direction === Direction.LEFT) {
            if (this.x + this.radius < 0) {
                this.direction = Direction.RIGHT;
            } else {
                // y axis movement.
                this.velocity.y += this.moveFunction(VELOCITY.SUPERSLOW, Movement.DOWN);
            }
        }

        // SPRITE MOVING RIGHT ( and/or UP/DOWN)
        else if (this.velocity.x >= 0 && this.direction === Direction.RIGHT) {
            if (this.x + this.radius > PARAMS.WIDTH) {
                this.direction = Direction.LEFT;
            } else {
                // y axis movement.
                this.velocity.y += this.moveFunction(VELOCITY.SUPERSLOW, Movement.DOWN);
            }
        }

        // Reset move timer so not to overflow.
        if (this.moveTimer > 10000) {
            this.moveTimer = 1;
        }

        // Update sprite position.
        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        super.remove();
    };

    updateBB() {
        const radius = 40;
        super.updateBB(radius);
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

class RobotBullet extends Bullet {
    constructor(game, x, y, scale) {
        const radius = 10;
        const bulletSpeed = 4;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
    };

    update() {
        this.y += this.bulletSpeed / 1.5;

        this.checkBounds();
        this.updateBB(10);
    };
}