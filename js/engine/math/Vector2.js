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
     * @desc multiplies the vector by provided value
     * @param {number} number the value to multiply the vector with
     * @returns {Vector2} the updated vector
     */
    mult(number) {
        this.x *= number;
        this.y *= number;
        return this
    }

    /**
     * @desc returns a fresh copy of this Vector2
     * @returns {Vector2}
     */
    get copy() {return new Vector2(this.x, this.y);}

    /**
     * @desc returns the length this Vector2
     * @returns {number}
     */
     get length() {return Math.sqrt(this.x**2 + this.y**2)}

    /**
     * @desc returns a directional vector with length 1
     * @returns {Vector2}
     */
    get normalize() {
        if (this.x === 0 && this.y === 0) {
            return new Vector2(0,0);
        }
        return new Vector2(this.x, this.y).mult(1/this.length);
    }

    /**
     * @desc returns a directional vector with values either 0, -1 and 1
     * @returns {Vector2}
     */
     get cardinal() {
        const {x, y} = this
        return new Vector2(
            (x > 0 ? 1 : x < 0 ? -1 : 0),
            (y > 0 ? 1 : y < 0 ? -1 : 0)
            )
    }
};
