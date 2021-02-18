async function load() {
    let fileSystem = {
        "engine/": ["gameengine.js", "assetmanager.js", "animator.js", "timer.js"],
        "game-objects/": ["boundingbox.js", "boundingcircle.js", "bullet.js", "player.js", "powerups.js", "bulletPatterns.js"],
        "game-objects/misc/": ["background.js", "particles.js"],
        "game-objects/enemies/": ["enemy.js"],
        "game-objects/enemies/brain/": ["brain.js", "eye-minion.js", "mouth-minion.js", "nose-minion.js"],
        "game-objects/enemies/cthulhu/": ["cthulhu.js", "cthulhu-minion.js", "cthulhu-arrow.js", "cthulhu-squid.js", "cthulhu-crab.js"],
        "game-objects/enemies/misc/": ["fingergun.js"],
        "game-objects/enemies/robot/": ["homing-robot.js", "spread-robot.js", "robot-minion.js"],
        "levels/": ["level.js", "cave-level.js", "factory-level.js", "space-level.js"],
        "": ["util.js", "main.js"],
    }

    for (let path in fileSystem) {
        for (let i = 0; i < fileSystem[path].length; i++) {
            let script = document.createElement('script');
            script.src = "./src/" + path + fileSystem[path][i];
            document.head.appendChild(script);
            await new Promise(r => setTimeout(r, 2));
            script.src === "enemy.js"
                ? await new Promise(r => setTimeout(r, 20))
                : await new Promise(r => setTimeout(r, 2));
        }
    }
}

load();
