class Brain {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.frameWidth = 32;
        this.frameHeight = 32;

        this.sprite = ASSET_MANAGER.getAsset("./res/brain.png");
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animations = [];

        this.animations.push(new Animator(this.sprite, 0, 0, this.frameWidth, this.frameHeight, 12, 0.2, 0, false, true));

        this.scale = 3;

        this.width = this.frameWidth * this.scale;
        this.height = this.frameHeight * this.scale;

        this.startX = this.x;
        this.startY = this.y;

        // Can shoot once this reaches 100
        this.canShoot = 9;
        this.threshHold = 200;
        this.damage = 1;

        // Determines the path of the enemy
        this.goRight = true;

        this.updateBB();
    }

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    update() {

        this.canShoot++;

        if (this.canShoot === this.threshHold) {
            let center = this.x + (this.width / 2);
            this.game.addEntity(new BrainBullet(this.game, center, this.y + this.height, 1));
            this.canShoot = 0;
        }


        if (this.x <= this.startX + 50 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === this.startX + 50 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 50 && !this.goRight) {
            this.goRight = !this.goRight;
        }

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

}

/**
 * Chululu sprite has potential to be a boss level sprite. Default animation is hovering while tentacles move.
 */
class Cthulhu {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.sprite = ASSET_MANAGER.getAsset("./res/cthulhuSprite.png");

        this.startX = this.x;
        this.startY = this.y;

        // TODO - May update to include more animations later on depending on damage received, attack moves, etc.
        this.animations = [];
        // Default floating animation.
        this.animations.push(new Animator(this.sprite, 0, 0, 270, 245, 10, 0.3,
            false, false, true));

        this.scale = 1;
        this.goRight = true;

        // Functionality to control the spawning of minions.
        this.minion_count = 0;
        this.startTimer = Math.floor(Date.now()/1000);
        this.oldTime = 0;
    };

    /**
     * Cthulhu update method. Controls it's own movement. Functionality also provided to allow control of the
     * the Cthulhu minion.
     */
    update() {
        if (this.x <= this.startX + 125 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === this.startX + 125 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 125 && !this.goRight) {
            this.goRight = !this.goRight;
        }


        // Functionality to control the spawning of minions.
        this.endTimer = Math.floor(Date.now()/1000);
        this.elapsedTime = this.endTimer - this.startTimer;
        // Spawn the minion.
        this.spawnMinion(this.x, this.y , 3, 15);
    };


    /**
     * Controls the spawning of spawning of minions. spawnFrequency controls how quickly minions are spawned. It is
     * based on timer in seconds (e.g. spawnTime = 1, 1 minion spawned every second. spawnTime = 10, 1 minion spawned
     * every 10 seconds).
     *
     * @param xStart starting spawn x coordinate
     * @param yStart starting spawn y coordinate
     * @param spawnFrequency spawn interval.
     * @param spawnMax max number of minions to spawn.
     */
    spawnMinion(xStart, yStart, spawnFrequency, spawnMax) {
        if (this.minion_count < spawnMax) {
            if (this.elapsedTime % spawnFrequency === 0 && this.elapsedTime !== this.oldTime) {
                this.spawn(xStart, yStart)
                this.oldTime = this.elapsedTime; // Keep track of old time (to ensure seconds)
            }
        }
    };

    /**
     * Spawns a Cthulhu minion and increments the number of spawns.
     * @param x coordinate for minion spawn location.
     * @param y coordinate for minion spawn location.
     */
    spawn(x, y) {
        this.game.addEntity(new CthulhuMinion(this.game, x, y));
        this.minion_count++;
   };

    /**
     * Chutulu draw method. Single default animation.
     * @param ctx context.
     */
    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    };
}

class EyeMinion {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.sprite = ASSET_MANAGER.getAsset("./res/eye.png");

        this.animations = [];
        this.animations.push(new Animator(this.sprite, 0, 0, 32, 32, 8, 0.2, 0, false, true));

        this.scale = 3;

        this.updateBB();
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

    update() {
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    };
}


class FingerGunDudue {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 32;
        this.height = 28;

        this.startX = this.x;
        this.startY = this.y;

        this.sprite = ASSET_MANAGER.getAsset("./res/finger_gun_dude.png");
        this.animations = [];

        this.canShoot = 0;
        this.threshHold = 100;
        this.animationIndex = 0;

        // Determines the path of the enemy
        this.goRight = true;
        this.scale = 3;

        this.loadAnimations();
    }

    loadAnimations() {
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        // Idle Animation
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false));
        // Finger 1 
        this.animations.push(new Animator(this.sprite, 0, 32, this.width, this.height, 0.3, 1, 0, false, false));
        // Finger 2
        this.animations.push(new Animator(this.sprite, 32, 32, this.width, this.height, 0.3, 1, 0, false, false));
    }

    draw(ctx) {
        this.animations[this.animationIndex].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (this.animationIndex === 1) {
            let center = this.x + (this.width / 1.5);
            this.game.addEntity(new FingerGunDudeBullet(this.game, center, this.y + this.height * 3, 1));
            this.animations[0] = new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false);
        } else if (this.animationIndex === 2) {
            let center = this.x + (this.width * 3 / 1.5);
            this.game.addEntity(new FingerGunDudeBullet(this.game, center, this.y + this.height * 3, 1));
            this.animations[1] = new Animator(this.sprite, 0, 32, this.width, this.height, 0.3, 1, 0, false, false);
        } else {
            this.animations[2] = new Animator(this.sprite, 32, 32, this.width, this.height, 0.3, 1, 0, false, false);
        }

        if (this.animations[this.animationIndex].isDone()) {
            this.animationIndex = (this.animationIndex + 1) % 3;
        }
    }

    update() {
        if (this.x <= this.startX + 50 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x === this.startX + 50 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 50 && !this.goRight) {
            this.goRight = !this.goRight;
        }
    }
}

/**
 * Cthulhu Minion that has two different default animations: Float & Attack. Movement is automatic based on a time
 * interval. Spawning of this character is controlled by the Cthulhu class.
 *
 * The number of minions spawned and the interval at which they are spawned are controlled by the Cthulhu class
 * update method.
 */
class CthulhuMinion {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.spriteFloat = ASSET_MANAGER.getAsset("./res/cth_minion_float.png");
        this.spriteAttack = ASSET_MANAGER.getAsset("./res/cth_minion_attack.png");
        this.animations = [];

        this.scale = 1;

        this.animationType = 1;
        this.velocity = {x: 0, y: 0};

        // Starting direction of minion movement.
        this.direction = 3;
        // Timer for Sin/Cos functions.
        this.moveTimer = 0;

        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        this.animations.push(new Animator(this.spriteFloat, 0, 0, 96, 80, 5, 0.2,
            0, false, true));
        this.animations.push(new Animator(this.spriteAttack, 0, 0, 96, 80, 6, 0.2,
            0, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 96, 80);
    };

    update() {

        // Enums objects for legibility.
        const Mode = { FLOAT: 0, ATTACK: 1}; // Two animations types (uses attack only so far - will likely remove).
        // Keep track of direction
        const Direction = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
        // Movement type (tied to moveFunction).
        const Movement = { UP: 0, DOWN: 1, LEFT: 0, RIGHT: 1, SQUARED: 2, SIN: 3, COS: 4};

        // Physics
        const TICK = this.game.clockTick;
        // Velocity based on movement
        const VELOCITY = { SUPERFAST: 600, FAST: 400, REGULAR: 100, SLOW: 50, SUPERSLOW: 10}

        // Sprite velocity
        this.velocity.x = 0;
        this.velocity.y = 0;

        // SPRITE MOVING LEFT ( and or UP/DOWN)
        if (this.velocity.x <= 0 && this.direction === Direction.LEFT) { // moving left
            if (this.BB.left < 0) { // check if we need to reverse
                this.direction = Direction.RIGHT; // Switch directions and go right.
            } else { // We know we are going left.

                // x axis movement.
                this.velocity.x += this.moveFunction(VELOCITY.REGULAR, Movement.UP);
                // y axis movement.
                let amplitude = 100;
                let angularFrequency = 1/120;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.COS);
            }
        }

        // SPRITE MOVING RIGHT ( and or UP/DOWN)
        else if (this.velocity.x >= 0 && this.direction === Direction.RIGHT) { // moving right
            if (this.BB.right > PARAMS.CANVAS_WIDTH) { // check if we have gone off the right side of canvas
                this.direction = Direction.LEFT; // go left
            } else { // We know we are going right.

                // x axis movement.
                this.velocity.x += this.moveFunction(VELOCITY.REGULAR, Movement.RIGHT);
                // y axis movement.
                let amplitude = 200;
                let angularFrequency = 1/60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer++), Movement.SIN);
            }
        }

       /*
       Controls the behavior of the minion [400] pixels before the bottom of the canvas.
       Minions will begin to slow down until they reverse.
        */
       if (this.BB.bottom > PARAMS.CANVAS_HEIGHT - 400) {
            this.velocity.y -= 1 ;
            this.y -= 1;
       }

        // Reset movetimer arbitrarily so not to overflow.
        if (this.moveTimer > 10000)
            this.moveTimer = 1;

        // Update sprite position.
        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;
        this.updateBB();
    };

    /**
     * Controls the velocity of the sprite.
     * @param velocity
     * @param direction
     * @returns {number|*|number}
     */
    moveFunction(velocity, direction) {
        let movementFunctions = [-velocity, velocity, velocity*velocity, -Math.sin(velocity), Math.cos(velocity)];
        return movementFunctions[direction];
    };

    draw(ctx) {
        this.animations[this.animationType].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "RED";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

}