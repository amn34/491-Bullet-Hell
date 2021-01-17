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

        // this.chutulu = new Chutulu(this.game, 100, 100);
        // this.game.addEntity(this.chutulu);
    };

    update() {};

    draw(ctx) {};
}