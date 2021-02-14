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

        // The starting corrdinates
        this.x = 328;
        this.y = 640;

        //size
        this.width = 18;
        this.height = 21;
        this.scale = 3;
        this.center = (this.width * this.scale / 2);

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

        // The array bullets the player will shoot
        // Store the positions relative to the center
        this.bullets = [this.center];

        // The damage the player does to an enemy
        this.damage = 1;

        // Additional States from the power up picked
        // Use these so we can always reset the stats of the player easily when needed
        this.fireRateFromPowerUp = 0;
        this.powerFromPowerUp = 0;
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
        this.animations[animationIndex][this.powerup].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.beginPath();
            ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    update() {

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
            this.bullets.forEach(bulletPos => {
                this.game.addBullet(new PlayerBullet(this.game, this.x + bulletPos, this.y, 1, this.damage + this.powerFromPowerUp));
            });

            this.canShoot = 0;
        }


        this.updateBB();
        this.checkCollision(this.game.entities.enemies);
        this.checkCollision(this.game.entities.bullets);
        this.checkCollision(this.game.entities.powerups);
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
                        this.canTakeDamage = false;

                        // Remove 1 shield regardless of the damage of the enemy bullet
                        if (this.shield) {
                            this.shield--;
                            this.game.entities.level.shield = this.shield;
                        } else {
                            this.life = this.life > 0 ? this.life - 1 : 0;
                            this.game.entities.level.life = this.life;
                        }
                    }

                    if (collideWithEnemyBullet(entity)) {
                        entity.destroy();
                    }
                } else if (collideWithPowerup(entity)) {
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
        const len = this.bullets.length;
        switch (entity.constructor) {
            case IncreaseFireRatePowerUp:
                const increase = (this.fireRate - this.fireRateFromPowerUp) * 0.15;
                this.fireRateFromPowerUp += this.fireRateFromPowerUp + increase > 13 ? 0 : increase;
                this.handleGameMenu('res/powerups/fire_rate_pu.png', 'Fire Rate', 'Increases player fire rate')
                break;
            case IncreaseHealthPowerUp:
                this.life += this.life < this.totalLife ? 1 : 0;
                this.game.entities.level.life = this.life;
                this.handleGameMenu('res/powerups/health_pu.png', 'Player Health', 'Increases player health')
                break;
            case IncreasePowerPowerUp:
                this.powerFromPowerUp += 1;
                this.handleGameMenu('res/powerups/power_pu.png', 'Power Up', 'Increases player fire power')
                break;
            case IncreaseShieldPowerUp:
                this.shield += 1;
                this.game.entities.level.shield = this.shield;
                this.handleGameMenu('res/powerups/shield_pu.png', 'Shield', 'Increases player shield')
                break;
            case AdditionalProjectilePowerUp:
                if (len === 1) {
                    this.bullets.push(this.bullets[0] - 20, this.bullets[0] + 20);
                } else if (len + 2 < 10) {
                    this.bullets.push(this.bullets[len - 2] - 20, this.bullets[len - 1] + 20);
                }
                this.handleGameMenu('res/powerups/ap1_pu.png', 'Bullet', 'Increases number of player bullets')
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
        this.life = 0;

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

class PlayerBullet extends Bullet {
    constructor(game, x, y, scale, damage) {
        const radius = 10;
        const bulletSpeed = 12;
        const bulletType = 2; //player bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.damage = damage;

        this.spritesheet = ASSET_MANAGER.getAsset("./res/bullet.png");
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 0.2, 0, false, true));
    }

    update() {
        this.y -= this.bulletSpeed;
        this.checkBounds();
        this.updateBB();
    }

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    }

}


class AltPlayerBullet extends Bullet {
    constructor(game, x, y, scale, damage) {
        const width = 10;
        const height = 30;
        const bulletSpeed = 12;
        const bulletType = 2; //player bullet 
        super(game, x, y, scale, width, height, bulletSpeed, bulletType);
        this.damage = damage;
    }

    draw(ctx) {
        // Use yellow rectangles to keep the theme of the sprite
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);

        if (PARAMS.DEBUG) {
            this.drawBB(ctx);
        }

    }

    update() {
        this.y -= this.bulletSpeed;
        super.update();
    }
}
