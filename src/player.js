class Player {
    constructor(game) {
        // Sprite and animation for the player
        this.sprite = ASSET_MANAGER.getAsset("./res/arcadeShooterSpritex32.png");
        this.animations = [];

        // The movespeed for the player unnormalized (you move faster diagonally)
        this.moveSpeed = 3;
        this.speedX = 0;
        this.speedY = 0;
        this.game = game;

        // The starting corrdinates
        this.x = 328;
        this.y = 640;

        //size
        this.width = 18;
        this.height = 21;
        this.scale = 3;
        this.center = (this.width * this.scale / 2) - 3;

        // how many hits left before death
        // 0 = full health | 1 = 2 hits left | 2 = 1 hits left | 3 = dead
        this.life = 0;
        this.shield = 0;

        // currently has a powerup
        // 0 = powerup, 1 = no powerup
        this.powerup = 0;

        // Can shoot once 20 ticks have passed
        this.canShoot = 0;
        this.fireRate = 20;

        // The array bullets the player will shoot
        // Store the positions relative to the center
        this.bullets = [this.center];

        // The damage the player does to an enemy
        this.power = 5;

        // Additional States from the power up picked
        // Use these so we can always reset the stats of the player easily when needed
        this.fireRateFromPowerUp = 0;
        this.powerFromPowerUp = 0;
        this.bulletSpeedFromPowerUp = 0;
        this.healthFromPowerUp = 0;
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
        this.canShoot++;
        if (this.canShoot >= (this.fireRate - this.fireRateFromPowerUp)) {
            this.bullets.forEach(bulletPos => {
                this.game.addEntity(new PlayerBullet(this.game, this.x + bulletPos, this.y, 1, this.power + this.powerFromPowerUp));
            });
            // Go back to shooting 1 bullet
            //let center = this.x + this.center;
            // this.game.addEntity(new PlayerBullet(this.game, center, this.y, 1, this.power + this.powerFromPowerUp));
            this.canShoot = 0;
        }

        this.animations[this.life][this.powerup].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    update() {
        this.speedX -= this.game.left ? this.moveSpeed : 0;
        this.speedX += this.game.right ? this.moveSpeed : 0;

        this.speedY -= this.game.up ? this.moveSpeed : 0;
        this.speedY += this.game.down ? this.moveSpeed : 0;

        this.x += this.speedX;
        this.y += this.speedY;

        this.speedX *= 0.8;
        this.speedY *= 0.8;
        this.updateBB();
        this.checkCollision(this.game.entities);
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
                if (collideWithEnemyBullet(entity)) {
                    // Remove 1 shield regardless of the damage of the enemy bullet
                    if (this.shield) {
                        this.shield--;
                    } else {
                        this.life = (this.life + 1) % 3;
                    }
                    entity.destroy();
                } else if (collideWithPowerup(entity)) {
                    this.handlePowerUp(entity);
                    entity.destroy();
                } else if (collideWithEnemy(entity)) {
                    // console.log(entity);
                    this.life = (this.life + 1) % 3;
                }

            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x + 19, this.y + 18, this.width, this.height);
    };

    handlePowerUp(entity) {
        const len = this.bullets.length;
        switch (entity.constructor) {
            case IncreaseFireRatePowerUp:
                const increase = (this.fireRate - this.fireRateFromPowerUp) * 0.15;
                this.fireRateFromPowerUp += this.fireRateFromPowerUp + increase > 13 ? 0 : increase;
                break;
            case IncreaseHealthPowerUp:
                this.healthFromPowerUp -= this.life > 0 ? 1 : 0;
                break;
            case IncreasePowerPowerUp:
                this.powerFromPowerUp += 1;
                break;
            case IncreaseShieldPowerUp:
                this.shield += 1;
                break;
            case AdditionalProjectilePowerUp:
                if (len === 1) {
                    this.bullets.push(this.bullets[0] - 15, this.bullets[0] + 15);
                } else if (len + 2 < 10) {
                    this.bullets.push(this.bullets[len - 2] - 15, this.bullets[len - 1] + 15);
                }
                break;
            case MultipleProjectilePowerUp:
                if (len === 1) {
                    this.bullets.push(this.bullets[0] - 15, this.bullets[0] + 15, this.bullets[0] - 30, this.bullets[0] + 30);
                } else if (len + 4 < 10) {
                    this.bullets.push(this.bullets[len - 2] - 15, this.bullets[len - 1] + 15, this.bullets[len - 2] + 30, this.bullets[len - 1] + 30);
                }
                break;
            default:
                break;
        }
    }
}

class AltPlayer {
    constructor(game) {
        this.sprite = ASSET_MANAGER.getAsset("./res/altPlayer.png");
        this.animation = new Animator(this.sprite, 0, 1, 32, 30, 8, 0.1, 0, false, true);
        this.moveSpeed = 3;
        this.game = game;
        this.x = 400;
        this.y = 640;

        this.frameWidth = 32;
        this.frameHeight = 30;
        this.scale = 2;

        this.width = this.frameWidth * this.scale;
        this.height = this.frameHeight * this.scale;

        this.speedX = 0;
        this.speedY = 0;


        // how many hits left before death
        // 0 - full health, 
        // 1 - 2 hits left, 
        // 2 - 1 hit left, 
        // 3 - dead
        this.life = 0

        // currently has a powerup
        // 0 - powerup, 1 - no powerup
        this.powerup = 1;

        // Can shoot once this reaches 10
        this.canShoot = 69;
        this.threshHold = 70;

        this.damage = 2;
    }

    draw(ctx) {
        this.canShoot++;
        if (this.canShoot == this.threshHold) {
            let center = this.x + (this.width / 2) - 5;
            this.game.addEntity(new AltPlayerBullet(this.game, center, this.y, 1, this.damage));
            this.canShoot = 0;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }

    update() {
        this.speedX -= this.game.left ? this.moveSpeed : 0;
        this.speedX += this.game.right ? this.moveSpeed : 0;

        this.speedY -= this.game.up ? this.moveSpeed : 0;
        this.speedY += this.game.down ? this.moveSpeed : 0;

        this.x += this.speedX;
        this.y += this.speedY;

        this.speedX *= 0.8;
        this.speedY *= 0.8;
    }
}
