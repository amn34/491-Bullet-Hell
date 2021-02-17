class FactoryLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel();
        super.enemyTotal(this.level);
    }

    createLevel() {

        this.game.setBackground("./res/factorybg.png");


        this.level[0] = [
            new HomingRobot(this.game, 350, 250),
            new SpreadRobot(this.game, 100, 250, PARAMS.RIGHT), 
            new SpreadRobot(this.game, 600, 250, PARAMS.LEFT)
        ];
    }
}