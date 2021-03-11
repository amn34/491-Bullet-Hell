class FactoryLevel extends Level {
    constructor(game, newPlayer) {
        super(game, newPlayer);

        this.createLevel();
        super.enemyTotal(this.level);

		this.bgMusicAdjust = 0.07;
        super.setBGMusic("./res/music/terrapluviam.mp3");

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
        this.level[4] = [
            new RobotMinion(this.game, 600, -50),
        ];
        this.level[5] = [
            new RobotMinion(this.game, 100, -50),
        ];
        this.level[6] = [
            new RobotMinion(this.game, 250, -50),
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
        this.level[37] = [
            new RobotMinion(this.game, 200, -50)
        ];
        this.level[39] = [
            new RobotMinion(this.game, 400, -50)
        ];
        this.level[40] = [
            new SpreadRobot(this.game, 500, 100, PARAMS.LEFT)
        ];
        this.level[43] = [
            new RobotMinion(this.game, 250, -50),
            new RobotMinion(this.game, 350, -50)
        ];
        this.level[47] = [
            new RobotMinion(this.game, 100, -50),
        ];
        this.level[49] = [
            new RobotMinion(this.game, 500, -50),
        ];
        this.level[50] = [
            new HomingRobot(this.game, 350, 100)
        ];
        this.level[54] = [
            new RobotMinion(this.game, 100, -50)
        ];
        this.level[55] = [
            new RobotMinion(this.game, 600, -50)
        ];
        this.level[65] = [
            new HomingRobot(this.game, 150, 100),
            new HomingRobot(this.game, 550, 100)
        ];
        this.level[67] = [
            new RobotMinion(this.game, 250, -50)
        ];
        this.level[69] = [
            new RobotMinion(this.game, 450, -50)
        ];
    }
}