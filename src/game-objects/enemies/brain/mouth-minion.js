
class MouthMinion extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/mouth.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 1, 1, 0, false, true));

        // For movement
        this.velocity = { x: 0, y: 0 };
        // Starting direction of minion movement.
        this.direction = 3;
        // Timer for Sin/Cos functions.
        this.moveTimer = 0;

        this.life = 2;
        this.canShoot = 0;
        this.threshHold = 25;
        this.startTimer = Date.now()

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
            this.game.addBullet(new MouthBullet(this.game, center, this.y + this.height, 1, true));
            this.game.addBullet(new MouthBullet(this.game, center, this.y + this.height, 1, false));
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
            if (this.BB.left < 0) {
                this.direction = Direction.RIGHT;
            } else {

                // Params to adjust wave.
                let amplitude = 50;
                let angularFrequency = 0;

                // x axis movement.
                this.velocity.x += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.SIN);

                // y axis movement.
                this.velocity.y += this.moveFunction(VELOCITY.REGULAR, Movement.DOWN);
            }
        }

        // SPRITE MOVING RIGHT ( and/or UP/DOWN)
        else if (this.velocity.x >= 0 && this.direction === Direction.RIGHT) {
            if (this.BB.right > PARAMS.WIDTH) {
                this.direction = Direction.LEFT;
            } else {

                let amplitude = 50;
                let angularFrequency = 1 / 10;

                // x axis movement.
                this.velocity.x += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.COS);

                // y axis movement.
                this.velocity.y += this.moveFunction(VELOCITY.REGULAR, Movement.DOWN);
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
        const radius = 42;
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

class MouthBullet extends Bullet {
    constructor(game, x, y, scale, isRight) {
        const radius = 10;
        const bulletSpeed = 4;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.isRight = isRight;
    };

    update() {
        if (this.x <= 0 || this.x >= PARAMS.WIDTH) {
            this.isRight = !this.isRight;
        }

        if (this.isRight && this.x <= PARAMS.WIDTH) {
            this.x += this.bulletSpeed;
        } else if (this.x >= 0) {
            this.x -= this.bulletSpeed;
        }

        this.y += this.bulletSpeed / 1.5;

        this.checkBounds();
        this.updateBB(10);
    };
}