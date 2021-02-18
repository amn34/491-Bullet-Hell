class FactoryLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel();
        super.enemyTotal(this.level);
    }

    createLevel() {

        this.game.setBackground("./res/factorybg.png");

        this.level[1] = [
            new FingerGunDude(this.game, 350, 20),
            new RobotMinion(this.game, 300, -50),
        ];
        this.level[2] = [
            new RobotMinion(this.game, 200, -50),
        ];
        this.level[3] = [
            new RobotMinion(this.game, 500, -50),
        ];
        this.level[10] = [
            new SpreadRobot(this.game, 100, 20, PARAMS.RIGHT)
        ];
        this.level[15] = [
            new SpreadRobot(this.game, 600, 20, PARAMS.LEFT)
        ];
        this.level[25] = [
            new SpreadRobot(this.game, 200, 30, PARAMS.RIGHT),
            new SpreadRobot(this.game, 475, 30, PARAMS.LEFT)
        ];
        this.level[35] = [
            new FingerGunDude(this.game, 100, 150)
        ];
        this.level[40] = [
            new SpreadRobot(this.game, 500, 100, PARAMS.LEFT)
        ];
        this.level[50] = [
            new HomingRobot(this.game, 350, 100)
        ];
    }
}