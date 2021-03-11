class Level {
    constructor(game, newPlayer) {
        this.game = game;
        this.life = 3;
        this.totalLife = 3;
        this.shield = 0;
        this.damage = 1;
        this.enemiesDefeated = 0;
        this.totalEnemies = 0;
        this.level = {};

        this.startTransition = true;
        this.endTransition = false;

        this.startTime = undefined;

        this.levelStart = false;
        this.levelComplete = false;

        this.bgMusic = new Audio();

        //reset the state of the game and remove all entities 
        game.entities.backgrounds = [];
        game.entities.enemies = [];
        game.entities.particles = [];
        game.entities.bullets = [];
        game.entities.powerups = [];

        if(newPlayer) {
            game.entities.player = new Player(this.game);
        } else {
            const player = game.entities.player;
            console.log("Player: " + player);
            player.x = PARAMS.WIDTH / 2 - (player.width * player.scale / 2);
            player.y = 740;
        }
    }

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
        this.bgMusic.muted = mute;
        this.bgMusic.volume = Math.max(0, document.getElementById("volume").value - this.bgMusicAdjust);
        console.log(volume);

    }

    setBGMusic(path) {
        this.bgMusic.pause();
        this.bgMusic = new Audio(path);
        let that = this;
        this.bgMusic.addEventListener("ended", function () {
            that.bgMusic.currentTime = 0;
            that.bgMusic.play();
        });
        this.bgMusic.volume = Math.max(0, document.getElementById("volume").value - this.bgMusicAdjust);

        this.bgMusic.play();
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        PARAMS.INVINCIBLE = document.getElementById("invincible").checked;

        //Exit if the level hasn't begun yet
        if(!this.levelRun) {
            return;
        }

        const seconds = this.game.timer.getGameTime() - this.startTime;
      
        this.updateAudio();

        //checks the level entity-creation map to see if there are units to spawn
        if (this.level[seconds]) {
            //spawns all the entities that should be created at this time-stamp
            this.level[seconds].forEach(enemy => {
                if (!enemy.boss) {
                    enemy.life *= this.damage;
                }
                this.game.addEnemy(enemy);
            });
            this.level[seconds] = [];
        }

        // Reset the current level to the beginning if the player dies
        if (this.life === 0) {
            this.game.reset();
        }

        if(!this.levelComplete) {
            if(this.levelOver()) {
                this.levelComplete = true;
                this.endTransition = true;
            }
        }

        if(this.levelComplete && !this.endTransition) {
            this.game.nextLevel();
        }
    };

    /**
     * Utilized by the Player Object to start the level when finished with the start transition
     */
    startLevel() {
        this.levelRun = true;
        this.startTime = this.game.timer.getGameTime();
    }

    /**
     * Checks if all enemies have been defeated and the level is over
     */
    levelOver() {
        return this.enemiesDefeated === this.totalEnemies;
    }

    /**
     * 
     * @param {Object} obj - The entity-creation map 
     */
    enemyTotal(obj) {
        for (const v of Object.values(obj)) {
            this.totalEnemies += v.length;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(210, 720, 310, 30);
        this.shield == 0 ? ctx.fillStyle = "red" : ctx.fillStyle = "blue";
        ctx.fillRect(215, 725, 300 - 100 * (this.totalLife - this.life), 20);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(315, 720);
        ctx.lineTo(315, 750);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(415, 720);
        ctx.lineTo(415, 750);
        ctx.stroke();
    };
}
