
class TestLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel();
        super.enemyTotal(this.level);
    }

    createLevel() {

        this.game.setBackground("./res/factorybg.png");
        const LEFT = 0;
        const RIGHT = 1;

        this.level[0] = [
            new HomingRobot(this.game, 350, 250),
            new SpreadRobot(this.game, 100, 250, RIGHT), 
            new SpreadRobot(this.game, 600, 250, LEFT)
        ];
    }
}
