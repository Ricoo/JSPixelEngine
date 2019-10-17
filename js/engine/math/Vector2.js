export default class Vector2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * @desc adds the values of a given Vector2 to this one
     * @param {Vector2} other the vector we want to add the values from
     * @returns {Vector2}
     */
    add(other) {
        this._x += other.x;
        this._y += other.y;
        return this;
    }

    /**
     * @desc returns a fresh copy of this Vector2
     * @returns {Vector2}
     */
    get copy() {return new Vector2(this._x, this._y);}
    get x() {return this._x;}
    set x(value) {this._x = value;}
    get y() {return this._y;}
    set y(value) {this._y = value;}
};
