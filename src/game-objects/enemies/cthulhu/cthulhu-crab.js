class CthulhuCrab extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 71;
        const height = 42;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuCrab.png")
        this.animation = 0;

        this.velocity = { x: 0, y: 0 };
        this.direction = 0; // Starting direction of minion movement.
        this.moveTimer = 0; // Timer for sin/cos functions.

        this.moveDownRight = false;
        this.moveDownLeft = false;

        this.life = 2;
        this.score = 100;

        this.startTimer = Date.now();
        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 4, 0.4,
            0, false, true));
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

        this.bulletPattern(200, 250, 50);
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);
        super.remove();
    }

    updateBB() {
        const radius = 35;
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
        this.endTimer = Date.now();
        this.elapsedTime = this.startTimer - this.endTimer;

        // Regular fire interval.
        if (this.elapsedTime % fireInterval === 0) {
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

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}
