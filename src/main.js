var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// Load assets here
// Might need a separate load manager here
function loadSprites() {
	let base = "./res/";
	let extension = ".png";
	let sprites = {
		"" : ["player", "altPlayer", "cavebg", "explosion"],
		"powerups/" : ["ap1_pu", "ap2_pu", "fire_rate_pu", "health_pu", "power_pu", "shield_pu"],
		"enemies/" : ["finger_gun_dude", "cth_minion_float", "cth_minion_attack", "brain", "cthulhuSprite", 
					  "eye", "mouth", "nose", "cthulhuSquid", "cthulhuTriangle", "cthulhuCrab"],
	}

	for (path in sprites) {
		for (index in sprites[path]) {
			ASSET_MANAGER.queueDownload(base + path + sprites[path][index] + extension);
		}
	}
}

loadSprites();

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	// Get canvas width & height
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	// Focuses the canvas automatically so the user
	// does not need to click on the screen.
	// If the user clicks outside the screen , the focus is lost
	canvas.focus();
	gameEngine.init(ctx);

	// This is where we will add the scene manager to handle
	// the adding and removing of entities
	gameEngine.setLevel(new CaveLevel(gameEngine));
	//gameEngine.setLevel(new TestLevel(gameEngine));

	gameEngine.start();
});
