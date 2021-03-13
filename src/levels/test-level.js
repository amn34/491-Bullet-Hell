
class TestLevel extends Level {
    constructor(game, newPlayer) {
        super(game, newPlayer);

        this.createLevel();
        super.enemyTotal(this.level);

        this.bgMusicAdjust = 0.07;
        super.setBGMusic("./res/music/IntroExtended.mp3");
    }

    createLevel() {

        // this.game.setBackground("./res/factorybg.png");
        const LEFT = 0;
        const RIGHT = 1;

        this.level[0] = [
            new HomingRobot(this.game, 350, 250),
            new SpreadRobot(this.game, 50, 150, RIGHT),
            new SpreadRobot(this.game, 250, 150, RIGHT),            
            new SpreadRobot(this.game, 450, 150, RIGHT),
            new SpreadRobot(this.game, 650, 150, RIGHT),
            new RobotMinion(this.game, 300, -50),
        ];
        this.level[1] = [
            new FingerGunDude(this.game, 350, 60),
            new FingerGunDude(this.game, 550, 20),
            new FingerGunDude(this.game, 150, 20),
            new RobotMinion(this.game, 600, -50),
        ];
		this.level[3] = [
			new CthulhuArrow(this.game, 100, -50),
		];
		this.level[4] = [
			new CthulhuArrow(this.game, 600, -50),
		];
		this.level[5] = [
			new CthulhuArrow(this.game, 500, -50),
		];
		this.level[6] = [
			new CthulhuArrow(this.game, 200, -50),
		];
		this.level[7] = [
			new CthulhuArrow(this.game, 300, -50),
		];
		this.level[8] = [
			new CthulhuArrow(this.game, 150, -50),
			new CthulhuArrow(this.game, 500, -75)
		];
		this.level[9] = [
			new CthulhuArrow(this.game, 650, -50)
		];
		this.level[10] = [
            new CthulhuArrow(this.game, 250, -50)
		];
        this.level[11] = [
            new CthulhuArrow(this.game, 450, -50)
		];
		this.level[12] = [
			new CthulhuCrab(this.game, 325, -50)
		];
		this.level[14] = [
			new CthulhuCrab(this.game, 225, -50),
			new CthulhuArrow(this.game, 425, -50)
		];
		this.level[18] = [
			new CthulhuCrab(this.game, 100, -50),
			new CthulhuArrow(this.game, 500, -50)
		];
        this.level[23] = [
            new Brain(this.game, 350, 20)
        ]
        this.level[25] = [
            new HomingRobot(this.game, 300, 100, PARAMS.RIGHT),
            new HomingRobot(this.game, 500, 100, PARAMS.LEFT)
        ];
        this.level[30] = [
			new CthulhuArrow(this.game, 150, -50),
			new CthulhuArrow(this.game, 500, -75)
		];
        this.level[31] = [
			new CthulhuArrow(this.game, 250, -50),
			new CthulhuArrow(this.game, 400, -75)
		];
        this.level[32] = [
			new CthulhuArrow(this.game, 150, -50),
			new CthulhuArrow(this.game, 500, -75)
		];
        this.level[33] = [
			new CthulhuArrow(this.game, 250, -50),
			new CthulhuArrow(this.game, 400, -75)
		];
        this.level[35] = [
            new FingerGunDude(this.game, 100, 150),
            new HomingRobot(this.game, 35, 250),
            new HomingRobot(this.game, 690, 250)
        ];
        this.level[36] = [
            new RobotMinion(this.game, 200, -50),
        ];
        this.level[37] = [
            new RobotMinion(this.game, 200, -50),
        ];
        this.level[38] = [
            new RobotMinion(this.game, 300, -50),
        ];
        this.level[39] = [
            new RobotMinion(this.game, 400, -50)
        ];
        this.level[40] = [
            new RobotMinion(this.game, 500, -50)
        ];

        this.level[41] = [
            new FingerGunDude(this.game, 350, 60),
            new FingerGunDude(this.game, 550, 20),
            new FingerGunDude(this.game, 150, 20),
            new RobotMinion(this.game, 600, -50),
        ];
		this.level[43] = [
			new CthulhuArrow(this.game, 100, -50),
		];
		this.level[44] = [
			new CthulhuArrow(this.game, 600, -50),
		];
		this.level[45] = [
			new CthulhuArrow(this.game, 500, -50),
		];
		this.level[46] = [
			new CthulhuArrow(this.game, 200, -50),
		];
		this.level[47] = [
			new CthulhuArrow(this.game, 300, -50),
		];
		this.level[48] = [
			new CthulhuArrow(this.game, 150, -50),
			new CthulhuArrow(this.game, 500, -75)
		];
		this.level[49] = [
			new CthulhuArrow(this.game, 650, -50)
		];
		this.level[50] = [
            new CthulhuArrow(this.game, 250, -50)
		];
        this.level[51] = [
            new CthulhuArrow(this.game, 450, -50)
		];
		this.level[52] = [
			new CthulhuCrab(this.game, 325, -50)
		];
		this.level[54] = [
			new CthulhuCrab(this.game, 225, -50),
			new CthulhuArrow(this.game, 425, -50)
		];
		this.level[58] = [
			new CthulhuCrab(this.game, 100, -50),
			new CthulhuArrow(this.game, 500, -50)
		];
        this.level[63] = [
            new Brain(this.game, 350, 20)
        ]
        this.level[65] = [
            new HomingRobot(this.game, 300, 100, PARAMS.RIGHT),
            new HomingRobot(this.game, 500, 100, PARAMS.LEFT)
        ];
        this.level[70] = [
			new CthulhuArrow(this.game, 150, -50),
			new CthulhuArrow(this.game, 500, -75)
		];
        this.level[71] = [
			new CthulhuArrow(this.game, 250, -50),
			new CthulhuArrow(this.game, 400, -75)
		];
        this.level[72] = [
			new CthulhuArrow(this.game, 150, -50),
			new CthulhuArrow(this.game, 500, -75)
		];
        this.level[73] = [
			new CthulhuArrow(this.game, 250, -50),
			new CthulhuArrow(this.game, 400, -75)
		];
        this.level[75] = [
            new FingerGunDude(this.game, 100, 150),
            new HomingRobot(this.game, 35, 250),
            new HomingRobot(this.game, 690, 250)
        ];
        this.level[80] = [
            new Cthulhu(this.game, 200, -500)
        ]
		
    }
}
