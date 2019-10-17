import Property from "./Property";
import ResourceManager from "../../resource/ResourceManager";

export default class Graphic extends Property {
    /**
     * @desc the displayable format of property, allowing us to show our GameObject
     * @param {string} spriteName the identifying string of the desired sprite
     * @param {Layer} layer the layer we want our sprite to be drawn at
     * @param {number} scale the display scale
     * @param {number} alpha the transparency of our display
     * @param {number} tile if we plan on using a SpriteAtlas, the tile id of our sprite within the atlas
     */
    constructor(spriteName, layer, scale=1.0, alpha=1.0, tile=0) {
        super();
        this.name = "graphic";
        this._sprite = ResourceManager.getSprite(spriteName);
        this._layer = layer;
        this._scale = scale;
        this._visible = true;
        this._alpha = alpha;
        this._tile = tile;
        this._image = this._sprite.tile(tile);
    }

    /**
     * @desc draws the current sprite to the context
     * @param {CanvasRenderingContext2D} context CanvasRenderingContext2D, the 2d context of our canvas
     */
    draw(context) {
        if (this._visible) {
            context.save();
            context.globalAlpha = this._alpha;
            context.translate(this._gameObject.position.x ,this._gameObject.position.y);
            context.rotate(this._gameObject.angle*Math.PI/180);
            context.drawImage(this._image, 0,0, this._sprite.width,this._sprite.height, -this._sprite.width/2 * this._scale,-this._sprite.height/2 * this._scale, this._scale*this._sprite.width,this._scale*this._sprite.height);
            context.restore();
        }
    }

    get tile() {return this._tile;}
    set tile(id) {this._tile = id;}
    get image() {return this._image;}
    set image(i) {this._image = i;}
    set scale(s) {this._scale = s;}
    get scale() {return this._scale;}
    set alpha(a) {this._alpha = (a > 1.0 ? 1.0 : (a < 0.0 ? 0.0 : a));}
    get alpha() {return this._alpha;}
    get layer(){return this._layer;}
    get sprite(){return this._sprite;}
    set sprite(s){this._sprite = s;}
    get visible(){return this._visible;}
    set visible(v){this._visible = v;}
    toggle(){this._visible = !this._visible;}
};
