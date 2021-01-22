/**
 * Generic Bullet class. 
 * Sub-Classes should implement update() and draw()
 */
class Bullet {
    /**
     * 
     * @param {GameEngine} game - The Game Engine 
     * @param {Number} x - The X position to create the bullet
     * @param {Number} y - The Y position to create the bullet 
     * @param {Number} scale - The image scaling to apply to the bullet sprite
     * @param {Number} width - The width of the bullet
     * @param {Number} height - The height of the bullet 
     * @param {Number} bulletSpeed - The dy of the bullet 
     * @param {Number} bulletType - Type, {1: Enemy, 2: Player}
     */
    constructor(game, x, y, scale, width, height, bulletSpeed, bulletType) {
        Object.assign(this, {game, x, y, scale, width, height, bulletSpeed, bulletType});
        this.updateBB();
    }

    /**
     * Updates the bounding box and checks if the bullet should be removed 
     */
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
    }

    /**
     * Marks the bullet to be removed by the GameEngine if it leaves the bounds of the screen. 
     */
    checkBounds() {
        if (this.y > 760 || this.y < 0) {
            this.removeFromWorld = true;
        }
    }

    /**
     * Draws the bounding box of the bullet. 
     * @param {Context2D} ctx - 2D context of the canvas 
     */
    drawBB(ctx) {
        ctx.strokeStyle = 'Black';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class PlayerBullet extends Bullet {
    constructor(game, x, y, scale, damage) {
        const width = 10;
        const height = 30;
        const bulletSpeed = 12;
        const bulletType = 2; //player bullet
        super(game, x, y, scale, width, height, bulletSpeed, bulletType);
        this.damage = damage;
    }

    draw(ctx) {
        // Use yellow rectangles to keep the theme of the sprite
        ctx.fillStyle = "#F9DC5C";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);

        if(PARAMS.DEBUG) {
            this.drawBB(ctx);
        }
    }

    update() {
        this.y -= this.bulletSpeed;
        super.update();
    }
}

class AltPlayerBullet extends Bullet {
    constructor(game, x, y, scale, damage) {
        const width = 10;
        const height = 30;
        const bulletSpeed = 12;
        const bulletType = 2; //player bullet 
        super(game, x, y, scale, width, height, bulletSpeed, bulletType);
        this.damage = damage;
    }

    draw(ctx) {
        // Use yellow rectangles to keep the theme of the sprite
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);

        if(PARAMS.DEBUG) {
            this.drawBB(ctx);
        }

    }

    update() {
        this.y -= this.bulletSpeed;
        super.update();
    }
}


class BrainBullet extends Bullet {
    constructor(game, x, y, scale) {
        const width = 10;
        const height = 30;
        const bulletSpeed = 3;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, width, height, bulletSpeed, bulletType);
    }

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x, this.y, this.width * this.scale, this.height * this.scale);

        if (PARAMS.DEBUG) {
            this.drawBB(ctx);
        }
    }

    update() {
        this.y += this.bulletSpeed;
        super.update();
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