import {Properties} from "./Properties";

let Graphic = class Graphic extends Properties {
    constructor(sprite, layer, scale=1.0) {
        super();
        this.name = "graphic";
        this._sprite = sprite;
        this._layer = layer;
        this._scale = scale;
        this._visible = true;
    }

    draw(context) {
        if (this._visible)
            this._sprite.draw(context, this._gameObject.position.x, this._gameObject.position.y, this._scale);
    }

    set scale(s) {this._scale = s;}
    get scale() {return this._scale;}

    get layer(){return this._layer;}
    get sprite(){return this._sprite;}

    get visible(){return this._visible;}
    set visible(v){this._visible = v;}
};

export {Graphic};