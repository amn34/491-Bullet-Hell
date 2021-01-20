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

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Focuses the canvas automatically so the user
	// does not need to click on the screen.
	// If the user clicks outside the screen , the focus is lost
	canvas.focus();
	gameEngine.init(ctx);

	gameEngine.addEntity(new Background(gameEngine, 0, -760, "./res/cavebg.png"));
	gameEngine.addEntity(new Background(gameEngine, 0, 0, "./res/cavebg.png"));

	// This is where we will add the scene manager to handle
	// the adding and removing of entities
	gameEngine.addEntity(new Player(gameEngine));
	gameEngine.addEntity(new AltPlayer(gameEngine));
	gameEngine.addEntity(new Brain(gameEngine));
	gameEngine.addEntity(new Cthulhu(gameEngine));
	gameEngine.addEntity(new EyeMinion(gameEngine));


	gameEngine.start();
});
