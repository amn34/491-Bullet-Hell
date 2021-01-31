class Enemy {
    constructor(game, x, y, width, height, scale) {
        Object.assign(this, { game, x, y, width, height, scale });
        this.animations = [];
        this.startX = this.x;
        this.startY = this.y;

        this.damage = 1;
        this.life = 1;
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
                    //destroys the bullet
                    entity.destroy();
                    //creates a particle effect
                    this.game.addParticle(new BulletExplosion(this.game, entity.x, entity.y));
                    this.life -= entity.damage;
                    if (this.life <= 0 || this.life === NaN) {
                        this.chanceForDrop();
                        this.destroy();
                    }
                }
            }
        });
    }

    chanceForDrop() {
        let powerups = [[IncreaseFireRatePowerUp, "./res/powerups/fire_rate_pu.png"], [AdditionalProjectilePowerUp, "./res/powerups/ap1_pu.png"],
        [IncreaseHealthPowerUp, "./res/powerups/health_pu.png"], [IncreasePowerPowerUp, "./res/powerups/power_pu.png"],
        [IncreaseShieldPowerUp, "./res/powerups/shield_pu.png"]];

        // if roll === 1 drop a powerup
        let roll = Math.floor(Math.random() * 100);

        if (roll <= 15) {
            let ind = Math.floor(Math.random() * powerups.length);
            this.game.addPowerup(new powerups[ind][0](this.game, this.x, this.y, powerups[ind][1]));
        }

    }

}