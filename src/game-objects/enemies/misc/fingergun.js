
class FingerGunDude extends Enemy {
    constructor(game, x, y) {
        const scale = 3;
        const width = 32;
        const height = 28;

        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/finger_gun_dude.png");

        this.canShoot = 0;
        this.threshHold = 100;
        this.animationIndex = 0;

        this.life = 10;
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
            this.game.addBullet(new FingerGunDudeBullet(this.game, center, this.y + this.height * 3, 1));
            this.animations[0] = new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false);
        } else if (this.animationIndex === 2) {
            let center = this.x + (this.width * 3 / 1.5);
            this.game.addBullet(new FingerGunDudeBullet(this.game, center, this.y + this.height * 3, 1));
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
        super.checkCollision(this.game.entities.bullets);
    }
}

class FingerGunDudeBullet extends Bullet {
    constructor(game, x, y, scale) {
        const width = 10;
        const height = 30;
        const bulletSpeed = 5;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, width, height, bulletSpeed, bulletType);
    }

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);
        
        if(PARAMS.DEBUG) {
            this.drawBB(ctx);
        }
    }

    update() {
        this.y += this.bulletSpeed;
        this.x += Math.sin(this.y * this.bulletSpeed / 90) * 4;
        super.update();
    }
}