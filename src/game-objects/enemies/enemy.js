class Enemy {
    constructor(game, x, y, width, height, scale) {
        Object.assign(this, { game, x, y, width, height, scale });
        this.animations = [];
        this.startX = this.x;
        this.startY = this.y;

        this.damage = 1;
        this.life = 1;
        this.boss = false;
        // Determines the path of the enemy
        this.goRight = true;
        this.score = 100;
    }

    draw(ctx) {
        if (PARAMS.DEBUG && this.BB) {
            ctx.strokeStyle = 'Red';
            ctx.beginPath();
            ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    updateBB(radius) {
        this.BB = new BoundingCircle(this.x + (this.width * this.scale / 2), this.y + (this.height * this.scale / 2), radius);
    }

    destroy() {
        this.removeFromWorld = true;
    }

    remove() {
        if (this.y > PARAMS.HEIGHT) {
            this.removeFromWorld = true;
        }
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
                    ASSET_MANAGER.playAsset("./res/sfx/Shoot.wav");
                    //destroys the bullet
                    entity.destroy();
                    //creates a particle effect
                    this.game.addParticle(new BulletExplosion(this.game, entity.x, entity.y));
                    this.life -= entity.damage;
                    if (this.life <= 0 || this.life === NaN) {
                        if ( !(this instanceof CthulhuMinion) ) this.chanceForDrop();
                        this.destroy();

                        if (this instanceof NoseMinion) {
                            this.shootOnDeath();
                        }

                        this.game.score += this.score;
                        this.game.displayScore.innerHTML = this.game.score;
                    }
                }
            }
        });
    }

    chanceForDrop() {
        let player = this.game.entities.player;
        let powerups = [[IncreasePowerPowerUp, "./res/powerups/power_pu.png"]];

        if (player.life !== 3) powerups.push([IncreaseHealthPowerUp, "./res/powerups/health_pu.png"]);
        if (player.bulletAngles.length !== 18) powerups.push([AdditionalProjectilePowerUp, "./res/powerups/ap1_pu.png"]);
        if (player.shield < 2) powerups.push([IncreaseShieldPowerUp, "./res/powerups/shield_pu.png"]);
        if (player.fireRateFromPowerUp < 12) powerups.push([IncreaseFireRatePowerUp, "./res/powerups/fire_rate_pu.png"]);
        if (player.companions !== 2) powerups.push([CompanionPowerUp, "./res/altPlayer.png"]);

        // if roll === 1 drop a powerup
        let roll = Math.floor(Math.random() * 100);
        if (roll <= 10) {
            let ind = Math.floor(Math.random() * powerups.length);
            this.game.addPowerup(new powerups[ind][0](this.game, this.x, this.y, powerups[ind][1]));
        }

    }

}