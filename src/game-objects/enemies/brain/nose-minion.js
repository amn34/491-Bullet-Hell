
class NoseMinion extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/nose.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 1, 1, 0, false, true));

        // For movement
        this.velocity = { x: 0, y: 0 };
        // Starting direction of minion movement.
        this.direction = 3;
        // Timer for Sin/Cos functions.
        this.moveTimer = 0;

        this.life = 5;
        this.startTimer = Date.now()
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        super.draw(ctx);

        this.score = 50;
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

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
                this.velocity.y += this.moveFunction(VELOCITY.SUPERSLOW, Movement.DOWN);
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
        const radius = 27;
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

    shootOnDeath() {
        let xCenter = this.x + (this.width / 2) * this.scale;
        let yCenter = this.y + (this.height / 2) * this.scale;
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 0, line)); 
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 30, line));
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 60, line)); 
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 90, line)); 
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 120, line)); 
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 150, line)); 
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 180, line));
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 210, line)); 
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 240, line));  
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 270, line));
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 300, line));
        this.game.addBullet(new NoseBullet(this.game, xCenter, yCenter, 1, 330, line));  
    }
}

class NoseBullet extends Bullet {
    constructor(game, x, y, scale, angle, callback) {
        const radius = 15;
        const bulletSpeed = 3;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.callback = callback;
        this.angle = angle;
    };

    update() {
        this.updateBB();
        super.checkBounds();
        this.callback(this);
    };

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    };

}