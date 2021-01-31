class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    // Returns true if there is a collision between 2 bounding boxes
    // Returns false otherwise
    collide(oth) {
        return this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top
    };
};