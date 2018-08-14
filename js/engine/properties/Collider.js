import {Property} from "./Property";

let Collider = class Collider extends Property {
    constructor(width, height) {
        super();
        this.name = "collider";
        this._width = width;
        this._height = height;
    }

    collide(self, other) {
        //TODO implement hitbox detection
        return true;
    }

    raycast(x, y) {
        //TODO implement raycasting
        return true;
    }

    // raycast(x, y) {
    //     if (x === undefined || y === undefined) {return false;}
    //     return (x > this._x && x < this._x + this._scale * this._sprite.res.x &&
    //         y > this._y && y < this._y + this._scale * this._sprite.res.y
    //     );
    // }
};

export {Collider};