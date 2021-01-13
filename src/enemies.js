class Brain {
    constructor(game) {
        this.sprite = ASSET_MANAGER.getAsset("./../res/enemy.png");
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        this.animation = new Animator(this.sprite, 0, 1, 31, 30, 1, 0.5, 0, false, true);

        this.game = game;
        this.x = 50;
        this.y = 50

        // Can shoot once this reaches 100
        this.canShoot = 9;
        this.threshHold = 200;
        this.damage = 1;

        // Determines the path of the enemy
        this.goRight = true;
    }

    draw(ctx) {
        this.canShoot++;

        if (this.canShoot == this.threshHold) {
            this.game.addEntity(new BrainBullet(this.game, this.x, this.y, 1));
            this.canShoot = 0;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    }

    update() {
        if (this.x <= 100 && this.goRight) {
            this.x++;
        } else {
            this.x--;
        }

        if (this.x == 100 && this.goRight) {
            this.goRight = !this.goRight;

        } else if (this.x == 0 && !this.goRight) {
            this.goRight = !this.goRight;
        }
    }
}