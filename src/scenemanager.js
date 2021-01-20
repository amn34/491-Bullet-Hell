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


        this.game.addEntity(new Background(this.game, 0, -760, "./res/cavebg.png"));
        this.game.addEntity(new Background(this.game, 0, 0, "./res/cavebg.png"));

        this.game.addEntity(new Player(this.game));
        //this.game.addEntity(new AltPlayer(this.game));
        this.game.addEntity(new Brain(this.game));
        this.game.addEntity(new Cthulhu(this.game));
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {};
}