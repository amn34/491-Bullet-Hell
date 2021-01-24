class Level {

    constructor(game) {
        this.game = game;
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

    draw(ctx) { };
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

            new EyeMinion(this.game, 50, 300),
            new EyeMinion(this.game, 150, 300),
            new EyeMinion(this.game, 250, 300),
            new EyeMinion(this.game, 350, 300),
            new EyeMinion(this.game, 450, 300),
            new EyeMinion(this.game, 550, 300),
            new EyeMinion(this.game, 650, 300),
            new EyeMinion(this.game, 750, 300),
        ];
        this.level[30] = [
            new Brain(this.game, 50, 50),
            new Brain(this.game, 150, 50),
            new Brain(this.game, 250, 50),
            new Brain(this.game, 350, 50),
            new Brain(this.game, 450, 50),
            new Brain(this.game, 550, 50),
            new Brain(this.game, 650, 50),
            new Brain(this.game, 750, 50),
        ];
        this.level[90] = [
            new FingerGunDude(this.game, 100, 50),
            new FingerGunDude(this.game, 300, 50),
            new FingerGunDude(this.game, 500, 50),
            new FingerGunDude(this.game, 200, 150),
            new FingerGunDude(this.game, 400, 150),
            new FingerGunDude(this.game, 600, 150),
        ];
        this.level[150] = [
            new Cthulhu(this.game, 250, 40)
        ];
        this.level[180] = [
            new Cthulhu(this.game, 150, 40)
        ];
    }
}
