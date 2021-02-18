class CthulhuArrow extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 54;
        const height = 62;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuTriangle.png");
        this.animation = 0;
        this.velocity = {x : 0, y : 0};

        this.life = 1;
        this.score = 100;

        this.startLaser = Math.random() * 600;

        this.canShoot = 0;
        this.threshHold = 75;
        this.bulletPattern = [downSpiral, downSpiralReverse];

        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 1, 0.2,
            0, false, true));
        this.animations.push(new Animator(this.sprite, this.width, 0, this.width, this.height, 1, 0.2,
            0, false, true));
    }

    update() {
        const TICK = this.game.clockTick;
        const VELOCITY = { SUPER_FAST: 250, FAST: 100, REGULAR: 75, SLOW: 50, SUPER_SLOW: 25 }

        this.velocity.y = 0;
        this.velocity.y += VELOCITY.REGULAR;

        if (this.BB.yCenter > this.startLaser) {
            this.velocity.y += VELOCITY.SUPER_FAST;
            this.animation = 1;
        }

        this.y += this.velocity.y * TICK * this.scale;

        this.canShoot++;
        this.fireBulletPattern();
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);
        super.remove();
    }

    fireBulletPattern() {
        if (this.canShoot === this.threshHold) {
            this.canShoot = 0;
            let center = this.x + (this.width / 2) * this.scale;

            this.bulletPattern.forEach(bPattern => {
                this.game.addBullet(new CthulhuArrowBullet(this.game, center, this.y + this.height, 1, bPattern));
            });
        }
    }

    updateBB() {
        const radius = 30;
        super.updateBB(radius);
    }

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}


class CthulhuArrowBullet extends Bullet {
    constructor(game, x, y, scale, callback) {
        const radius = 10;
        const bulletSpeed = 2;
        const bulletType = 1;
        super(game, x, y, scale, radius, bulletSpeed, bulletType)
        this.callback = callback;
        this.angle = 0;
        this.y = y;
    }

    update() {
        this.updateBB();
        super.checkBounds();
        this.y += this.bulletSpeed;

        this.angle += 0.025;
        this.callback(this);
    }

    updateBB() {
        const radius = 10;
        super.updateBB(radius);
    }

}
