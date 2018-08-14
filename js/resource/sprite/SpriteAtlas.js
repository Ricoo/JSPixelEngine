import {Sprite} from "./Sprite";
import {Vector2} from "../../engine/math/Vector2";
import {ImageFactory} from "./ImageFactory";

let SpriteAtlas = class SpriteAtlas extends Sprite {
    constructor(src, name, size, callback, atlas) {
        super(src, name, size, () => {this._build();});

        this._dimensions = new Vector2(atlas[0], atlas[1]);
        this._tile = 0;
        this._callback = callback;
        this._partW = this.width / this._dimensions.x;
        this._partH = this.height / this._dimensions.y;
        this._sprites = this._dimensions.x * this._dimensions.y;
    }

    /**
     * @desc builds the atlas by slicing every sprite of the global image into individual images
     * @private
     */
    _build() {
        for (let y = 0; y < this._dimensions.y; y++) {
            for (let x = 0; x < this._dimensions.x; x++) {
                this[y * this._dimensions.x + x] =
                    ImageFactory.cut(this.image,
                        new Vector2(x * this._partW, y * this._partH),
                        new Vector2((x + 1) * this._partW, (y + 1) * this._partH));
            }
        }
        this._width = this._partW;
        this._height = this._partH;
        this._callback();
    }

    /**
     * @desc draws the current sprite in our canvas
     * @param context : CanvasRenderingContext2D
     * @param posX : number
     * @param posY : number
     * @param size : number, the scale of our image
     */
    draw(context, posX, posY, size = 1) {
        context.drawImage(this[this._tile], 0,0,
            this._partW,this._partH,
            posX,posY,
            size*this._partW,size*this._partH);
    }

    set tileId(id) {
        if (id < 0 || id > this._sprites) {
            throw RangeError("There is no sprite at position " + id);
        }
        this._tile = id;
    }
    get tileId() {return this._tile;}
};

export {SpriteAtlas};