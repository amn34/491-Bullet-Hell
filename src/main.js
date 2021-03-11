const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();


// Load assets here
// Might need a separate load manager here
function loadSprites() {
	let base = "./res/";
	let extension = ".png";
	let sprites = {
		"": ["player", "altPlayer", "cavebg", "explosion", "factorybg", "spacebg"],
		"powerups/": ["ap1_pu", "ap2_pu", "fire_rate_pu", "health_pu", "power_pu", "shield_pu"],
		"enemies/": ["finger_gun_dude", "cth_minion_float", "cth_minion_attack", "brain", "cthulhuSprite",
			"eye", "mouth", "nose", "cthulhuSquid", "cthulhuTriangle", "cthulhuCrab", "joypad", "robothand"],
	}

	for (path in sprites) {
		for (index in sprites[path]) {
			ASSET_MANAGER.queueDownload(base + path + sprites[path][index] + extension);
		}
	}
}

loadSprites();

function loadSounds() {
	let base = "./res/";
	let extension = [".wav", ".mp3"];
	let wavs = {
		"sfx/": ["Shoot", "Brain", "Hit", "Mouth", "Nose"]
	};
	let mp3s = {
		"sfx/": ["PickUp"],
		"music/": ["IntroExtended", "ror2bg", "Chicks-Pain"]
	};
	let sounds = [wavs, mp3s];

	for (var i = 0; i < sounds.length; i++) {
		for (path in sounds[i]) {
			for (index in sounds[i][path]) {
				ASSET_MANAGER.queueDownload(base + path + sounds[i][path][index] + extension[i]);
			}
		}
	}
}

loadSounds();


window.addEventListener('keydown', (e) => {
	pauseGame(e);
})

function pauseGame(e) {
	switch (e.code) {
		case 'KeyP':
			if (PARAMS.PAUSED) {
				resumeGame();
			} else {
				PARAMS.PAUSED = true;
				document.querySelector('.main-menu').style.display = 'flex';

			}
			break;
	}
}

function resumeGame() {
	PARAMS.PAUSED = false;
	document.querySelector('.main-menu').style.display = 'none';
	document.querySelector('.control-menu').style.display = 'none';
	document.querySelector('.enemies-menu').style.display = 'none';
	document.querySelector('.level-select-menu').style.display = 'none';
	document.querySelector('.powerup-menu').style.display = 'none';
	document.querySelector('#gameWorld').focus();
}

document.querySelectorAll('.nav-back').forEach(function(element) {
	element.addEventListener('click', () => {
		document.querySelector('.powerup-menu').style.display = 'none';
		document.querySelector('.control-menu').style.display = 'none';
		document.querySelector('.enemies-menu').style.display = 'none';
		document.querySelector('.level-select-menu').style.display = 'none';
		document.querySelector('.main-menu').style.display = 'flex';
	})
})

document.querySelector('#control-btn').addEventListener('click', () => {
	document.querySelector('.main-menu').style.display = 'none';
	document.querySelector('.control-menu').style.display = 'flex';
})

document.querySelector('#powerup-btn').addEventListener('click', () => {
	document.querySelector('.main-menu').style.display = 'none';
	document.querySelector('.powerup-menu').style.display = 'flex';
})

document.querySelector('#enemy-btn').addEventListener('click', () => {
	document.querySelector('.main-menu').style.display = 'none';
	document.querySelector('.enemies-menu').style.display = 'flex';
})

document.querySelector('#level-select-btn').addEventListener('click', () => {
	document.querySelector('.main-menu').style.display = 'none';
	document.querySelector('.level-select-menu').style.display = 'flex';
})


document.querySelector('#cave-img').addEventListener('click', (e) => {
	gameEngine.setLevel(new CaveLevel(gameEngine, true))
	resumeGame();
})

document.querySelector('#factory-img').addEventListener('click', (e) => {
	gameEngine.setLevel(new FactoryLevel(gameEngine, true))
	resumeGame();
})

document.querySelector('#space-img').addEventListener('click', () => {
	gameEngine.setLevel(new SpaceLevel(gameEngine, true))
	resumeGame();

})





ASSET_MANAGER.downloadAll(function () {
	const canvas = document.getElementById('gameWorld');
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	// Get canvas width & height

	// Focuses the canvas automatically so the user
	// does not need to click on the screen.
	// If the user clicks outside the screen , the focus is lost
	canvas.focus();
	gameEngine.init(ctx);

	// This is where we will add the scene manager to handle
	// the adding and removing of entities

	gameEngine.setLevel(new CaveLevel(gameEngine, true));
	// gameEngine.setLevel(new FactoryLevel(gameEngine, true));
	// gameEngine.setLevel(new SpaceLevel(gameEngine, true));
	// gameEngine.setLevel(new TestLevel(gameEngine, true));
	
	gameEngine.start();
});



