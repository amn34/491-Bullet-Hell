var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// Load assets here
// Might need a separate load manager here
ASSET_MANAGER.queueDownload("./res/arcadeShooterSpritex32.png");
ASSET_MANAGER.queueDownload("./res/altPlayer.png");
ASSET_MANAGER.queueDownload("./res/brain.png");
ASSET_MANAGER.queueDownload("./res/cthulhuSprite.png");
ASSET_MANAGER.queueDownload("./res/eye.png");
ASSET_MANAGER.queueDownload("./res/cavebg.png");
ASSET_MANAGER.queueDownload("./res/enemy.png");
ASSET_MANAGER.queueDownload("./res/ap1_pu.png");
ASSET_MANAGER.queueDownload("./res/ap2_pu.png");
ASSET_MANAGER.queueDownload("./res/fire_rate_pu.png");
ASSET_MANAGER.queueDownload("./res/health_pu.png");
ASSET_MANAGER.queueDownload("./res/power_pu.png");
ASSET_MANAGER.queueDownload("./res/shield_pu.png");
ASSET_MANAGER.queueDownload("./res/finger_gun_dude.png");
ASSET_MANAGER.queueDownload("./res/cth_minion_float.png");
ASSET_MANAGER.queueDownload("./res/cth_minion_attack.png");
ASSET_MANAGER.queueDownload("./res/bullet.png");
ASSET_MANAGER.queueDownload("./res/explosion.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

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
	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
