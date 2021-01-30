class Level {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.life = 0;
        this.level = {};
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        const seconds = this.game.timer.getGameTime();
        //checks the level entity-creation map to see if there are units to spawn
        if (this.level[seconds]) {
            //spawns all the entities that should be created at this time-stamp
            this.level[seconds].forEach(entity => {
                this.game.addEntity(entity);
            });
            this.level[seconds] = [];
        }
    };

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(210, 720, 310, 30);
        ctx.fillStyle = "red";
        ctx.fillRect(215, 725, 300 - 100 * this.life, 20);
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

class CaveLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel();
    }

    createLevel() {
        this.level[0] = [
            // Add background first so everything fits on top
            new Background(this.game, 0, -760, "./res/cavebg.png"),
            new Background(this.game, 0, 0, "./res/cavebg.png"),
            new Player(this.game),
        ];
        this.level[1] = [
            new EyeMinion(this.game, 50, 0),
        ];
        this.level[2] = [
            new EyeMinion(this.game, 150, 0),
        ];
        this.level[3] = [
            new EyeMinion(this.game, 250, 0),
        ];
        this.level[4] = [
            new EyeMinion(this.game, 350, 0),
        ];
        this.level[5] = [
            new EyeMinion(this.game, 450, 0),
        ];
        this.level[6] = [
            new EyeMinion(this.game, 550, 0),
        ];
        this.level[7] = [
            new MouthMinion(this.game, 650, 0),
        ];
        this.level[9] = [
            new Brain(this.game, 200, 10),
        ];
        this.level[20] = [
            new MouthMinion(this.game, 100, 0),
            new MouthMinion(this.game, 350, 0),
            new MouthMinion(this.game, 600, 0),
        ];
        this.level[21] = [
            new NoseMinion(this.game, 300, 0),
        ];
        this.level[25] = [
            new Brain(this.game, 400, 10),
            new NoseMinion(this.game, 100, 0),
        ];
        this.level[30] = [
            new NoseMinion(this.game, 500, 0),
        ];
        this.level[35] = [
            new MouthMinion(this.game, 450, 0),
        ];
        this.level[37] = [
            new MouthMinion(this.game, 250, 0),
        ];
        this.level[39] = [
            new MouthMinion(this.game, 350, 0),
        ];
        this.level[40] = [
            new FingerGunDude(this.game, 250, 0),
        ];
        this.level[45] = [
            new FingerGunDude(this.game, 450, 0),
        ];
        this.level[48] = [
            new FingerGunDude(this.game, 350, 100),
        ];
        this.level[51] = [
            new Brain(this.game, 100, 10),
        ];
        this.level[55] = [
            new Brain(this.game, 500, 10),
        ];
        this.level[60] = [
            new MouthMinion(this.game, 100, 0),
        ];
        this.level[61] = [
            new MouthMinion(this.game, 600, 0),
        ];
        this.level[62] = [
            new MouthMinion(this.game, 200, 0),
        ];
        this.level[63] = [
            new MouthMinion(this.game, 500, 0),
        ];
        this.level[64] = [
            new MouthMinion(this.game, 300, 0),
        ];
        this.level[65] = [
            new MouthMinion(this.game, 400, 0),
        ];
        this.level[80] = [
            new Cthulhu(this.game, 300, 0),
        ];
    }
}
