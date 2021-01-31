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
