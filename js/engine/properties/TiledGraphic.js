import Graphic from "./Graphic.js";
import SpriteAtlas from "../../resource/sprite/SpriteAtlas.js";
import {DefaultValues} from "../../enum/DefaultValues.js";
import {Layer} from "../../enum/Layer.js";

export default class TiledGraphic extends Graphic {
    start;
    middle;
    end;
    amount;
    _valueType = {
        sprite:"Sprite",
        layer:"Layer",
        start:"Number",
        middle:"Number",
        end:"Number",
        scale:"Number",
        visible:"Boolean",
        amount:"3"
    };
    /**
     * @desc inherits from Graphic property
     * @param {string} spriteName inherited
     * @param {Layer} layer inherited
     * @param {number} scale inherited
     * @param {number} startingTile the starting tile
     * @param {number} middleTile the repeated tile
     * @param {number} endTile the ending tile
     * @param {number} amount the number of repeats
     */
    constructor(spriteName=DefaultValues.EMPTY_IMAGE.name, scale=1, startingTile=0, middleTile=1, endTile=2, amount=3) {
        super(spriteName, scale, [...arguments].slice(3, arguments.length - 1));
        if (!this.sprite instanceof SpriteAtlas) {
            throw TypeError("Cannot have a TiledGraphic without a SpriteAtlas !");
        }
        this._start = startingTile;
        this._middle = middleTile;
        this._end = endTile;
        this.amount = amount;
    }

    //TODO make the graphic extendable in both directions using a matrix

    draw(context) {
        if (this.visible) {
            for (let i = 0; i < this.amount; i++) {
                context.save();
                context.globalAlpha = this._alpha;
                context.translate(this._gameObject.x + this.sprite.width * this.scale * (i - this.amount/2 + 0.5), this._gameObject.y);
                context.rotate(this._gameObject.angle*Math.PI/180);
                context.drawImage(this.sprite.tile((i === 0 ? this._start : (i === this.amount - 1 ? this._end : this._middle))), 0, 0, this.sprite.width, this.sprite.height,
                                -this.sprite.width/2 * this.scale,
                                -this.sprite.height/2 * this.scale,
                                this.scale*this.sprite.width,this.scale*this.sprite.height);
                context.restore();
            }
        }
    }
}