
class HomingRobot extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 32;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/robothand.png");
        this.loadAnimations();
        this.animationIndex = 0;

        this.life = 10;
        this.canShoot = 0;
        this.threshHold = 100;

        this.score = 200;
    };

    loadAnimations() {
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        // Idle Animation
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 11, 0.2, 0, false, false));

        // Shooting animation
        this.animations.push(new Animator(this.sprite, this.width * 11, 0, this.width, this.height, 11, 0.2, 0, false, false));
    };

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animationIndex].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (this.animationIndex === 1) {
            this.animations[0] = new Animator(this.sprite, 0, 0, this.width, this.height, 11, 0.2, 0, false, false);
        } else {
            this.animations[1] = new Animator(this.sprite, this.width * 11, 0, this.width, this.height, 11, 0.2, 0, false, false);
        }

        if (this.animations[this.animationIndex].isDone()) {
            this.animationIndex = (this.animationIndex + 1) % 2;
        }
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

        this.canShoot++;

        if (this.canShoot == 175) {
            let center = this.x + (this.width / 1.5);
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, -5, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, -4, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, -3, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, -2, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, -1, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, 0, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, 1, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, 2, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, 3, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, 4, -5, 1));
            this.game.addBullet(new HomingBullet(this.game, center, this.y + this.height * 3, 5, -5, 1));
            this.canShoot = 0;
        }

    };

    updateBB() {
        const radius = 47;
        super.updateBB(radius);
    };
}

class HomingBullet extends Bullet {
    constructor(game, x, y, dx, dy, scale) {
        const radius = 10;
        const bulletSpeed = 15;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.dx = dx;
        this.dy = dy;
        this.timer = 0;
        this.homing = false;
    };

    update() {
        //set the bullets to move towards the player
        if (this.timer <= 45) {
            this.timer++;
        }
        if (this.timer == 30) {
            this.dx = 0;
            this.dy = 0;
            this.homing = true;
        } else if (this.timer == 45) {
            const targetX = this.game.entities.player.x;
            const targetY = this.game.entities.player.y;

            const flip = targetX < this.x;
            const distX = Math.abs(this.x - targetX);
            const distY = Math.abs(this.y - targetY);
            const angle = Math.atan(distY / distX);

            this.dx = Math.cos(angle) * this.bulletSpeed;
            if (flip) {
                this.dx = -this.dx;
            }
            this.dy = Math.sin(angle) * this.bulletSpeed;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.checkBounds();
        this.updateBB(10);
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
        if (this.homing) {
            ctx.fillStyle = 'Red';

            // create radial gradient
            var radial = ctx.createRadialGradient(this.BB.xCenter, this.BB.yCenter, this.BB.radius - 10, this.BB.xCenter, this.BB.yCenter, this.BB.radius - 1);

            // light red
            radial.addColorStop(1, '#f4e8e9');

            // dark red
            radial.addColorStop(0, 'red');

            ctx.fillStyle = radial;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        } else {
            ctx.fillStyle = 'Pink';
        }

        ctx.fill();
        if (PARAMS.DEBUG) {
            this.drawBB(ctx);
        }
    }

}