class SpaceLevel extends Level {
	constructor(game, newPlayer) {
		super(game, newPlayer);

		this.createLevel();
		super.enemyTotal(this.level);


		this.bgMusicAdjust = 0.07;
        super.setBGMusic("./res/music/evapotranspiration.mp3");
	}

	update() {
		super.update();
		if(this.game.timer.getGameTime() - this.startTime == 65) {
			super.setBGMusic("./res/music/tropicofcancer.mp3");
		}

	}

	createLevel() {
		this.game.setBackground("./res/spacebg.png");

		this.level[0] = [
			new CthulhuSquid(this.game, 300, -50),
			new CthulhuArrow(this.game, 225, -50),
			new CthulhuArrow(this.game, 100, -50),
			new CthulhuArrow(this.game, 500, -50),
			new CthulhuArrow(this.game, 600, -50)
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
			new CthulhuArrow(this.game, 250, -50)
		this.level[10] = [
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
		this.level[20] = [
			new CthulhuArrow(this.game, 300, -50)
		];
		this.level[21] = [
			new CthulhuSquid(this.game, 400, -50),
			new CthulhuArrow(this.game, 100, -100),
			new CthulhuArrow(this.game, 600, -60)
		];
		this.level[22] = [
			new CthulhuArrow(this.game, 300, -50),
			new CthulhuArrow(this.game, 200, -50)
		];
		this.level[23] = [
			new CthulhuArrow(this.game, 500, -50),
			new CthulhuArrow(this.game, 600, -50)
		];
		this.level[27] = [
			new CthulhuSquid(this.game, 200, -50)
		];
		this.level[30] = [
			new CthulhuSquid(this.game, 600, -50)
		];
		this.level[32] = [
			new CthulhuSquid(this.game, 300, -50),
			new CthulhuArrow(this.game, 200, -50),
			new CthulhuArrow(this.game, 400, -50)
		];
		this.level[34] = [
			new CthulhuMinion(this.game, 325, -50),
			new CthulhuArrow(this.game, 225, -100),
			new CthulhuArrow(this.game, 425, -100)
		];
		this.level[35] = [
			new CthulhuCrab(this.game, 325, -50)
		];
		this.level[40] = [
			new CthulhuMinion(this.game, 150, -50),
			new CthulhuArrow(this.game, 250, -50),
			new CthulhuArrow(this.game, 450, -50),
			new CthulhuMinion(this.game, 550, -50),
			new CthulhuMinion(this.game, 350, -50),
		];
		this.level[44] = [
			new CthulhuMinion(this.game, 150, -50)
		];
		this.level[45] = [
			new CthulhuMinion(this.game, 550, -50)
		];
		this.level[46] = [
			new CthulhuCrab(this.game, 100, -50),
			new CthulhuArrow(this.game, 100, -100)
		];
		this.level[47] = [
			new CthulhuArrow(this.game, 300, -50)
		];
		this.level[48] = [
			new CthulhuCrab(this.game, 500, -50),
			new CthulhuArrow(this.game, 500, -100),
			new CthulhuMinion(this.game, 100, -50),
			new CthulhuMinion(this.game, 600, -50)
		];
		this.level[49] = [
			new CthulhuCrab(this.game, 100, -50)
		];
		this.level[51] = [
			new CthulhuCrab(this.game, 600, -50)
		];
		this.level[53] = [
			new CthulhuSquid(this.game, 350, -50),
			new CthulhuMinion(this.game, 100, -50),
			new CthulhuMinion(this.game, 600, -50)
		];
		this.level[55] = [
			new CthulhuMinion(this.game, 100, -50),
			new CthulhuMinion(this.game, 600, -50)
		];
		this.level[56] = [
			new CthulhuSquid(this.game, 300, -50),
		];
		this.level[57] = [
			new CthulhuMinion(this.game, 200, -50),
			new CthulhuMinion(this.game, 400, -50)
		];
		this.level[60] = [
			new CthulhuCrab(this.game, 300, -50)
		];
		this.level[65] = [
			new Cthulhu(this.game, 100, -600)
		];
	}
}
