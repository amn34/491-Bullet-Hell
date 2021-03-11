class Brain extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/brain.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 12, 0.2, 0, false, true));

        // Can shoot once this reaches 100
        this.life = 250;
        this.canShoot = 9;
        this.threshHold = 200;

        this.boss = true;

        this.startTimer = Math.floor(Date.now() / 100);
        this.oldTime = 0;
        this.totalLife = this.life;

        this.score = 250;

        this.canShoot = 0;
        this.threshHold = 48;

        this.currentPattern = downSpiral;
        this.currentBullet = BrainBullet;
        this.moveDown = false;
        this.goUp = false;
        this.angle = 0;
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        super.draw(ctx);

        let health = 100;

        let distanceFromHead = 10;

        ctx.fillStyle = "black";
        ctx.fillRect(this.x - 1, this.y - 1 - distanceFromHead, health + 1, 7);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - distanceFromHead, - health * (this.totalLife / this.totalLife - this.life / this.totalLife) + health, 5);
        ctx.stroke();
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

        this.canShoot++;

        if (this.canShoot >= this.threshHold) {

            let center = this.x + (this.width / 2) * this.scale;
            
            if (this.currentPattern == downSpiral) {
                this.game.addBullet(new this.currentBullet(this.game, center, this.y + this.height, 1, downSpiral));
                this.game.addBullet(new this.currentBullet(this.game, center, this.y + this.height, 1, downSpiralReverse));
            } else if (this.currentPattern != archimedes) {
                this.game.addBullet(new this.currentBullet(this.game, this.angle, center, this.y + this.height, 1, this.currentPattern));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 60, center, this.y + this.height, 1, this.currentPattern));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 120, center, this.y + this.height, 1, this.currentPattern));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 180, center, this.y + this.height, 1, this.currentPattern));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 240, center, this.y + this.height, 1, this.currentPattern));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 300, center, this.y + this.height, 1, this.currentPattern));
            } else {
                this.game.addBullet(new this.currentBullet(this.game, this.angle, center, this.y + this.height, 1, archimedes));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 60, center, this.y + this.height, 1, archimedes));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 120, center, this.y + this.height, 1, archimedes));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 180, center, this.y + this.height, 1, archimedes));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 240, center, this.y + this.height, 1, archimedes));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 300, center, this.y + this.height, 1, archimedes));

                this.game.addBullet(new this.currentBullet(this.game, this.angle, center, this.y + this.height, 1, archimedesReverse));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 60, center, this.y + this.height, 1, archimedesReverse));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 120, center, this.y + this.height, 1, archimedesReverse));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 180, center, this.y + this.height, 1, archimedesReverse));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 240, center, this.y + this.height, 1, archimedesReverse));
                this.game.addBullet(new this.currentBullet(this.game, this.angle + 300, center, this.y + this.height, 1, archimedesReverse));
            }

            this.angle = (this.angle + 12) % 360;
            this.canShoot = 0;
        }

        if (this.x === this.startX + 70 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x === this.startX - 70 && !this.goRight) {
            this.goRight = !this.goRight;
        }


        if (this.moveDown && this.y < this.startY + 230) {
            this.y += 2;
        }

        if (this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        // Timer that determines spawning intervals.
        this.endTimer = Math.floor(Date.now() / 100);
        this.elapsedTime = this.endTimer - this.startTimer; // elapsed time in centiseconds.

        // Functionality to control the spawning of minions.
        this.minion_count = 0;
        this.spawnFrequency = 0;
        this.spawnMax = 0;

        // Controls regular minion spawn behavior. Dependent on Brain life remaining.
        if (this.life >= this.totalLife * 3 / 4) {
            this.spawnFrequency = 10;
            this.spawnMax = 5;
        } else if (this.life >= this.totalLife * 1 / 2) {
            this.spawnFrequency = 9;
            this.spawnMax = 5;

            // when the brain gets 50% health change firing pattern
            this.currentBullet = MadBrainBullet;
            this.currentPattern = sideHelix;

            // allow the brain to take up the center of the screen
            this.moveDown = true;

        } else if (this.life >= this.totalLife * 1 / 4) {
            this.spawnFrequency = 8;
            this.spawnMax = 5;

            this.currentPattern = line;
            this.threshHold = 36;
        } else if (this.life >= this.totalLife * 1 / 8) { // Life very low - go crazy.
            this.spawnFrequency = 5; // Ultimate
            this.spawnMax = 5; // Ultimate

            this.currentPattern = archimedes;
            this.threshHold = 30;
        }

        // Randomize x-coordinate for minion.
        this.xMinionPosition = Math.floor((Math.random() * PARAMS.WIDTH - 96) + 96);

        this.spawnMinion(this.xMinionPosition, - 100, this.spawnFrequency, this.spawnMax);
        super.remove();
    };

    updateBB() {
        const radius = 50;
        super.updateBB(radius);
    };

    spawnMinion(xStart, yStart, spawnFrequency, spawnMax) {
        if (this.minion_count < spawnMax) {
            if (this.elapsedTime % spawnFrequency === 0 && this.elapsedTime !== this.oldTime) {
                this.spawn(xStart, yStart)
                this.oldTime = this.elapsedTime;
            }
        }
    };

    spawn(x, y) {
        this.game.addEnemy(new EyeMinion(this.game, x, y));
        this.game.entities.level.totalEnemies++;
        this.minion_count++;
    };
}

class BrainBullet extends Bullet {
    constructor(game, x, y, scale, callback) {
        const radius = 15;
        const bulletSpeed = 3;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.callback = callback;
        this.angle = 0;
    };

    update() {
        this.updateBB();
        super.checkBounds();
        this.angle += 0.04;
        this.callback(this);
    };

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    };

}

class MadBrainBullet extends Bullet {
    constructor(game, angle, x, y, scale, callback) {
        const radius = 15;
        const bulletSpeed = 5;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.callback = callback;
        this.angle = angle;
        this.timeToLive = 800;
    };

    update() {
        this.updateBB();
        super.checkBounds();
        // this.angle = this.boss.angle;
        // this.angle += 0.04;
        this.timeToLive--;
        // this.x = this.boss.x;
        // this.y = this.boss.y;
        this.callback(this);

        if (this.timeToLive == 0) this.removeFromWorld = true;
    };

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    };
}
