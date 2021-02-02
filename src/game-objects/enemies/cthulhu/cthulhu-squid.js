
class CthulhuSquid extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 79;
        const height = 137;
        super(game, x, y, width, height, scale);
        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuSquid.png");
        this.loadAnimations();
        this.animationType = 1; // Starting animation.

        this.velocity = { x: 0, y: 0 };
        this.direction = 3; // Starting direction of minion movement.
        this.moveTimer = 0; // Time for Sin/Cos functions.

        this.life = 3;

        this.startTimer = Date.now()
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
        const Direction = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 }; // Keep track of direction
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4 }; // Tied to moveFunction.
        const VELOCITY = { SUPERFAST: 150, FAST: 100, REGULAR: 75, SLOW: 50, SUPERSLOW: 25 }

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.velocity.x <= 0 && this.direction === Direction.LEFT) {
            if (this.x + this.BB.radius < 0) {
                this.direction = Direction.RIGHT;
            } else {
                this.velocity.x += this.moveFunction(VELOCITY.REGULAR, Movement.UP);
                let amplitude = 150;
                let angularFrequency = 1 / 120;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.COS);
            }
        } else if (this.velocity.x >= 0 && this.direction === Direction.RIGHT) { // SPRITE MOVING RIGHT
            if (this.x + this.BB.radius > PARAMS.CANVAS_WIDTH) {
                this.direction = Direction.LEFT;
            } else {
                this.velocity.x += this.moveFunction(VELOCITY.REGULAR, Movement.RIGHT);
                let amplitude = 100;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.SIN);
            }
        }

        if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - 200) {
            this.velocity.y -= 1;
            this.y -= 1;
        }

        if (this.BB.top < -200) this.velocity.y = -this.velocity.y;

        if (this.moveTimer > 10000) this.moveTimer = 1;  // Reset move timer so not to overflow.

        // Update sprite position.
        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;
        this.bulletPattern(300, 250, 20);

        if (this.y >= PARAMS.CANVAS_HEIGHT) {
            this.removeFromWorld = true;
        }
    };

    updateBB() {
        const radius = 70;
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

    /**
     * Controls the firing mechanism for minions. There are two different firing modes based on the location
     * of the minion along the y-coordinate. There is a regular firing pattern in which the minion will fire
     * at the regular fireInterval rate that is specified in milliseconds. If comes within a certain distance
     * of the bottom of the canvas then the firing interval is dependent on  fireIntervalSpecial.
     * @param distance from the bottom of the canvas.
     * @param fireInterval regular fire interval.d
     * @param fireIntervalSpecial fire interval when minion comes within a certain distance of the bottom of canvas.
     */
    bulletPattern(distance, fireInterval, fireIntervalSpecial) {
        this.endTimer = Date.now();
        this.elapsedTime = this.startTimer - this.endTimer;

        if (this.elapsedTime % 50 === 0) this.animationType = 1; // Change animation every 50 milliseconds

        // Special fire interval.
        if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - distance && this.elapsedTime % fireIntervalSpecial === 0) {
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height - 15, 1));
            this.animationType = 0;
        }
        // Regular fire interval.
        else if (this.elapsedTime % fireInterval === 0) {
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2 + 20, this.y + this.height - 5, 1 / 2));
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2 - 20, this.y + this.height - 5, 1 / 2));
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2 + 12, this.y + this.height - 15, 1 / 2));
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2 - 12, this.y + this.height - 15, 1 / 2));
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height, 1 / 2));
            this.game.addBullet(new CthulhuMinionBullet(this.game, this.x + this.width / 2, this.y + this.height - 30, 1 / 2));
            this.animationType = 0;
        }
    };
}
