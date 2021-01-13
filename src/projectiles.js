class PlayerBullet {
    constructor(game, x, y, size, playerX, playerY) {
        Object.assign(this, {game, x, y, size, playerX, playerY});

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
        if (this.y > 675 || this.y < 0 || (this.x == this.playerX && this.y == this.playerY)) {
            this.removeFromWorld = true;
        }
    }
}


class AltPlayerBullet {
    constructor(game, x, y, size, playerX, playerY) {
        Object.assign(this, {game, x, y, size, playerX, playerY});

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
        if (this.y > 675 || this.y < 0 || (this.x == this.playerX && this.y == this.playerY)) {
            this.removeFromWorld = true;
        }
    }
}


class BrainBullet {
    constructor(game, x, y, size) {
        Object.assign(this, {game, x, y, size});

        this.width = 10;
        this.height = 30;
        this.xOffSet = 40;
        this.yOffSet = 80;

        this.bulletSpeed = 3;
    }

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x + this.xOffSet, this.y + this.yOffSet, this.width * this.size, this.height * this.size);
    }

    update() {
        this.y += this.bulletSpeed;

        // If the bullet leaves the screen remove it 
        if (this.y > 675 || this.y < 0) {
            this.removeFromWorld = true;
        }
    }
}
