class Player {
    constructor(game) {
        // Sprite and animation for the player
        this.sprite = ASSET_MANAGER.getAsset("./res/player.png");
        this.animations = [];

        // The movespeed for the player unnormalized (you move faster diagonally)
        this.moveSpeed = 3;
        this.moveSpeedSlow = 1.5;
        this.speedX = 0;
        this.speedY = 0;
        this.game = game;

        //size
        this.width = 18;
        this.height = 21;
        this.scale = 3;
        this.center = (this.width * this.scale / 2);

        // The starting coordinates
        this.x = PARAMS.WIDTH / 2 - (this.width * this.scale / 2);
        this.y = 740;



        // how many hits left before death
        // 3 = full health | 2 = 2 hits left | 1 = 1 hits left | 0 = dead
        this.life = 3;
        this.totalLife = 3;
        this.shield = 0;

        // Take damage then decrease until we reach 0 before taking damage again
        this.timeInvincible = 80;
        this.canTakeDamage = true;

        // currently has a powerup
        // 0 = powerup, 1 = no powerup
        this.powerup = 0;

        // Can shoot once 20 ticks have passed
        this.canShoot = 0;
        this.fireRate = 20;

        // Stores the angles (in degrees) the bullets will travel in
        // 0 - right, 90 - up, 180 - left, 270 - down
        this.bulletAngles = [90];
        this.companions = 0;

        // The damage the player does to an enemy
        this.damage = 1;

        // Additional States from the power up picked
        // Use these so we can always reset the stats of the player easily when needed
        this.fireRateFromPowerUp = 0;
        //this.powerFromPowerUp = 0;
        this.bulletSpeedFromPowerUp = 0;
        // this.healthFromPowerUp = 0;
        this.shieldFromPowerUp = 0;
        this.projectilesFromPowerUp = 0;

        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.animations[0] = [];
        this.animations[1] = [];
        this.animations[2] = [];

        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));

        // All lives + powerup
        this.animations[0].push(new Animator(this.sprite, 6, 5, this.width, this.height, 4, 0.1, 14, false, true));

        // All lives no powerup
        this.animations[0].push(new Animator(this.sprite, 6, 37, this.width, this.height, 4, 0.1, 14, false, true));

        // 2 lives + powerup
        this.animations[1].push(new Animator(this.sprite, 6, 69, this.width, this.height, 4, 0.1, 14, false, true));

        // 2 lives no powerup
        this.animations[1].push(new Animator(this.sprite, 6, 101, this.width, this.height, 4, 0.1, 14, false, true));

        // 1 life powerup
        this.animations[2].push(new Animator(this.sprite, 6, 133, this.width, this.height, 4, 0.1, 14, false, true));

        // 1 life no powerup
        this.animations[2].push(new Animator(this.sprite, 6, 165, this.width, this.height, 4, 0.1, 14, false, true));
    }


    draw(ctx) {
        let animationIndex = this.life == 0 ? 0 : this.totalLife - this.life;

        if(!this.canTakeDamage) {
            ctx.globalAlpha = 0.35;
        }

        this.animations[animationIndex][this.powerup].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        ctx.globalAlpha = 1.0;

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.beginPath();
            ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    update() {
        const transitioning = this.updateTransition();
        if (transitioning) {
            return;
        }

        this.game.slow ? this.calculateSpeed(this.moveSpeedSlow) : this.calculateSpeed(this.moveSpeed);

        this.x += this.speedX;
        if (this.speedX < 0) {
            this.x = Math.max(0, this.x);
        } else {
            this.x = Math.min(PARAMS.WIDTH - (this.width * this.scale), this.x);
        }

        this.y += this.speedY;
        if (this.speedY < 0) {
            this.y = Math.max(0, this.y);
        } else {
            this.y = Math.min(PARAMS.HEIGHT - (this.width * this.scale), this.y);
        }

        this.speedX *= 0.5;
        this.speedY *= 0.5;

        if (!this.canTakeDamage) {
            if (this.timeInvincible <= 0) {
                this.canTakeDamage = true;
                this.timeInvincible = 80;
            } else {
                this.timeInvincible--;
            }
        }

        this.canShoot++;
        if (this.canShoot >= (this.fireRate - this.fireRateFromPowerUp)) {
            let xCenter = this.x + (this.width * this.scale / 2);
            let yCenter = this.y + (this.height * this.scale / 2);
            this.bulletAngles.forEach(angle => {
                this.game.addBullet(new PlayerBullet(this.game, xCenter, yCenter, 1, this.damage, angle, line));
            });

            this.canShoot = 0;
        }

        this.updateBB();
        this.checkCollision(this.game.entities.enemies);
        this.checkCollision(this.game.entities.bullets);
        this.checkCollision(this.game.entities.powerups);
    }

    updateTransition() {

        //if the player is in the start transition mode
        if (this.game.entities.level.startTransition) {
            const targetY = 590;
            if (this.y >= targetY) {
                this.y -= Math.min(this.y - targetY, 3);
                //end transition when the player is in position
                if (this.y <= targetY) {
                    this.game.entities.level.startTransition = false;
                    this.game.entities.level.startLevel();
                }
            }
            return true; //exit to prevent user control
        } else if (this.game.entities.level.endTransition) {
            //first move the player to the center, then make them go up offscreen
            const targetX = PARAMS.WIDTH / 2 - (this.width * this.scale / 2);
            const targetY = -100;
            if (this.x !== targetX) {
                this.x += Math.min(Math.max(targetX - this.x, -3), 3);
            } else if (this.y >= targetY) {
                this.y -= 5
                if (this.y <= targetY) {
                    this.game.entities.level.endTransition = false;
                }
            }
            return true; //exit to prevent user control
        } else {
        }
        return false;
    }

    calculateSpeed(speed) {
        this.speedX -= this.game.left ? speed : 0;
        this.speedX += this.game.right ? speed : 0;

        this.speedY -= this.game.up ? speed : 0;
        this.speedY += this.game.down ? speed : 0;
    }

    /**
     * Checks if the player has collided with any of the enemies 
     * or enemy bullets in the game. 
     * @param {List[Object]} entities 
     */
    checkCollision(entities) {
        let player = this;
        let collideWithEnemyBullet = (entity) => {
            return entity instanceof Bullet && entity.bulletType == 1;
        }

        let collideWithEnemy = (entity) => {
            return entity instanceof Enemy;
        }

        let collideWithPowerup = (entity) => {
            return entity instanceof PowerUp;
        }

        entities.forEach(entity => {
            if (entity.BB && player.BB.collide(entity.BB)) {
                if (collideWithEnemyBullet(entity) || collideWithEnemy(entity)) {
                    if (this.canTakeDamage) {
                        ASSET_MANAGER.playAsset("./res/sfx/Hit.wav");
                        this.canTakeDamage = false;

                        if (!PARAMS.INVINCIBLE) {
                            // Remove 1 shield regardless of the damage of the enemy bullet
                            if (this.shield) {
                                this.shield--;
                                this.game.entities.level.shield = this.shield;
                            } else {
                                this.life = this.life > 0 ? this.life - 1 : 0;
                                this.game.entities.level.life = this.life;
                            }
                        }
                    }

                    if (collideWithEnemyBullet(entity)) {
                        entity.destroy();
                    }
                } else if (collideWithPowerup(entity)) {
                    ASSET_MANAGER.playAsset("./res/sfx/PickUp.mp3");
                    this.handlePowerUp(entity);
                    entity.destroy();
                }
            }
        });
    }

    updateBB() {
        //this.BB = new BoundingBox(this.x + 19, this.y + 18, this.width, this.height);
        const xCenter = this.x + (this.width * this.scale / 2);
        const yCenter = this.y + (this.height * this.scale / 2);
        const radius = 12;
        this.BB = new BoundingCircle(xCenter + 1, yCenter - 2, radius);
    };

    handlePowerUp(entity) {
        const len = this.bulletAngles.length;
        switch (entity.constructor) {
            case IncreaseFireRatePowerUp:
                const increase = (this.fireRate - this.fireRateFromPowerUp) * 0.15;
                this.fireRateFromPowerUp += this.fireRateFromPowerUp + increase > 13 ? 0 : increase;
                this.handleGameMenu('res/powerups/fire_rate_pu.png', 'Fire Rate', 'Increases player fire rate')
                break;
            case IncreaseHealthPowerUp:
                this.life += this.life < this.totalLife ? 1 : 0;
                this.game.entities.level.life = this.life;
                this.handleGameMenu('res/powerups/health_pu.png', 'Player Health', 'Restores one bar of player health')
                break;
            case IncreasePowerPowerUp:
                this.damage++;
                this.game.entities.level.damage = this.damage;
                this.handleGameMenu('res/powerups/power_pu.png', 'Damage', 'Increases damage against bosses')
                break;
            case IncreaseShieldPowerUp:
                this.shield += 1;
                this.game.entities.level.shield = this.shield;
                this.handleGameMenu('res/powerups/shield_pu.png', 'Shield', 'Grants player a stackable shield')
                break;
            case AdditionalProjectilePowerUp:
                if (len === 1) this.bulletAngles.push(this.bulletAngles[0] + 20, this.bulletAngles[0] - 20);
                else if (len != 17) this.bulletAngles.push(this.bulletAngles[len - 2] + 20, this.bulletAngles[len - 1] - 20);
                else this.bulletAngles.push(this.bulletAngles[len - 1] - 20);
                this.handleGameMenu('res/powerups/ap1_pu.png', 'Bullet', 'Increases number of player projectiles')
                break;
            case CompanionPowerUp:
                // Do not allow more than 2 companions
                if (this.companions > 1) break;

                // add the first companion to the players left, and the second to the players right
                if (this.companions === 0) this.game.addPowerup(new Companion(this.game, this, true));
                else this.game.addPowerup(new Companion(this.game, this, false));
                this.companions++;

                // Problem displaying altPlayer png since it is a sprite and not a single image
                this.handleGameMenu('res/altPlayer.png', 'Companion', 'Assists you in defeating enemies with homing shots')
                break;
            /*
            case MultipleProjectilePowerUp:
                if (len === 1) {
                    this.bullets.push(this.bullets[0] - 15, this.bullets[0] + 15, this.bullets[0] - 30, this.bullets[0] + 30);
                } else if (len + 4 < 10) {
                    this.bullets.push(this.bullets[len - 2] - 15, this.bullets[len - 1] + 15, this.bullets[len - 2] + 30, this.bullets[len - 1] + 30);
                }
                break;
            */
            default:
                break;
        }
    }

    handleGameMenu(src, title, desc) {
        document.querySelector('#pu-img').src = src;
        document.querySelector('#pu-title').innerText = title;
        document.querySelector('#pu-desc').innerText = desc;
    }
}

class Companion {
    constructor(game, player, left) {
        this.sprite = ASSET_MANAGER.getAsset("./res/altPlayer.png");
        this.animation = new Animator(this.sprite, 0, 1, 32, 30, 8, 0.1, 0, false, true);
        
        this.frameWidth = 32;
        this.frameHeight = 30;
        this.scale = 1;

        this.width = this.frameWidth * this.scale;
        this.height = this.frameHeight * this.scale;

        this.game = game;
        this.player = player;
        this.x = player.x;
        this.y = player.y;
        this.left = left;
        
        this.speedX = 0;
        this.speedY = 0;
        this.moveSpeed = 3;

        // Can shoot once this reaches 60
        this.canShoot = 0;
        this.threshHold = 60;

        this.damage = 0.5;
        this.updateBB();
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.beginPath();
            ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    update() {
        // Get the center of the player
        const playerXCenter = this.player.x + this.player.width / 2;
        const playerYCenter = this.player.y + this.player.height / 2;

        // determine if the companion goes to the left or right of the player
        // refactor later to add acceleration / drag for the companion
        if (this.left) {
            this.x = playerXCenter - 80;
            this.y = playerYCenter + 40;
        } else {
            this.x = playerXCenter + 80;
            this.y = playerYCenter + 40;
        }

        if (this.canShoot === this.threshHold) {
            this.canShoot = 0;
            this.game.addBullet(new CompanionBullet(this.game, this.x + (this.height * this.scale) / 2, this.y, 1, this.damage))
        }
        
        this.canShoot++;
        this.updateBB();
    }

    updateBB() {
        const xCenter = this.x + (this.width / 2);
        const yCenter = this.y + (this.height / 2);
        const radius = 12;
        this.BB = new BoundingCircle(xCenter, yCenter, radius);
    };
}

class PlayerBullet extends Bullet {
    constructor(game, x, y, scale, damage, angle, callback) {
        const radius = 10;
        const bulletSpeed = 12;
        const bulletType = 2; //player bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.damage = damage;

        this.spritesheet = ASSET_MANAGER.getAsset("./res/bullet.png");
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 0.2, 0, false, true));

        this.angle = angle;
        this.callback = callback;
    }

    update() {
        this.callback(this);
        this.checkBounds();
        this.updateBB();
    }

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'Red';
        ctx.fill();

        // var radial = context.createRadialGradient(startX, startY, startRadius, endX, endY, endRadius);
        // create radial gradient
        var radial = ctx.createRadialGradient(this.BB.xCenter, this.BB.yCenter, this.BB.radius - 10, this.BB.xCenter, this.BB.yCenter, this.BB.radius - 1);
        
        // dark green
        radial.addColorStop(0, '#015115');
        // green
        radial.addColorStop(1, '#33f45d');

        ctx.fillStyle = radial;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (PARAMS.DEBUG) this.drawBB(ctx);
    }

}

class CompanionBullet extends Bullet {
    constructor(game, x, y, scale, damage) {
        const radius = 7;
        const bulletSpeed = 4;
        const bulletType = 2;
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.damage = damage;
        this.target = null;
        this.timeToLive = 200;

        this.dx = 0;
        this.dy = 0;
    }

    update() {
        // If we have a target, chase it down until we hit it
        if (this.target) {
            const targetX = this.target.x + (this.target.width * this.target.scale / 2);
            const targetY = this.target.y + (this.target.height * this.target.scale / 2);

            const flipX = targetX < this.x;
            const flipY = targetY < this.y;

            // The distance between the bulelt and the enemy
            const distX = Math.abs(this.x - targetX);
            const distY = Math.abs(this.y - targetY);
            
            // The angle we must follow to hit the target
            const angle = Math.atan(distY / distX);

            this.dx = Math.cos(angle) * this.bulletSpeed;
            this.dy = Math.sin(angle) * this.bulletSpeed;
            
            // Reverse the direction the bullet travels in if we overshot it
            if (flipX) this.dx *= -1;
            if (flipY) this.dy *= -1;

            this.x += this.dx;
            this.y += this.dy;
        } else {

            // find the closest target using mahattan distanace
            let enemies = this.game.entities.enemies;
            for(let i=0; i<enemies.length; i++) {
                // if we have not picked a target yet, set it to the first enemy we find
                if (i === 0) this.target = enemies[i];
                else {
                    // Use manhattan distance to find the current closest enemy
                    // we use the center coordinates of the enemies so the bullets will not clip the top right corner missing all the shots
                    const potentialTarget = enemies[i];
                    
                    // Current targets center position
                    const targetXCenter = this.target.x + (this.target.width * this.target.scale / 2);
                    const targetYCenter = this.target.y + (this.target.height * this.target.scale / 2);
                    
                    // Potential targets center position
                    const potentialTargetXCenter = potentialTarget.x + (potentialTarget.width * potentialTarget.scale / 2);
                    const potentialTargetYCenter = potentialTarget.y + (potentialTarget.height * potentialTarget.scale / 2);
                    
                    // Distances between targets
                    const distFromCurrentTarget = Math.abs(this.x - targetXCenter) + Math.abs(this.y - targetYCenter);
                    const distFromPotentialTarget = Math.abs(this.x - potentialTargetXCenter) + Math.abs(this.y - potentialTargetYCenter);
                    
                    // If the potential target is closer, make it the new target. Otherwise, keep the same target.
                    this.target =  distFromCurrentTarget > distFromPotentialTarget ? potentialTarget : this.target;
                }
            }
        }

        this.timeToLive--;
        this.checkBounds();
        this.updateBB();

        // Remove the bullet if there is no target
        if (this.target == null || this.target.removeFromWorld || this.timeToLive == 0) {
            this.removeFromWorld = true;
        }
    }

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'Yellow';
        ctx.fill();

        // create radial gradient
        var radial = ctx.createRadialGradient(this.BB.xCenter, this.BB.yCenter, this.BB.radius - 10, this.BB.xCenter, this.BB.yCenter, this.BB.radius - 1);
        
        // dark yellow
        radial.addColorStop(0, '#605B0E');

        // yellow
        radial.addColorStop(1, '#FEE12B');

        ctx.fillStyle = radial;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (PARAMS.DEBUG) this.drawBB(ctx);
    }
}
