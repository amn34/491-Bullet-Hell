class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

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

    draw(ctx) {};
}