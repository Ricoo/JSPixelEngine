import {Properties} from "./Properties";
import {ResourceManager} from "../../Resource/ResourceManager";

let Graphic = class Graphic extends Properties {
    constructor(spriteName, layer, scale=1.0, alpha=1.0) {
        super();
        this.name = "graphic";
        this._sprite = ResourceManager.getSprite(spriteName);
        this._layer = layer;
        this._scale = scale;
        this._visible = true;
        this._alpha = alpha;
    }

    draw(context) {
        if (this._visible) {
            context.save();
            context.globalAlpha = this._alpha;
            context.translate(this._gameObject.position.x ,this._gameObject.position.y);
            context.rotate(this._gameObject.angle*Math.PI/180);
            this._sprite.draw(context, -this._sprite.width/2 * this._scale, -this._sprite.height/2 * this._scale, this._scale);
            context.restore();
        }
    }

    set scale(s) {this._scale = s;}
    get scale() {return this._scale;}

    set alpha(a) {this._alpha = (a > 1.0 ? 1.0 : (a < 0.0 ? 0.0 : a));}
    get alpha() {return this._alpha;}

    get layer(){return this._layer;}
    get sprite(){return this._sprite;}

    get visible(){return this._visible;}
    set visible(v){this._visible = v;}
    toggle(){this._visible = !this._visible;}
};

export {Graphic};