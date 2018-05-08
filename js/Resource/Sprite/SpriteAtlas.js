import {Sprite} from "./Sprite";
import {Vector2} from "../../Engine/Vector2";
import {ImageFactory} from "./ImageFactory";

let SpriteAtlas = class SpriteAtlas extends Sprite {
    constructor(src, name, size, callback, atlas) {
        super(src, name, size, () => {this._build();});

        this._dimensions = new Vector2(atlas[0], atlas[1]);
        this._current = 0;
        this._callback = callback;
        this._partW = this.width / this._dimensions.x;
        this._partH = this.height / this._dimensions.y;
        this._sprites = this._dimensions.x * this._dimensions.y;
    }

    _build() {
        for (let y = 0; y < this._dimensions.y; y++) {
            for (let x = 0; x < this._dimensions.x; x++) {
                this[y * this._dimensions.x + x] =
                    ImageFactory.cut(this.image,
                        new Vector2(x * this._partW, y * this._partH),
                        new Vector2((x + 1) * this._partW, (y + 1) * this._partH));
            }
        }
        this._callback();
    }

    draw(context, posX, posY, size = 1) {
        context.drawImage(this[this._current], 0,0,
            this._partW,this._partH,
            posX,posY,
            size*this._partW,size*this._partH);
    }

    set tileId(id) {this._current = id;}
    get tileId() {return this._current;}

    next() {
        this._current += 1;
        if (this._current >= this._sprites) {
            this._current = 0;
        }
    }

    prev() {
        this._current += 1;
        if (this._current < 0) {
            this._current = this._sprites - 1;
        }
    }
};

export {SpriteAtlas};