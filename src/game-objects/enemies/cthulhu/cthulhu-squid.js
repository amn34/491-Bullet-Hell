class CthulhuSquid extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 79;
        const height = 137;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuSquid.png");
        this.animation = 1; // Starting animation.

        this.velocity = { x: 0, y: 0 };
        this.direction = 3; // Starting direction of minion movement.
        this.moveTimer = 0; // Time for Sin/Cos functions.

        this.life = 3;
        this.score = 150;

        this.canShoot = 0;
        this.threshHold = 75;
        this.bulletPattern = [downSpiralAlternative, downSpiralReverseAlternative];

        this.startTimer = Date.now();
        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 1, 0.2,
            0, false, true));
        this.animations.push(new Animator(this.sprite, this.width, 0, this.width, this.height, 1, 0.2,
            0, false, true));
    }

    update() {
        const TICK = this.game.clockTick;
        const Direction = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 }; // Keep track of direction
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4 }; // Tied to moveFunction.
        const Velocity = { SUPER_FAST: 150, FAST: 100, REGULAR: 75, SLOW: 50, SUPER_SLOW: 25 }

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.direction === Direction.LEFT) {
            if (this.BB.yCenter < 0) this.moveDownLeft = true;
            if (this.moveDownLeft) {
                this.velocity.x -= Velocity.REGULAR;
                this.velocity.y += Velocity.FAST;
            } else {
                this.velocity.x += this.moveFunction(Velocity.SUPER_SLOW, Movement.LEFT);
                let amplitude = 150;
                let angularFrequency = 1 / 120;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer), Movement.COS);
            }
            if (this.BB.xCenter < 0) this.direction = Direction.RIGHT;

        } else if (this.direction === Direction.RIGHT) {
            if (this.BB.yCenter < 0) this.moveDownRight = true;
            if (this.moveDownRight) {
                this.velocity.x += Velocity.REGULAR;
                this.velocity.y += Velocity.FAST;
            } else {
                this.velocity.x += this.moveFunction(Velocity.SUPER_SLOW, Movement.RIGHT);
                let amplitude = 100;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer), Movement.SIN);
            }
            if (this.BB.xCenter > PARAMS.WIDTH) this.direction = Direction.LEFT;
        }

        if (this.BB.yCenter > 200) {
            this.moveDownRight = false;
            this.moveDownLeft = false;
        }

        this.moveTimer = this.moveTimer > 10000 ? 0 : this.moveTimer + 1;

        // Update sprite position.
        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        this.canShoot++;
        this.fireBulletPattern();
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);
        super.remove();
    }

    fireBulletPattern() {
        if (this.canShoot === this.threshHold) {
            this.canShoot = 0;
            let center = this.x + (this.width / 2) * this.scale;
            this.bulletPattern.forEach(bPattern => {
                this.game.addBullet(new CthulhuSquidBullet(this.game, center, this.y + this.height / 2, 1, bPattern));
            });
        }
    }

    updateBB() {
        const radius = 70;
        super.updateBB(radius);
    }

    /**
     * Controls the velocity of the sprite.
     * @param velocity
     * @param direction
     * @returns {number|*|number}
     */
    moveFunction(velocity, direction) {
        let movementFunctions = [-velocity, velocity, velocity * velocity, -Math.sin(velocity), Math.cos(velocity)];
        return movementFunctions[direction];
    }

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}


class CthulhuSquidBullet extends Bullet {
    constructor(game, x, y, scale, callback) {
        const radius = 11;
        const bulletSpeed = 3;
        const bulletType = 1;
        super(game, x, y, scale, radius, bulletSpeed, bulletType)
        this.callback = callback;
        this.angle = 0;

        this.y = y;
    }

    update() {
        this.updateBB();
        super.checkBounds();
        this.y += this.bulletSpeed;

        this.angle += 0.0999;
        this.callback(this);
    }

    updateBB() {
        const radius = 11;
        super.updateBB(radius);
    }
}

