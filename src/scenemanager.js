class SceneManager {
    constructor(game) {
        this.game = game
        this.buildLevel();
    };

    /**
     * Build the default level.
     */
    buildLevel() {
        // Add background first so everything fits on top
        this.game.addEntity(new Background(this.game, 0, -760, "./res/cavebg.png"));
        this.game.addEntity(new Background(this.game, 0, 0, "./res/cavebg.png"));

        // Add enemies next 
        this.game.addEntity(new Brain(this.game, 50, 50));
        this.game.addEntity(new EyeMinion(this.game, 50, 300));
        this.game.addEntity(new FingerGunDude(this.game, 400, 300));
        this.game.addEntity(new Cthulhu(this.game, 375, 40));

        // Add players last so they appear on top of all enemies
        this.game.addEntity(new Player(this.game));
        this.game.addEntity(new AltPlayer(this.game));

        // Add powerups for testing
        this.game.addEntity(new AdditionalProjectilePowerUp(this.game, 100, 1, "./res/ap1_pu.png"));
        this.game.addEntity(new MultipleProjectilePowerUp(this.game, 140, 1, "./res/ap2_pu.png"));
        this.game.addEntity(new IncreaseShieldPowerUp(this.game, 300, 1, "./res/shield_pu.png"));
        this.game.addEntity(new IncreaseFireRatePowerUp(this.game, 180, 1, "./res/fire_rate_pu.png"));
        this.game.addEntity(new IncreaseFireRatePowerUp(this.game, 180, 40, "./res/fire_rate_pu.png"));
        this.game.addEntity(new IncreaseFireRatePowerUp(this.game, 180, 80, "./res/fire_rate_pu.png"));
        this.game.addEntity(new IncreaseHealthPowerUp(this.game, 220, 1, "./res/health_pu.png"));
        this.game.addEntity(new IncreasePowerPowerUp(this.game, 260, 1, "./res/power_pu.png"));
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) { };
}


class Level {

    constructor(game) {
        this.game = game
        this.level = {};
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        const seconds = this.game.timer.seconds;
        //checks the level entity-creation map to see if there are units to spawn
        if (this.level[seconds]) {
            //spawns all the entities that should be created at this time-stamp
            this.level[seconds].forEach(entity => {
                this.game.addEntity(entity);
            });
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
        level[0] = [
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
        level[30] = [
            new Brain(this.game, 50, 50),
            new Brain(this.game, 150, 50),
            new Brain(this.game, 250, 50),
            new Brain(this.game, 350, 50),
            new Brain(this.game, 450, 50),
            new Brain(this.game, 550, 50),
            new Brain(this.game, 650, 50),
            new Brain(this.game, 750, 50),
        ];
        level[90] = [
            new FingerGunDude(this.game, 100, 50),
            new FingerGunDude(this.game, 300, 50),
            new FingerGunDude(this.game, 500, 50),
            new FingerGunDude(this.game, 200, 150),
            new FingerGunDude(this.game, 400, 150),
            new FingerGunDude(this.game, 600, 150),
        ];
        level[150] = [
            new Cthulhu(this.game, 250, 40)
        ];
        level[180] = [
            new Cthulhu(this.game, 150, 40)
        ];
    }
}
