class CaveLevel extends Level {
    constructor(game, newPlayer) {
        super(game, newPlayer);

        this.createLevel()
        super.enemyTotal(this.level);

        this.bgMusicAdjust = 0;
        super.setBGMusic("./res/music/ror2bg.mp3");
    }

    createLevel() {

        this.game.setBackground("./res/cavebg.png");

        this.level[2] = [
            new EyeMinion(this.game, 320, -50),
        ];
        this.level[3] = [
            new EyeMinion(this.game, 100, -50),
        ];
        this.level[4] = [
            new EyeMinion(this.game, 600, -50),
        ];
        this.level[5] = [
            new EyeMinion(this.game, 500, -50),
        ];
        this.level[6] = [
            new EyeMinion(this.game, 200, -50),
        ];
        this.level[7] = [
            new EyeMinion(this.game, 300, -50),
        ];
        this.level[8] = [
            new EyeMinion(this.game, 150, -50),
            new EyeMinion(this.game, 500, -75)
        ];
        this.level[9] = [
            new EyeMinion(this.game, 650, -50)
        ];
        this.level[10] = [
            new EyeMinion(this.game, 250, -50)
        ];
        this.level[12] = [
            new NoseMinion(this.game, 325, -50)
        ];
        this.level[14] = [
            new EyeMinion(this.game, 225, -50),
            new EyeMinion(this.game, 425, -50)
        ];
        this.level[18] = [
            new NoseMinion(this.game, 100, -50),
            new EyeMinion(this.game, 500, -50)
        ];
        this.level[20] = [
            new EyeMinion(this.game, 300, -50)
        ];
        this.level[21] = [
            new NoseMinion(this.game, 400, -50),
            new EyeMinion(this.game, 100, -100),
            new EyeMinion(this.game, 600, -60)
        ];
        this.level[22] = [
            new EyeMinion(this.game, 300, -50),
            new EyeMinion(this.game, 200, -50)
        ];
        this.level[23] = [
            new EyeMinion(this.game, 500, -50),
            new EyeMinion(this.game, 600, -50)
        ];
        this.level[27] = [
            new MouthMinion(this.game, 200, -50)
        ];
        this.level[30] = [
            new MouthMinion(this.game, 600, -50)
        ];
        this.level[32] = [
            new MouthMinion(this.game, 300, -50),
            new EyeMinion(this.game, 200, -50),
            new EyeMinion(this.game, 400, -50)
        ];
        this.level[34] = [
            new NoseMinion(this.game, 325, -50),
            new EyeMinion(this.game, 225, -100),
            new EyeMinion(this.game, 425, -100)
        ];
        this.level[35] = [
            new MouthMinion(this.game, 325, -50)
        ];
        this.level[40] = [
            new NoseMinion(this.game, 150, -50),
            new EyeMinion(this.game, 250, -50),
            new EyeMinion(this.game, 450, -50),
            new NoseMinion(this.game, 550, -50),
            new NoseMinion(this.game, 350, -50),
        ];
        this.level[44] = [
            new MouthMinion(this.game, 150, -50)
        ];
        this.level[45] = [
            new MouthMinion(this.game, 550, -50)
        ];
        this.level[46] = [
            new NoseMinion(this.game, 100, -50),
            new EyeMinion(this.game, 100, -100)
        ];
        this.level[47] = [
            new EyeMinion(this.game, 300, -50)
        ];
        this.level[48] = [
            new NoseMinion(this.game, 500, -50),
            new EyeMinion(this.game, 500, -100)
        ];
        this.level[49] = [
            new NoseMinion(this.game, 100, -50)
        ];
        this.level[51] = [
            new NoseMinion(this.game, 600, -50)
        ];
        this.level[53] = [
            new FingerGunDude(this.game, 350, 20)
        ];
        this.level[55] = [
            new EyeMinion(this.game, 100, -50),
            new EyeMinion(this.game, 600, -50)
        ];
        this.level[56] = [
            new NoseMinion(this.game, 300, -50),
        ];
        this.level[57] = [
            new EyeMinion(this.game, 200, -50),
            new EyeMinion(this.game, 400, -50)
        ];
        this.level[60] = [
            new MouthMinion(this.game, 300, -50)
        ];
        this.level[65] = [
            new FingerGunDude(this.game, 100, 20),
            new FingerGunDude(this.game, 400, 20)
        ];
        this.level[75] = [
            new Brain(this.game, 350, 20)
        ];
        this.level[85] = [
            new MouthMinion(this.game, 350, -50)
        ];
        this.level[90] = [
            new NoseMinion(this.game, 350, -50)
        ];
        this.level[95] = [
            new MouthMinion(this.game, 100, -50)
        ];
        this.level[105] = [
            new MouthMinion(this.game, 600, -50)
        ];
        this.level[115] = [
            new MouthMinion(this.game, 200, -50)
        ];
        this.level[125] = [
            new MouthMinion(this.game, 400, -50)
        ];
        this.level[135] = [
            new MouthMinion(this.game, 300, -50)
        ];

    }

}