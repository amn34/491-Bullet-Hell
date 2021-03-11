/**
 * Cthulhu boss. Controls the spawning of CthulhuMinion, CthulhuSquid, CthulhuCrab, and CthulhuArrow.
 */
class Cthulhu extends Enemy {
    constructor(game, x, y) {
        const scale = 1;
        const width = 270;
        const height = 245;
        super(game, x, y, width, height, scale);

        this.sprite = ASSET_MANAGER.getAsset("./res/enemies/cthulhuSprite.png");
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 10, 0.3,
            false, false, true));

        // Control for spawning of minions.
        this.minionCount = 0;
        this.typeCounter = 0;
        this.creatureCount = 0;
        this.squidCount = 0;
        this.crabCount = 0;
        this.arrowCount = 0;

        // Controls for spawning of train.
        this.xMinionPosition = this.x;
        this.spawnTrain = false;
        this.trainCounter = 0;
        this.resetCount = false;
        this.restoreCount = 0;

        // Life of enemy
        this.life = 1000;
        this.totalLife = this.life;

        this.velocity = { x: 0, y: 0 };
        this.direction = 0; // Starting direction of minion movement.
        this.moveTimer = 0; // Timer for sin/cos functions.

        this.moveDownRight = false;
        this.moveDownLeft = false;

        this.startTimer = Math.floor(Date.now() / 100);
        this.oldTime = 0;

        this.score = 5000;
        this.canShoot = 0;
        this.threshHold = 60;
        this.bulletPattern = [];
        this.bPattern = archimedes;

        this.boss = true;

        this.angle = 0;
        this.updateBB();
    }

    /**
     * Controls movement of Cthulhu sprite and spawning behavior of arrow, squid, crab, and creature minions. Controls
     * train for creature minion.
     */
    update() {
        // Timer that determines spawning intervals.
        this.endTimer = Math.floor(Date.now() / 100);
        this.elapsedTime = this.endTimer - this.startTimer; // elapsed time in centi-seconds.

        const TICK = this.game.clockTick;
        const Direction = { RIGHT: 0, LEFT: 1};
        const Movement = { LEFT: 0, RIGHT: 1, SIN: 2, COS: 3 }; // Tied to moveFunction.
        const Velocity = { SUPER_FAST: 200, FAST: 100, REGULAR: 75, SLOW: 50, SUPER_SLOW: 25 }

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.direction === Direction.LEFT) {
            if (this.BB.yCenter < 0) this.moveDownLeft = true;
            if (this.moveDownLeft) {
                this.velocity.x -= Velocity.SLOW;
                this.velocity.y += Velocity.REGULAR;
            } else {
                this.velocity.x += this.moveFunction(Velocity.SUPER_SLOW, Movement.LEFT);
                let amplitude = 50;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer), Movement.COS);
            }
            if (this.BB.xCenter < 0) this.direction = Direction.RIGHT;
        } else if (this.direction === Direction.RIGHT) {
            if (this.BB.yCenter < 0) this.moveDownRight = true;
            if (this.moveDownRight) {
                this.velocity.x += Velocity.SLOW;
                this.velocity.y += Velocity.REGULAR;
            } else {
                this.velocity.x += this.moveFunction(Velocity.SUPER_SLOW, Movement.RIGHT);
                let amplitude = 50;
                let angularFrequency = 1 / 60;
                this.velocity.y += amplitude * this.moveFunction(angularFrequency * (this.moveTimer), Movement.SIN);
            }
            if (this.BB.xCenter > PARAMS.WIDTH) this.direction = Direction.LEFT;
        }

        if (this.BB.yCenter > 200) {
            this.moveDownRight = false;
            this.moveDownLeft = false;
        }

        this.moveTimer = this.moveTimer > 10000 ? 0 : this.moveTimer + 1;

        this.x += this.velocity.x * TICK * this.scale;
        this.y += this.velocity.y * TICK * this.scale;

        this.canShoot++;
        if (this.canShoot === this.threshHold) {
            this.canShoot = 0;
            let center = this.x + (this.width / 2) * this.scale;

            if (this.bPattern == archimedes) {
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, bPattern, this.angle + offset));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, bPattern, this.angle + offset));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, bPattern, this.angle + offset));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, bPattern, this.angle + offset));

            } else if (this.bPattern == archimedesReverse) {
                let offset = 0;

                for (let i=0; i<5; i++) {
                    this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, archimedes, this.angle + offset));
                    this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, archimedesReverse, this.angle + offset));
                    offset += 10;
                }
            } else if (this.bPattern == line) {
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 120));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 120));
                
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 30));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 30));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 180));
                
            } else if (this.bPattern == sideHelix) {
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 15));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 15));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 30));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 30));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 45));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 45));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 60));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 60));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 75));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 75));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 90));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 90));
                
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 135));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 135));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 150));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 150));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 165));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 165));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle - 180));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, line, this.angle + 180));
                
            } else if (this.bPattern == fortress) {
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, fortress, this.angle + 30));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, fortress, this.angle - 30));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, fortress, this.angle + 60));
                this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, fortress, this.angle - 60));

                let offset = 0;

                for (let i=0; i<5; i++) {
                    this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, archimedes, this.angle + offset));
                    this.game.addBullet(new CthulhuBullet(this.game, center, this.y + this.height / 2, 1, archimedesReverse, this.angle + offset));
                    offset += 10;
                }
            }

            this.angle = (this.angle + 72) % 360;
        }


        // Randomize x-coordinate for minion.
        this.xMinionPosition = Math.floor((Math.random() * PARAMS.WIDTH - 96) + 96);

        this.spawnTrainCreature(65, 5);

        /* If you want to modify spawn behavior, mess with parameters for spawnBehavior() */
        if (this.typeCounter < 5 || this.spawnTrain) { // Spawn regular minion
            this.spawnBehavior(5, 100, 2, 200, 1, 500, 1, 1000);
            this.spawnMinion(this.xMinionPosition, - 100, "CthulhuMinion");
        } else if (this.typeCounter < 10) { // Spawn Squid
            this.spawnBehavior(15, 100, 3, 200, 2, 500, 1, 1000);
            this.spawnMinion(this.xMinionPosition, -80,"CthulhuSquid");
        } else if (this.typeCounter < 15) { // Spawn Arrow
            this.spawnBehavior(3, 100, 2, 200, 1, 500, 1, 1000);
            this.spawnMinion(this.xMinionPosition, -40, "CthulhuArrow");
        } else if (this.typeCounter < 20) { // Spawn Crab
            this.spawnBehavior(10, 100, 2, 200, 1, 500, 1, 1000);
            this.spawnMinion(this.xMinionPosition, -50, "CthulhuCrab");
        } else { // Reset counter.
            this.typeCounter = 0;
        }

        this.updateBB();
        super.checkCollision(this.game.entities.bullets);
    }

    moveFunction(velocity, direction) {
        let movementFunctions = [-velocity, velocity, -Math.sin(velocity), Math.cos(velocity)];
        return movementFunctions[direction];
    }

    /**
     * Controls the spawning behavior of minions. Each stage is dependent on the bosses remaining life. Stage 1
     * is the spawning behavior when boss has more than 3/4 of remaining life. Stage 2 when bosses health
     * drops below 3/4 but above 1/2. Stage 3 occurs when bosses health is less than 1/2 but greater than 1/4. Stage
     * 4 is last spawning behavior when life drops to below 1/4th of total life.
     *
     * @param freqStage1 the frequency of spawning for stage 1.
     * @param maxStage1 the maximum number of minions that can be spawned at stage 1.
     * @param freqStage2
     * @param maxStage2
     * @param freqStage3
     * @param maxStage3
     * @param freqStage4
     * @param maxStage4
     */
    spawnBehavior(freqStage1, maxStage1, freqStage2, maxStage2, freqStage3, maxStage3, freqStage4, maxStage4) {
        if (this.life >= this.totalLife * 3 / 4) {
            if (!this.spawnTrain) {
                this.spawnFrequency = freqStage1;
                this.spawnMax = maxStage1;
            }
            
            this.bPattern = archimedesReverse;
        } else if (this.life >= this.totalLife / 2) {
            this.spawnFrequency = freqStage2;
            this.spawnMax = maxStage2;
            this.bPattern = line;
        } else if (this.life >= this.totalLife / 4) {
            this.spawnFrequency = freqStage3;
            this.spawnMax = maxStage3;
            this.bPattern = sideHelix;
            this.threshHold = 45;
        } else if (this.life >= this.totalLife / 8) {
            this.spawnFrequency = freqStage4;
            this.spawnMax = maxStage4;
            this.bPattern = fortress;
            
        }
    }

    /**
     * Determines when to spawn the minion train formation. When it is time to spawn the train the regular
     * minion spawning halts until the full length of the train is spawned. Once the trains spawning has completed
     * regular minion spawning resumes at original rate pre-spawn.
     *
     * @param trainLength int value that determines how many minions make up a train.
     * @param distanceBetween int centi-second value that determines how closely each minion is spawned to the following one.
     */
    spawnTrainCreature(trainLength, distanceBetween) {
        // The frequency of the train is dependent on the length of millipede.

        let trainFrequency = 2 * trainLength + (trainLength / 2)
        if (trainFrequency < 600) {
            trainFrequency = 600;
        }
        if (this.elapsedTime % trainFrequency === 0 && this.oldTime > 0) {
            this.spawnTrain = true;
            this.resetCount = true;
        }
        // Control length of train & how close minions spawn together.
        if (this.spawnTrain) {
            this.xMinionPosition = this.x; // train dependent on Cthulhu position.
            this.spawnFrequency = distanceBetween; // How close each minion spawns to the next one.
            this.spawnMax = trainLength;  // Length of the train.
            //  Reset and save minion count prior to train spawn.
            if (this.resetCount) {
                this.resetCount = false;
                this.restoreCount = this.minionCount;
                this.minionCount = 0;
            }
        }

        // Stop spawning train at the max train length.
        if (this.trainCounter >= trainLength) {
            this.spawnTrain = false;
            this.trainCounter = 0;
            this.minionCount = this.restoreCount; // restore original minion count prior to train.
        }
    }

    /**
     * Check whether a minion can be spawned or not. If enough time has elapsed since previous spawn, a minion
     * will be spawned otherwise do not spawn. Time is counted in centi-seconds (1/100 second).
     *
     * @param xStart starting spawn x coordinate
     * @param yStart starting spawn y coordinate
     * @param minionType type of minion to spawn.
     */
    spawnMinion(xStart, yStart, minionType) {
        if (this.minionCount < this.spawnMax) {
            if (this.elapsedTime % this.spawnFrequency === 0 && this.elapsedTime !== this.oldTime) {
                this.spawn(xStart, yStart, minionType)
                this.oldTime = this.elapsedTime; // Keep track of old time (to ensure correct count of centi-seconds)
                if (this.spawnTrain) {
                    this.trainCounter++;
                }
            }
        }
    }

    /**
     * Spawns a Cthulhu minion and increments the number of spawns.
     * @param x coordinate for minion spawn location.
     * @param y coordinate for minion spawn location.
     * @param minionType the type of minion to spawn.
     */
    spawn(x, y, minionType) {
        let minion;
        switch (minionType) {
            case "CthulhuCrab":
                minion = new CthulhuCrab(this.game, x, y);
                this.crabCount++;
                this.minionCount = this.crabCount;
                break;
            case "CthulhuMinion":
                minion = new CthulhuMinion(this.game, x, y);
                this.creatureCount++;
                this.minionCount = this.creatureCount;
                break;
            case "CthulhuSquid":
                minion = new CthulhuSquid(this.game, x, y);
                this.squidCount++;
                this.minionCount = this.squidCount;
                break;
            case "CthulhuArrow":
                minion = new CthulhuArrow(this.game, x, y);
                this.arrowCount++;
                this.minionCount = this.arrowCount;
                break;
            default:
                console.log("Wrong minion type specified.");
        }

        this.game.addEnemy(minion);
        this.game.entities.level.totalEnemies++;
        this.typeCounter++;
    };

    updateBB() {
        const radius = 90;
        super.updateBB(radius);
    }

    /**
     * Cthulhu draw method. Single default animation.
     * @param ctx context.
     */
    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        super.draw(ctx);

        let health = 150;
        // let modifier = this.width/2 - health/2;
        let modifier = this.BB.xCenter / 2;
        let distanceFromHead = 10;


        let healthCenter = this.BB.xCenter - (health / 2);

        ctx.fillStyle = "white";
        // ctx.fillRect(this.x, this.y - distanceFromHead, health, 5);
        ctx.fillRect(healthCenter, this.y - distanceFromHead, health, 5);
        // ctx.fillRect(this.x + modifier -1 , this.y - 1 - distanceFromHead, health + 1, 7);
        ctx.fillStyle = "red";
        ctx.fillRect(healthCenter, this.y - distanceFromHead, health * (this.life / this.totalLife), 5);
        // ctx.fillRect(this.x + modifier, this.y - distanceFromHead, - health * (this.totalLife/5000 - this.life/5000) + health, 5);
        ctx.stroke();


    }
}


class CthulhuBullet extends Bullet {
    constructor(game, x, y, scale, callback, angle) {
        const radius = 15;
        const bulletSpeed = 3;
        const bulletType = 1; //enemy bullet
        super(game, x, y, scale, radius, bulletSpeed, bulletType);
        this.callback = callback;
        this.angle = angle;
    }

    update() {
        this.updateBB();
        super.checkBounds();

        // this.angle += 0.04;
        this.callback(this);     
    }

    updateBB() {
        const radius = 15;
        super.updateBB(radius);
    }
}