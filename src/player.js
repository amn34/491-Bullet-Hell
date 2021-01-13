class Player {
    constructor(game) {

        // Sprite and animation for the player
        this.sprite = ASSET_MANAGER.getAsset("./../res/arcadeShooterSpritex32.png");
        this.animations = [];

        // The movespeed for the player unnormalized (you move faster diagonally)
        this.moveSpeed = 7;
        this.game = game;

        // The starting corrdinates
        this.x = 300;
        this.y = 300;

        // how many hits left before death
        // 0 - full health, 
        // 1 - 2 hits left, 
        // 2 - 1 hit left, 
        // 3 - dead
        this.life = 0
        
        // currently has a powerup
        // 0 - powerup, 1 - no powerup
        this.powerup = 1;

        // Can shoot once this reaches 10
        this.canShoot = 9;
        this.threshHold = 10;
        this.damage = 5;

        this.loadAnimations()           
    }

    loadAnimations() {
        this.animations[0] = [];
        this.animations[1] = [];
        this.animations[2] = [];
        
        // Animator(this.sprite, x, y, width, height, framesCount, duration, padding, reverse, loop));

        // All lives + powerup
        this.animations[0].push(new Animator(this.sprite, 6, 5, 18, 21, 4, 0.1, 14, false, true));
        
        // All lives no powerup
        this.animations[0].push(new Animator(this.sprite, 6, 37, 18, 21, 4, 0.1, 14, false, true));

        // 2 lives + powerup
        this.animations[1].push(new Animator(this.sprite, 6, 69, 18, 21, 4, 0.1, 14, false, true));
        
        // 2 lives no powerup
        this.animations[1].push(new Animator(this.sprite, 6, 101, 18, 21, 4, 0.1, 14, false, true));

        // 1 life powerup
        this.animations[2].push(new Animator(this.sprite, 6, 133, 18, 21, 4, 0.1, 14, false, true));
        
        // 1 life no powerup
        this.animations[2].push(new Animator(this.sprite, 6, 165, 18, 21, 4, 0.1, 14, false, true));
    }


    draw(ctx) {
        this.canShoot++;
        if (this.canShoot == this.threshHold) {
            this.game.addEntity(new PlayerBullet(this.game, this.x, this.y, 1, this.x, this.y));
            this.canShoot = 0;
        }
        
        this.animations[this.life][this.powerup].drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        
        // Static player animations for testing

        // this.animations[0][0].drawFrame(this.game.clockTick, ctx, 0, 0, 4);
        // this.animations[0][1].drawFrame(this.game.clockTick, ctx, 100, 0, 4);

        // this.animations[1][0].drawFrame(this.game.clockTick, ctx, 0, 100, 4);
        // this.animations[1][1].drawFrame(this.game.clockTick, ctx, 100, 100, 4);

        // this.animations[2][0].drawFrame(this.game.clockTick, ctx, 0, 200, 4);
        // this.animations[2][1].drawFrame(this.game.clockTick, ctx, 100, 200, 4);
    }

    update() {
        // pressing wasd or arrow keys moves the player
        //  Note: this moves all players at the same time
        this.x -= this.game.left ? this.moveSpeed : 0;
        this.x += this.game.right ? this.moveSpeed : 0;

        this.y -= this.game.up ? this.moveSpeed : 0;
        this.y += this.game.down ? this.moveSpeed : 0;
    }
}


class AltPlayer {
    constructor(game) {
        this.sprite = ASSET_MANAGER.getAsset("./../res/altPlayer.png");
        this.animation = new Animator(this.sprite, 0, 1, 32, 30, 1, 0.1, 0, false, true);
        this.moveSpeed = 7;
        this.game = game;
        this.x = 400;
        this.y = 300;

        // how many hits left before death
        // 0 - full health, 
        // 1 - 2 hits left, 
        // 2 - 1 hit left, 
        // 3 - dead
        this.life = 0
        
        // currently has a powerup
        // 0 - powerup, 1 - no powerup
        this.powerup = 1;

        // Can shoot once this reaches 10
        this.canShoot = 69;
        this.threshHold = 70;

        this.damage = 35;
    }

    draw(ctx) {
        this.canShoot++;
        if (this.canShoot == this.threshHold) {
            this.game.addEntity(new AltPlayerBullet(this.game, this.x, this.y, 1, this.x, this.y));
            this.canShoot = 0;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);        
    }

    update() {
        this.x -= this.game.left ? this.moveSpeed : 0;
        this.x += this.game.right ? this.moveSpeed : 0;

        this.y -= this.game.up ? this.moveSpeed : 0;
        this.y += this.game.down ? this.moveSpeed : 0;
    }
}
