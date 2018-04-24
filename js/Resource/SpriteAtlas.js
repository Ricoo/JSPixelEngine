import {Sprite} from "./Sprite";

let SpriteAtlas = class SpriteAtlas extends Sprite {
    constructor(src, name, size, callback, sliceX,sliceY) {
        super(src, name, size, callback);

        this._dimensions = {x:sliceX,y:sliceY};
    }
};

export {SpriteAtlas};