function downSpiral(bullet) {
    bullet.x += (bullet.angle) * Math.cos(bullet.angle);
    bullet.y +=  (bullet.angle) * Math.sin(bullet.angle) + bullet.bulletSpeed;
}

function downSpiralReverse(bullet) {
    bullet.x -= (bullet.angle) * Math.cos(bullet.angle);
    bullet.y +=  (bullet.angle) * Math.sin(bullet.angle) + bullet.bulletSpeed;
}

function downSpiralAlternative(bullet) {
    bullet.x += (bullet.angle) * Math.cos(bullet.angle / 3);
    bullet.y +=  (bullet.angle) * Math.sin(bullet.angle) + bullet.bulletSpeed;
}

function downSpiralReverseAlternative(bullet) {
    bullet.x -= (bullet.angle) * Math.cos(bullet.angle / 3);
    bullet.y +=  (bullet.angle) * Math.sin(bullet.angle) + bullet.bulletSpeed;
}

function archimedes(bullet) {
    bullet.x += Math.cos(bullet.angle) * (bullet.bulletSpeed);
    bullet.y += Math.sin(bullet.angle) * (bullet.bulletSpeed);
}

function archimedesReverse(bullet) {
    bullet.x -= Math.cos(bullet.angle) * (bullet.bulletSpeed);
    bullet.y -= Math.sin(bullet.angle) * (bullet.bulletSpeed);
}

function archimedesAngle(bullet) {
    bullet.x += Math.cos(bullet.angle) * (bullet.angle);
    bullet.y += Math.sin(bullet.angle) * (bullet.angle);
}

function archimedesAngleReverse(bullet) {
    bullet.x -= Math.cos(bullet.angle) * bullet.angle;
    bullet.y -= Math.sin(bullet.angle) * bullet.angle;
}


function line(bullet) {
    bullet.x += Math.cos(bullet.angle * Math.PI / 180) * bullet.bulletSpeed;
    bullet.y -= Math.sin(bullet.angle * Math.PI / 180) * bullet.bulletSpeed;
}

function sideHelix(bullet) {
    const xSquared = Math.pow(Math.cos(bullet.angle), 2);
    const ySquared = Math.pow(Math.sin(bullet.angle), 2);
    bullet.x += Math.sqrt(xSquared + ySquared) * Math.cos(2 * bullet.angle / 5) * bullet.bulletSpeed;
    bullet.y += Math.sin(bullet.angle) * bullet.bulletSpeed;
}

function figureEight(bullet) {
    const xSquared = Math.pow(Math.cos(bullet.angle), 2);
    const ySquared = Math.pow(Math.sin(bullet.angle), 2);
    bullet.x += Math.sqrt(xSquared + ySquared) * Math.cos(2 * bullet.angle / 5) * bullet.bulletSpeed;
    bullet.y += Math.sin(bullet.angle / 5) * bullet.bulletSpeed / 2;
}

// WIP
function rosePetal(bullet) {
    const xSquared = Math.pow(Math.cos(bullet.angle), 2);
    const ySquared = Math.pow(Math.sin(bullet.angle), 2);
    bullet.x += Math.cos(bullet.angle) / Math.sqrt(xSquared + ySquared) - (2 * Math.sqrt(xSquared + ySquared));
    bullet.y -= Math.sin(bullet.angle) * bullet.bulletSpeed;
}

function rosePetalReverse(bullet) {
    const xSquared = Math.pow(Math.cos(bullet.angle), 2);
    const ySquared = Math.pow(Math.sin(bullet.angle), 2);
    bullet.x -= Math.cos(bullet.angle) / Math.sqrt(xSquared + ySquared) - (2 * Math.sqrt(xSquared + ySquared));
    bullet.y += Math.sin(bullet.angle) * bullet.bulletSpeed;
}

function fortress(bullet) {
    bullet.x += Math.cos(bullet.angle / 4) * bullet.bulletSpeed / 2;
    bullet.y += Math.sin(bullet.angle / 3) * bullet.bulletSpeed / 2;
}

function fortressReverse(bullet) {
    bullet.x -= Math.cos(bullet.angle / 4) * bullet.bulletSpeed / 2;
    bullet.y -= Math.sin(bullet.angle / 3) * bullet.bulletSpeed / 2;
}