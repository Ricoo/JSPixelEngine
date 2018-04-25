import {Properties} from "./Properties";

let Graphic = class Graphic extends Properties {
    constructor(sprite, layer) {
        super();
        this.name = "graphic";
        this._sprite = sprite;
        this._layer = layer;
    }

    draw(context, scale = 1.0) {
        this._sprite.draw(context, this._gameObject.x, this._gameObject.y, scale);
    }

    get layer(){return this._layer;}
};

export {Graphic};