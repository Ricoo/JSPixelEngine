export default class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * @desc adds the values of a given Vector2 to this one
     * @param {Vector2} other the vector we want to add the values from
     * @returns {Vector2}
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    /**
     * @desc subtracts the values of a given Vector2 to this one
     * @param {Vector2} other the vector we want to add the values from
     * @returns {Vector2}
     */
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    /**
     * @desc returns a fresh copy of this Vector2
     * @returns {Vector2}
     */
    get copy() {return new Vector2(this.x, this.y);}

    /**
     * @desc returns a directional vector with values between -1 and 1
     * @returns {Vector2}
     */
    get normalize() {return new Vector2(
        (this.x > 0 ? 1 : (this.x < 0 ? -1 : 0)),
        (this.y > 0 ? 1 : (this.y < 0 ? -1 : 0)));
    }
};
