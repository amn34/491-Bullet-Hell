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
     * @param {Number} radius - The radius of the bullet
     * @param {Number} bulletSpeed - The dy of the bullet 
     * @param {Number} bulletType - Type, {1: Enemy, 2: Player}
     */
    constructor(game, x, y, scale, radius, bulletSpeed, bulletType) {
        Object.assign(this, {game, x, y, scale, radius, bulletSpeed, bulletType});
        this.updateBB(radius);
    }

    /**
     * Updates the BoundingBox of the bullet to match its updated position. 
     */
    updateBB(radius) {
        this.BB = new BoundingCircle(this.x, this.y, radius);
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
        ctx.beginPath();
        ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw(ctx) {

        if(this.BB.xCenter - this.BB.radius <= 0 || this.BB.xCenter + this.BB.radius >= PARAMS.WIDTH) {
            return;
        }
        if(this.BB.yCenter - this.BB.radius <= 0 || this.BB.yCenter + this.BB.radius >= PARAMS.HEIGHT) {
            return;
        }


        ctx.beginPath();
        ctx.arc(this.BB.xCenter, this.BB.yCenter, this.BB.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'Red';
        ctx.fill();

        // var radial = context.createRadialGradient(startX, startY, startRadius, endX, endY, endRadius);
        // create radial gradient
        var radial = ctx.createRadialGradient(this.BB.xCenter, this.BB.yCenter, this.BB.radius - 10, this.BB.xCenter, this.BB.yCenter, this.BB.radius - 1);

        // light red
        radial.addColorStop(0, '#f4e8e9');

        // dark red
        radial.addColorStop(1, 'red');

        ctx.fillStyle = radial;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    
        if(PARAMS.DEBUG) {
            this.drawBB(ctx);
        }
    }

}
