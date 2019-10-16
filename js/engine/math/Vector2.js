export default class Vector2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    add(other) {
        this._x += other.x;
        this._y += other.y;
        return this;
    }

    get copy() {return new Vector2(this._x, this._y);}
    get x() {return this._x;}
    set x(value) {this._x = value;}
    get y() {return this._y;}
    set y(value) {this._y = value;}
};
