
class TestLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel();
    }

    createLevel() {
        console.log(this.game.entities.player.health);
        this.game.setBackground("./res/cavebg.png");
        const LEFT = 0;
        const RIGHT = 1;

        this.level[0] = [
            new HomingRobot(this.game, 350, 250),
            new SpreadRobot(this.game, 100, 250, RIGHT), 
            new SpreadRobot(this.game, 600, 250, LEFT)
        ];
    }
}
