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
        this.game.addEntity(new Cthulhu(this.game, 375, 40));
        this.game.addEntity(new Player(this.game));
        this.game.addEntity(new AltPlayer(this.game));
        this.game.addEntity(new EyeMinion(this.game, 50, 300));
        this.game.addEntity(new FingerGunDudue(this.game, 400, 300));

        // Add players last so they appear on top of all enemies
        this.game.addEntity(new Player(this.game));
        this.game.addEntity(new AltPlayer(this.game));

        // Add powerups for testing
        this.game.addEntity(new PowerUp(this.game, 100, 300, "./res/ap1_pu.png"));
        this.game.addEntity(new PowerUp(this.game, 140, 300, "./res/ap2_pu.png"));
        this.game.addEntity(new PowerUp(this.game, 180, 300, "./res/fire_rate_pu.png"));
        this.game.addEntity(new PowerUp(this.game, 220, 300, "./res/health_pu.png"));
        this.game.addEntity(new PowerUp(this.game, 260, 300, "./res/power_pu.png"));
        this.game.addEntity(new PowerUp(this.game, 300, 300, "./res/shield_pu.png"));
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {};
}