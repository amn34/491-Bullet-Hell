class PlayerBullet {
    constructor(game, x, y, size) {
        Object.assign(this, {game, x, y, size});

        // Use these variables to stop bullets from colliding with player
        this.playerX = this.x;
        this.playerY = this.y;

        // Use these variables to define the player bullet
        this.width = 10;
        this.height = 30;
        this.xOffSet = 23;
        this.yOffSet = 24;
        this.bulletSpeed = 12;
    }

    draw(ctx) {
        // Use yellow rectangles to keep the theme of the sprite
        ctx.fillStyle = "#F9DC5C";
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

/**
 * Class that creates enemy bullets. 
 */
class EnemyBullet {
    /**
     * 
     * @param {Object} game - The Game Engine 
     * @param {Number} x - The X position to create the bullet
     * @param {Number} y - The Y position to create the bullet
     * @param {Number} scale - The image scaling to apply on the bullet image
     * @param {Function(bullet)} bulletUpdate - Function to update the bullet
     * @param {Function(ctx, bullet)} bulletDraw - Function to draw the bullet
     */
    constructor(game, x, y, scale, bulletUpdate, bulletDraw) {
        Object.assign(this, {game, x, y, scale, bulletUpdate, bulletDraw});

        this.width = 10;
        this.height = 30;

        this.bulletSpeed = 3;
        
        this.updateBB();
    }

    /**
     * Draws the bullet to the screen using the passed in draw function. 
     * @param {Object} ctx - 2D context of the canvas 
     */
    draw(ctx) {
        this.bulletDraw(ctx, this);
    }

    /**
     * Updates the bullet using the passed in update function.
     * Updates bounding box.    
     */
    update() {
        this.bulletUpdate(this);
        this.updateBB();
    }

    /**
     * Updates the Bounding Box of the bullet to match its updated position. 
     */
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    };

    /**
     * Marks the bullet to be removed by the GameEngine 
     */
    destroy() {
        this.removeFromWorld = true;
        console.log('destroying item');
    }
}

class BrainBullet {
    constructor(game, x, y, scale) {
        Object.assign(this, {game, x, y, scale});

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