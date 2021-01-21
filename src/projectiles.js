/**
 * Generic Bullet class. 
 * Sub-Classes should implement update() and draw()
 */
class Bullet {
    /**
     * 
     * @param {Object} game - The Game Engine 
     * @param {Number} x - The X position to create the bullet
     * @param {Number} y - The Y position to create the bullet 
     * @param {Number} scale - The image scaling to apply to the bullet sprite
     * @param {Number} bulletType - Type, {1: Enemy, 2: Player}
     */
    constructor(game, x, y, scale, bulletType) {
        Object.assign(this, {game, x, y, scale, bulletType});
    }


    update() {
        this.checkBounds();
        this.updateBB();
    }

    /**
     * Updates the BoundingBox of the bullet to match its updated position. 
     */
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    };

    /**
     * Marks the bullet to be removed by the GameEngine. 
     */
    destroy() {
        this.removeFromWorld = true;
        console.log('destroying item');
    }

    /**
     * Marks the bullet to be removed by the GameEngine if it leaves the bounds of the screen. 
     */
    checkBounds() {
        if (this.y > 760 || this.y < 0) {
            this.removeFromWorld = true;
        }
    }
}

class PlayerBullet extends Bullet {
    constructor(game, x, y, scale) {

        super(game, x, y, scale);
        // Use these variables to define the player bullet
        this.width = 10;
        this.height = 30;
        this.bulletSpeed = 12;
        this.updateBB();
    }

    draw(ctx) {
        // Use yellow rectangles to keep the theme of the sprite
        ctx.fillStyle = "#F9DC5C";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

    update() {
        this.y -= this.bulletSpeed;
        super.update();
        console.log(this.x, this.y);
    }
}

class AltPlayerBullet {
    constructor(game, x, y, size) {
        Object.assign(this, {game, x, y, size});

        this.playerX = this.x;
        this.playerY = this.y;

        this.width = 10;
        this.height = 30;
        this.xOffSet = 27;
        this.yOffSet = 24;

        this.bulletSpeed = 12;
    }

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(this.x + this.xOffSet, this.y - this.yOffSet, this.width * this.size, this.height * this.size);
    }

    update() {
        this.y -= this.bulletSpeed;

        // If the bullet leaves the screen remove it 
        if (this.y > 740 || this.y < 0 || (this.x == this.playerX && this.y == this.playerY)) {
            this.removeFromWorld = true;
        }
    }
}

class BrainBullet extends Bullet {
    constructor(game, x, y, scale) {
        super(game, x, y, scale, 1);

        this.width = 10;
        this.height = 30;
        this.bulletSpeed = 3;
        this.updateBB();
    }

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

    update() {
        this.y += this.bulletSpeed;
        super.update();
    }
}


class FingerGunDudeBullet {
    constructor(game, x, y, scale) {
        Object.assign(this, {game, x, y, scale});

        this.width = 10;
        this.height = 30;

        this.bulletSpeed = 4;
        
        this.updateBB();
    }

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Black';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

    update() {
        this.y += this.bulletSpeed;
        this.x += Math.cos(this.y * this.bulletSpeed / 120);
        // If the bullet leaves the screen remove it 
        if (this.y > 760 || this.y < 0) {
            this.removeFromWorld = true;
        }

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    };

    destroy() {
        this.removeFromWorld = true;
        console.log('destroying item');
    }
}