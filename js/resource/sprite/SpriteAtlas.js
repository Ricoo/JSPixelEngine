import {Sprite} from "./Sprite";
import {Vector2} from "../../engine/math/Vector2";
import {ImageFactory} from "./ImageFactory";

let SpriteAtlas = class SpriteAtlas extends Sprite {
    constructor(src, name, size, callback, atlas) {
        super(src, name, size, () => {this._build();});

        this._dimensions = new Vector2(atlas[0], atlas[1]);
        this._callback = callback;
    }

    /**
     * @desc builds the atlas by slicing every sprite of the global image into individual images
     * @private
     */
    _build() {
        let partW = this.width / this._dimensions.x;
        let partH = this.height / this._dimensions.y;
        for (let y = 0; y < this._dimensions.y; y++) {
            for (let x = 0; x < this._dimensions.x; x++) {
                this[y * this._dimensions.x + x] =
                    ImageFactory.cut(this.image,
                        new Vector2(x * partW, y * partH),
                        new Vector2((x + 1) * partW, (y + 1) * partH));
            }
        }
        this._width = partW;
        this._height = partH;
        this._callback();
    }

    /**
     * @desc returns the tile at given index
     * @param id : number, the index of the wanted tile
     */
    tile(id){
        if (id < 0 || id > this._dimensions.x * this._dimensions.y) {
            throw RangeError("There is no sprite at position " + id);
        }
        return this[id];
    }
};

export {SpriteAtlas};