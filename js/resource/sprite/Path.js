import Vector2 from "../../engine/math/Vector2.js";
import ResourceManager from "../ResourceManager.js";
import ImageFactory from "./ImageFactory.js";
import Sprite from "./Sprite.js";

export default class Path {
    constructor(src, name, res, stroke, fill) {
        this._src = src;
        this._name = name;
        this._res = new Vector2(...res);
        this._path = new Path2D(this._src);
        this._stroke = stroke || 'black'
        this._fill = fill || 'rgba(0,0,0,0)'
    }

    get(x, y, lineWidth, strokeColor=this._stroke, fillColor=this._fill) {
        let name = `${this._name}:${x}x${y}:${lineWidth}:${strokeColor}:${fillColor}`
        let sprite = ResourceManager.getSprite(name);
        if (sprite) {
            return name;
        }
        sprite = new Sprite(
            ImageFactory.buildPath(
                this._path,
                new DOMMatrixReadOnly().scale(x / this._res.x, y / this._res.y),
                new Vector2(x, y),
                lineWidth,
                strokeColor,
                fillColor
            ),
            name,
            [x, y],
            ()=>{}
        );
        ResourceManager.addSprite(sprite);
        return name;
    }

    get name() {return this._name}
}