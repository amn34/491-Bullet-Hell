class aBoss extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/brain.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 12, 0.2, 0, false, true));

        // Can shoot once this reaches 100
        this.life = 20;
        // this.canShoot = 9;
        // this.threshHold = 200;

        this.boss = true;

        this.startTimer = Math.floor(Date.now() / 100);
        this.oldTime = 0;
        this.totalLife = this.life;

        this.score = 250;

        this.canShoot = 0;
        this.threshHold = 36;

        this.goRight = false;
        this.angle = 0;
        this.angleIncrement = 15;
        this.currentPattern = sideHelix;
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

        if (this.totalLife / 3 > this.life) {
            this.currentPattern = figureEight;
            this.threshHold = 16;

        } else if (this.totalLife / 2 > this.life){
            this.currentPattern = line;
            this.threshHold = 26;
        }


        this.canShoot++;

        if (this.canShoot >= this.threshHold) {
            let center = this.x + (this.width / 2) * this.scale;
            // start with sideHelix, then lineRotate
            this.game.addBullet(new aBossBullet(this.game, this.angle, center, this.y + this.height, 1, this.currentPattern));
            this.game.addBullet(new aBossBullet(this.game, this.angle + 60, center, this.y + this.height, 1, this.currentPattern));
            this.game.addBullet(new aBossBullet(this.game, this.angle + 120, center, this.y + this.height, 1, this.currentPattern));
            this.game.addBullet(new aBossBullet(this.game, this.angle + 180, center, this.y + this.height, 1, this.currentPattern));
            this.game.addBullet(new aBossBullet(this.game, this.angle + 240, center, this.y + this.height, 1, this.currentPattern));
            this.game.addBullet(new aBossBullet(this.game, this.angle + 300, center, this.y + this.height, 1, this.currentPattern));

            this.canShoot = 0;
            this.angle = (this.angle + 12) % 360;
        }

        if (this.x === this.startX + 50 && this.goRight) {
            this.goRight = !this.goRight;
        } else if (this.x === this.startX - 50 && !this.goRight) {
            this.goRight = !this.goRight;
        }

        if (this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        // Timer that determines spawning intervals.
        this.endTimer = Math.floor(Date.now() / 100);
        this.elapsedTime = this.endTimer - this.startTimer; // elapsed time in centiseconds.
       
        // this.angle = (this.angle + 1) % 360;
        super.remove();
    };

    updateBB() {
        const radius = 50;
        super.updateBB(radius);
    };

}

class aBossBullet extends Bullet {
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
