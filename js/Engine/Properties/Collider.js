import {Properties} from "./Properties";

let Collider = class Collider extends Properties {
    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
    }

    collide(self, other) {
        return true;
    }
};

export {Collider};