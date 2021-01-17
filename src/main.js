var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// Load assets here
// Might need a separate load manager here
ASSET_MANAGER.queueDownload("./res/cavebg.png");
ASSET_MANAGER.queueDownload("./res/arcadeShooterSpritex32.png");
ASSET_MANAGER.queueDownload("./res/altPlayer.png");
ASSET_MANAGER.queueDownload("./res/enemy.png");
ASSET_MANAGER.queueDownload("./res/cthulhuSprite.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Focuses the canvas automatically so the user
	// does not need to click on the screen.
	// If the user clicks outside the screen , the focus is lost
	canvas.focus();
	gameEngine.init(ctx);

	gameEngine.addEntity(new SceneManager(gameEngine));
	
	gameEngine.start();
});
