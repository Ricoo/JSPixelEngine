import Property from "./Property";
import ResourceManager from "../../resource/ResourceManager";

export default class Graphic extends Property {
    sprite;
    layer;
    tile;
    scale;
    image;
    visible = true;
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
        this._PROPERTY_NAME = "graphic";
        this.sprite = ResourceManager.getSprite(spriteName);
        this.layer = layer;
        this.scale = scale;
        this._alpha = alpha;
        this.tile = tile;
        this.image = this.sprite.tile(tile);
    }

    /**
     * @desc draws the current sprite to the context
     * @param {CanvasRenderingContext2D} context CanvasRenderingContext2D, the 2d context of our canvas
     */
    draw(context) {
        if (this.visible) {
            context.save();
            context.globalAlpha = this._alpha;
            context.translate(this._gameObject.position.x ,this._gameObject.position.y);
            context.rotate(this._gameObject.angle*Math.PI/180);
            context.drawImage(this.image, 0,0, this.sprite.width,this.sprite.height, -this.sprite.width/2 * this.scale,-this.sprite.height/2 * this.scale, this.scale*this.sprite.width,this.scale*this.sprite.height);
            context.restore();
        }
    }

    set alpha(a) {this._alpha = (a > 1.0 ? 1.0 : (a < 0.0 ? 0.0 : a));}
    get alpha() {return this._alpha;}
    toggle(){this.visible = !this.visible;}
};
