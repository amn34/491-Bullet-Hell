class CaveLevel extends Level {
    constructor(game) {
        super(game);

        this.createLevel()
    }

    createLevel() {

        this.game.setBackground("./res/cavebg.png");

        this.level[1] = [
            new EyeMinion(this.game, 50, 0),
        ];
        this.level[2] = [
            new EyeMinion(this.game, 150, 0),
        ];
        this.level[3] = [
            new EyeMinion(this.game, 250, 0),
        ];
        this.level[4] = [
            new EyeMinion(this.game, 350, 0),
        ];
        this.level[5] = [
            new EyeMinion(this.game, 450, 0),
        ];
        this.level[6] = [
            new EyeMinion(this.game, 550, 0),
        ];
        this.level[7] = [
            new MouthMinion(this.game, 650, 0),
        ];
        this.level[9] = [
            new Brain(this.game, 200, 20),
        ];
        this.level[20] = [
            new MouthMinion(this.game, 100, 0),
            new MouthMinion(this.game, 350, 0),
            new MouthMinion(this.game, 600, 0),
        ];
        this.level[21] = [
            new NoseMinion(this.game, 300, 0),
        ];
        this.level[25] = [
            new Brain(this.game, 400, 20),
            new NoseMinion(this.game, 100, 0),
        ];
        this.level[30] = [
            new NoseMinion(this.game, 500, 0),
        ];
        this.level[35] = [
            new MouthMinion(this.game, 450, 0),
        ];
        this.level[37] = [
            new MouthMinion(this.game, 250, 0),
        ];
        this.level[39] = [
            new MouthMinion(this.game, 350, 0),
        ];
        this.level[40] = [
            new FingerGunDude(this.game, 250, 0),
        ];
        this.level[45] = [
            new FingerGunDude(this.game, 450, 0),
        ];
        this.level[48] = [
            new FingerGunDude(this.game, 350, 100),
        ];
        this.level[51] = [
            new Brain(this.game, 100, 20),
        ];
        this.level[55] = [
            new Brain(this.game, 500, 20),
        ];
        this.level[60] = [
            new MouthMinion(this.game, 100, 0),
        ];
        this.level[61] = [
            new MouthMinion(this.game, 600, 0),
        ];
        this.level[62] = [
            new MouthMinion(this.game, 200, 0),
        ];
        this.level[63] = [
            new MouthMinion(this.game, 500, 0),
        ];
        this.level[64] = [
            new MouthMinion(this.game, 300, 0),
        ];
        this.level[65] = [
            new MouthMinion(this.game, 400, 0),
        ];
        this.level[80] = [
            new Cthulhu(this.game, 300, 100), // TODO - reset to 0, placed at 100 to see health bar.
        ];
    }
}
