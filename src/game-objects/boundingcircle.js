class BoundingCircle {

    constructor(xCenter, yCenter, radius) {
        Object.assign(this, { xCenter, yCenter, radius });
    }

    /**
     * Given another hitbox check if they are colliding
     * Checks if the combined radius of the two circle hitboxes
     * is less than the distance between the hitboxes 
     * @param {Hitbox} other 
     */
    collide(other) {
        //pythagoream theorem a^2 + b^2 = c^2
        const xDist = this.xCenter - other.xCenter;
        const yDist = this.yCenter - other.yCenter;
        //dist = c^2
        const dist = (xDist * xDist) + (yDist * yDist);
        //combined radius of the two circles
        const radiusTotal = this.radius + other.radius;  
        //c^2 < r^2 === c < r
        //sqrt is logn so it's faster to square radius distance and compare
        return dist <= (radiusTotal * radiusTotal);
    }
}

