function downSpiral(bullet) {
    bullet.x += (bullet.angle) * Math.cos(bullet.angle);
    bullet.y +=  (bullet.angle) * Math.sin(bullet.angle) + bullet.bulletSpeed;
}

function downSpiralReverse(bullet) {
    bullet.x -= (bullet.angle) * Math.cos(bullet.angle);
    bullet.y +=  (1 + bullet.angle) * Math.sin(bullet.angle) + bullet.bulletSpeed;
}

function archimedes(bullet) {
    bullet.x += Math.cos(bullet.angle) * (1 + bullet.angle);
    bullet.y += Math.sin(bullet.angle) * (1 + bullet.angle);
}

function archimedesReverse(bullet) {
    bullet.x -= Math.cos(bullet.angle) * (1 + bullet.angle);
    bullet.y -= Math.sin(bullet.angle) * (1 + bullet.angle);
}

function line(bullet) {
    bullet.x += Math.cos(bullet.angle * Math.PI / 180) * bullet.bulletSpeed;
    bullet.y -= Math.sin(bullet.angle * Math.PI / 180) * bullet.bulletSpeed;
}