
class SpreadRobot extends Enemy {
    constructor(game, x, y, direction) {
        const scale = 3;
        const width = 32;
        const height = 28;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/finger_gun_dude.png");
        this.loadAnimations();
        this.animationIndex = 0;

        this.life = 15;
        this.canShoot = 0;
        this.angle = 0.5;
        this.direction = direction;

        this.threshHold = 100;
        this.score = 200;
    };

    loadAnimations() {
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));
        // Idle Animation
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false));
        // Finger 1 
        this.animations.push(new Animator(this.sprite, 0, 32, this.width, this.height, 0.3, 1, 0, false, false));
        // Finger 2
        this.animations.push(new Animator(this.sprite, 32, 32, this.width, this.height, 0.3, 1, 0, false, false));
    };

    draw(ctx) {
        super.draw(ctx);
        this.animations[this.animationIndex].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (this.animationIndex === 1) {
            this.animations[0] = new Animator(this.sprite, 0, 0, this.width, this.height, 3, 1, 0, false, false);
        } else if (this.animationIndex === 2) {
            this.animations[1] = new Animator(this.sprite, 0, 32, this.width, this.height, 0.3, 1, 0, false, false);
        } else {
            this.animations[2] = new Animator(this.sprite, 32, 32, this.width, this.height, 0.3, 1, 0, false, false);
        }

        if (this.animations[this.animationIndex].isDone()) {
            this.animationIndex = (this.animationIndex + 1) % 3;
        }
    };

    update() {
        this.updateBB();
        super.checkCollision(this.game.entities.bullets);

        this.canShoot++;



        if (this.canShoot == 45) {
            console.log(this.angle);
            //let center = this.x + (this.width / 2);
            let center = this.x + 57;

            //let change = -0.2;
            // let dx = Math.cos(this.angle / 2);
            // let dy = Math.sin(this.angle / 2);
            let dx = Math.cos(Math.PI * (this.angle));
            let dy = Math.sin(Math.PI * (this.angle));
            // let dx = Math.cos(Math.PI * (0.2));
            // let dy = Math.sin(Math.PI * (0.2));

            this.game.addBullet(new RobotBullet(this.game, center, this.y + this.height * 3, dx * 3, dy * 3, 1));
            this.game.addBullet(new RobotBullet(this.game, center, this.y + this.height * 3, dx * 4, dy * 4, 1));
            this.game.addBullet(new RobotBullet(this.game, center, this.y + this.height * 3, dx * 6, dy * 6, 1));
            this.canShoot = 0;


            //change the direction for the next shot
            const LEFT = 0;
            const RIGHT = 1;

            if (this.direction == LEFT) {
                this.angle += 0.1;
                if (this.angle >= 0.8) {
                    this.direction = RIGHT;
                }
            } else {
                this.angle -= 0.1;
                if (this.angle <= 0.2) {
                    this.direction = LEFT;
                }
            }


        }

    };

    updateBB() {
        const radius = 57;
        super.updateBB(radius);
    };
}

class RobotBullet extends Bullet {
    constructor(game, x, y, dx, dy, scale) {
        const radius = 10;
        const bulletSpeed = 20;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.dx = dx;
        this.dy = dy;
    };

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.checkBounds();
        this.updateBB(10);
    };
}