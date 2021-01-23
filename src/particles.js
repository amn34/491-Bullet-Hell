class Particle {

    /**
     * 
     * @param {GameEngine} game - The game engine
     * @param {Number} x  - X position to place particle effect
     * @param {Number} y  - Y position to place particle effect
     * @param {Number} width - Width of particle effect
     * @param {Number} height - Height of particle effect
     * @param {Animator} animation - The animation of particle effect 
     * @param {Number} scale  - Image scaling to apply to particle sprite
     */
    constructor(game, x, y, width, height, animation, scale) {
        Object.assign(this, { game, x , y, width, height, animation, scale });
    }

    /**
     * Removes the animation from the game when it is complete. 
     */
    update() {
        if(this.animation.isDone()) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);   
    }

}

class BulletExplosion extends Particle {

    constructor(game, x, y) {
        const sprite = ASSET_MANAGER.getAsset("./res/explosion.png");
        const width = 15;
        const height = 15;
        const frameCount = 3;
        const animation = new Animator(sprite, 0, 0, width, height, frameCount, 0.03, 0, false, false);
        super(game, x, y, width, height, animation, 1);
    }
}