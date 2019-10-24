import Graphic from "./Graphic";
import SpriteAtlas from "../../resource/sprite/SpriteAtlas";

export default class TiledGraphic extends Graphic {
    constructor(spriteName, layer, scale, startingTile, middleTile, endTile, amount) {
        super(spriteName, layer, scale);
        if (!this._sprite instanceof SpriteAtlas) {
            throw TypeError("Cannot have a TiledGraphic without a SpriteAtlas !");
        }
        this._start = startingTile;
        this._middle = middleTile;
        this._end = endTile;
        this._amount = amount;
        console.log(this._amount);
    }

    //TODO make the graphic extendable in both directions

    draw(context) {
        if (this._visible) {
            for (let i = 0; i < this._amount; i++) {
                context.save();
                context.globalAlpha = this._alpha;
                context.translate(this._gameObject.position.x + this._sprite.width * this._scale * (i - this._amount/2 + 0.5), this._gameObject.position.y);
                context.rotate(this._gameObject.angle*Math.PI/180);
                context.drawImage(this._sprite.tile((i === 0 ? this._start : (i === this._amount - 1 ? this._end : this._middle))), 0, 0, this._sprite.width, this._sprite.height,
                                -this._sprite.width/2 * this._scale,
                                -this._sprite.height/2 * this._scale,
                                this._scale*this._sprite.width,this._scale*this._sprite.height);
                context.restore();
            }
        }
    }

    get amount() {return this._amount;}
    set amount(value) {this._amount = value;}
}