// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = {
            backgrounds: [],
            enemies: [],
            particles: [],
            bullets: [],
            powerups: [],
            level: null,
            player: null,
        };
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
        this.score = 0;
        this.displayScore = document.getElementById('score');
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    reset() {
        this.entities = [];
        this.score = 0;
        this.displayScore.innerHTML = 0;
        this.setLevel(new CaveLevel(this));
        this.timer = new Timer();
    };

    startInput() {
        var that = this;

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
            }
        }, false);
    };

    /**
     * Adds a bullet to the game. 
     * @param {Bullet} bullet 
     */
    addBullet(bullet) {
        this.entities.bullets.push(bullet);
    }

    /**
     * Adds an enemy to the game. 
     * @param {Enemy} enemy 
     */
    addEnemy(enemy) {
        this.entities.enemies.push(enemy);
    }

    /**
     * Adds a powerup to the game. 
     * @param {Powerup} powerup 
     */
    addPowerup(powerup) {
        this.entities.powerups.push(powerup);
    }

    /**
     * Adds a new particle effect to the game. 
     * @param {Particle} particle 
     */
    addParticle(particle) {
        this.entities.particles.push(particle);
    }

    /**
     * Sets the background of the game. 
     * @param {String} background - The filepath of the background 
     */
    setBackground(background) {
        this.entities.backgrounds = [
            new Background(this, 0, -760, background),
            new Background(this, 0, 0, background)
        ];
    }

    /**
     * Sets the current level of the game. 
     * @param {Level} level - Level to start playing 
     */
    setLevel(level) {
        this.entities.level = level;
    }

    draw() {
        //clear the screen 
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //draw all game objects
        this.entities.backgrounds.forEach(background => background.draw(this.ctx));
        this.entities.particles.forEach(particle => particle.draw(this.ctx));
        this.entities.enemies.forEach(enemy => enemy.draw(this.ctx))
        this.entities.bullets.forEach(bullet => bullet.draw(this.ctx));
        this.entities.powerups.forEach(powerup => powerup.draw(this.ctx));
        this.entities.player.draw(this.ctx);
        //draw the hud
        this.entities.level.draw(this.ctx);
    };

    update() {
        this.entities.level.update();
        this.entities.player.update();

        this.updateEntityList(this.entities.backgrounds);
        this.updateEntityList(this.entities.particles);
        this.updateEntityList(this.entities.enemies);
        this.updateEntityList(this.entities.bullets);
        this.updateEntityList(this.entities.powerups);
    };

    /**
     * Updates all the entities in a list. 
     * Removes all entities that should be removed. 
     * @param {List[Object]} list 
     */
    updateEntityList(list) {
        list.forEach((entity, i) => {
            if (entity.removeFromWorld) {
                list.splice(i, 1);
            } else {
                entity.update();
            }
        })
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};