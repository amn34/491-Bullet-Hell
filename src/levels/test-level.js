
class TestLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel();
    }

    createLevel() {
        console.log(this.game.entities.player.health);
        this.game.setBackground("./res/cavebg.png");

        this.level[0] = [
            new HomingRobot(this.game, 350, 250)
        ];
    }
}
