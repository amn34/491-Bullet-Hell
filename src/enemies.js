class Enemy {
    constructor(game, x, y, width, height, scale) {
        Object.assign(this, {game, x, y, width, height, scale});
        this.animations = [];
        this.startX = this.x;
        this.startY = this.y;
        
        this.damage = 1;
        this.life = 100;
        // Determines the path of the enemy
        this.goRight = true;
    }

    draw(ctx) {
        if (PARAMS.DEBUG && this.BB) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

    destroy() {
        this.removeFromWorld = true;
    }

    /**
     * Checks if the player has collided with any of the enemies 
     * or enemy bullets in the game. 
     * @param {List[Object]} entities 
     */
    checkCollision(entities) {
        let enemy = this;
        let collideWithPlayerBullet = (entity) => {
            return entity instanceof Bullet && entity.bulletType === 2;
        }

        entities.forEach(entity => {
            if (entity.BB && enemy.BB.collide(entity.BB)) {
                if (collideWithPlayerBullet(entity)) {
                    // Bullet already destroyed when colliding with enemy, 
                    // would be redundant to add here again.
                    if (this.life <= 0 || this.life === NaN) {
                        this.chanceForDrop();
                        this.destroy();
                    } else {
                        this.life -= entity.damage;
                    }
                    
                } 
            }
        });
    }

    chanceForDrop() {
        let powerups = [[IncreaseFireRatePowerUp, "./res/fire_rate_pu.png"], [AdditionalProjectilePowerUp, "./res/ap1_pu.png"],
                        [IncreaseHealthPowerUp, "./res/health_pu.png"], [MultipleProjectilePowerUp, "./res/ap2_pu.png"],
                        [IncreasePowerPowerUp, "./res/power_pu.png"], [IncreaseShieldPowerUp, "./res/shield_pu.png"]];
        
        // if roll === 1 drop a powerup
        let roll = Math.floor(Math.random() * 10);

        if (roll <= 2) {
            let ind = Math.floor(Math.random() * powerups.length);
            this.game.addEntity(new powerups[ind][0](this.game, this.x, this.y, powerups[ind][1]));
        }

    } 

}

class Brain extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.sprite = ASSET_MANAGER.getAsset("./res/brain.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 12, 0.2, 0, false, true));

        // Can shoot once this reaches 100
        this.life = 200;
        this.canShoot = 9;
        this.threshHold = 200;
        this.updateBB();
    }

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        super.draw(ctx);
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

        super.updateBB();
        super.checkCollision(this.game.entities);
    }

}

/**
 * Chululu sprite has potential to be a boss level sprite. Default animation is hovering while tentacles move.
 */
class Cthulhu extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 270;
        const height = 245;
        super(game, x, y, width, height, scale);

        // TODO - May update to include more animations later on depending on damage received, attack moves, etc.
        // Default floating animation.
        this.sprite = ASSET_MANAGER.getAsset("./res/cthulhuSprite.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 10, 0.3,
            false, false, true));

        // Functionality to control the spawning of minions.
        this.minion_count = 0;
        this.startTimer = Math.floor(Date.now()/1000);
        this.oldTime = 0;
        this.life = 20000;
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
        super.updateBB();
        super.checkCollision(this.game.entities);
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
        super.draw(ctx);
    };
}

class EyeMinion extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/eye.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 8, 0.2, 0, false, true));
        this.life = 50;
        super.updateBB();
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        super.draw(ctx);
    };

    update() {
        super.updateBB();
        super.checkCollision(this.game.entities);
    };
}


class FingerGunDude extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 28;

        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/finger_gun_dude.png");

        this.canShoot = 0;
        this.threshHold = 100;
        this.animationIndex = 0;

        this.life = 200;
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

        super.draw(ctx);
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

        super.updateBB();
        super.checkCollision(this.game.entities);
    }
}

/**
 * Cthulhu Minion that has two different default animations: Float & Attack. Movement is automatic based on a time
 * interval. Spawning of this character is controlled by the Cthulhu class.
 *
 * The number of minions spawned and the interval at which they are spawned are controlled by the Cthulhu class
 * update method.
 */
class CthulhuMinion extends Enemy {
    constructor(game, x, y) {
        super(game, x, y);

        this.spriteFloat = ASSET_MANAGER.getAsset("./res/cth_minion_float.png");
        this.spriteAttack = ASSET_MANAGER.getAsset("./res/cth_minion_attack.png");

        this.width = 96;
        this.height = 80;
        this.scale = 1;

        this.animationType = 1;
        this.velocity = {x: 0, y: 0};

        // Starting direction of minion movement.
        this.direction = 3;
        // Timer for Sin/Cos functions.
        this.moveTimer = 0;

        this.life = 50;

        this.loadAnimations();
        super.updateBB();
    };

    loadAnimations() {
        this.animations.push(new Animator(this.spriteFloat, 0, 0, this.width, this.height, 5, 0.2,
            0, false, true));
        this.animations.push(new Animator(this.spriteAttack, 0, 0, this.width, this.height, 6, 0.2,
            0, false, true));
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
        super.updateBB();
        super.checkCollision(this.game.entities);
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
        super.draw(ctx);
        this.animations[this.animationType].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    };

}