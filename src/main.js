var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// Load assets here
// Might need a separate load manager here
ASSET_MANAGER.queueDownload("./res/player.png");
ASSET_MANAGER.queueDownload("./res/altPlayer.png");
ASSET_MANAGER.queueDownload("./res/enemies/brain.png");
ASSET_MANAGER.queueDownload("./res/enemies/cthulhuSprite.png");
ASSET_MANAGER.queueDownload("./res/enemies/eye.png");
ASSET_MANAGER.queueDownload("./res/cavebg.png");
ASSET_MANAGER.queueDownload("./res/powerups/ap1_pu.png");
ASSET_MANAGER.queueDownload("./res/powerups/ap2_pu.png");
ASSET_MANAGER.queueDownload("./res/powerups/fire_rate_pu.png");
ASSET_MANAGER.queueDownload("./res/powerups/health_pu.png");
ASSET_MANAGER.queueDownload("./res/powerups/power_pu.png");
ASSET_MANAGER.queueDownload("./res/powerups/shield_pu.png");
ASSET_MANAGER.queueDownload("./res/enemies/finger_gun_dude.png");
ASSET_MANAGER.queueDownload("./res/enemies/cth_minion_float.png");
ASSET_MANAGER.queueDownload("./res/enemies/cth_minion_attack.png");
ASSET_MANAGER.queueDownload("./res/bullet.png");
ASSET_MANAGER.queueDownload("./res/explosion.png");
ASSET_MANAGER.queueDownload("./res/enemies/mouth.png");
ASSET_MANAGER.queueDownload("./res/enemies/nose.png");

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
	gameEngine.addEntity(new CaveLevel(gameEngine));

	gameEngine.start();
});
