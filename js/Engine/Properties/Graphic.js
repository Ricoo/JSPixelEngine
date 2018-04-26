import {Properties} from "./Properties";

let Graphic = class Graphic extends Properties {
    constructor(sprite, layer, scale=1.0) {
        super();
        this.name = "graphic";
        this._sprite = sprite;
        this._layer = layer;
        this._scale = scale;
    }

    draw(context) {
        this._sprite.draw(context, this._gameObject.position.x, this._gameObject.position.y, this._scale);
    }

    set scale(s) {this._scale = s;}
    get scale() {return this._scale;}

    get layer(){return this._layer;}
    get sprite(){return this._sprite;}
};

export {Graphic};