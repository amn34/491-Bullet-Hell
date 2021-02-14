class Level {
    constructor(game) {
        this.game = game;
        this.life = 3;
        this.totalLife = 3;
        this.shield = 0;
        this.level = {};

        //reset the state of the game and remove all entities 
        game.entities.backgrounds = [];
        game.entities.enemies = [];
        game.entities.particles = [];
        game.entities.bullets = [];
        game.entities.powerups = [];
        game.entities.player = new Player(this.game);
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        PARAMS.INVINCIBLE = document.getElementById("invincible").checked;
        const seconds = this.game.timer.getGameTime();
        //checks the level entity-creation map to see if there are units to spawn
        if (this.level[seconds]) {
            //spawns all the entities that should be created at this time-stamp
            this.level[seconds].forEach(enemy => {
                this.game.addEnemy(enemy);
            });
            this.level[seconds] = [];
        }

        if (this.life === 0) {
            this.game.reset();
        }
    };

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(210, 720, 310, 30);
        this.shield == 0 ? ctx.fillStyle = "red" : ctx.fillStyle = "blue";
        ctx.fillRect(215, 725, 300 - 100 * (this.totalLife - this.life), 20);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(315, 720);
        ctx.lineTo(315, 750);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(415, 720);
        ctx.lineTo(415, 750);
        ctx.stroke();
    };
}
