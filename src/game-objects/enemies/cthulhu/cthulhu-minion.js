class CthulhuMinion extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 96;
        const height = 80;
        super(game, x, y, width, height, scale);

        this.spriteFloat = ASSET_MANAGER.getAsset("./res/enemies/cth_minion_float.png");
        this.spriteAttack = ASSET_MANAGER.getAsset("./res/enemies/cth_minion_attack.png");
        this.animation = 1;

        this.velocity = { x: 0, y: 0 };
        this.direction = 0; // Starting direction of minion movement.
        this.moveTimer = 0; // Timer for Sin/Cos functions.

        this.life = 1;
        this.score = 25;

        this.startTimer = Date.now();
        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.spriteFloat, 0, 0, this.width, this.height, 5, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteAttack, 0, 0, this.width, this.height, 6, 0.2, 0, false, true));
    }

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }

    update() {
        const TICK = this.game.clockTick;
        const Direction = { RIGHT: 0, LEFT: 1};
        const Movement = { LEFT: 0, RIGHT: 1, SIN: 2, COS: 3 }; // Tied to moveFunction.
        const Velocity = { SUPER_FAST: 200, FAST: 100, REGULAR: 75, SLOW: 50, SUPER_SLOW: 25 }

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.direction === Direction.LEFT) {
            if (this.BB.yCenter < 0) this.moveDownLeft = true;
            if (this.moveDownLeft) {
                this.velocity.x -= Velocity.REGULAR;
                this.velocity.y += Velocity.FAST;
            } else {
                this.velocity.x += this.moveFunction(Velocity.SUPER_SLOW, Movement.LEFT);
                let amplitude = 50;
                let angularFrequency = 1 / 60;
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
                let amplitude = 50;
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

        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        this.updateBB();
        this.bulletPattern(200, 113, 211);
        super.checkCollision(this.game.entities.bullets);
        super.remove();
    }

    updateBB() {
        const radius = 45;
        super.updateBB(radius);
    }

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
        if (this.BB.bottom > PARAMS.HEIGHT - distance && this.elapsedTime % fireIntervalSpecial === 0) {
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height - 15, 1));
        }
        // Regular fire interval.
        else if (this.elapsedTime % fireInterval === 0) {
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height - 15, 1));
        }
    }

    /**
     * Controls the velocity of the sprite.
     * @param velocity
     * @param direction
     * @returns {number|*|number}
     */
    moveFunction(velocity, direction) {
        let movementFunctions = [-velocity, velocity, -Math.sin(velocity), Math.cos(velocity)];
        return movementFunctions[direction];
    }
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
