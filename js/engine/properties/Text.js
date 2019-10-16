import Property from "./Property";
import Vector2 from "../math/Vector2";
import {TextType} from "../../enum/TextType";
import {TextAlign} from "../../enum/TextAlign";

export default class Text extends Property {
    constructor(txt, offset=new Vector2(0,0), font="Arial", size=20, color="black", type=TextType.fill, align=TextAlign.start) {
        super();
        this.name = "text";
        this._text = txt;
        this._offset = offset;
        this._font = font;
        this._size = size;
        this._color = color;
        this._type = type;
        this._align = align;
    }

    write(context) {
        context.save();
        context.font = this._size + "px " + this._font;
        context.textAlign = this._align;
        context.fillStyle = this._color;
        if (Array.isArray(this._text)) {
            for (let line = 0; line < this._text.length; line++) {
                context[this._type](this._text[line], this._gameObject.position.x + this._offset.x,
                                          this._gameObject.position.y + this._offset.y + this.size * line);
            }

        }
        else {
            context[this._type](this._text, this._gameObject.position.x + this._offset.x, this._gameObject.position.y + this._offset.y);
        }
        context.restore()
    }

    get text() {return this._text;}
    set text(value) {this._text = value}
    get offset() {return this._offset;}
    set offset(value) {this._offset = value}
    get font() {return this._font;}
    set font(value) {this._font = value}
    get size() {return this._size;}
    set size(value) {this._size = value}
    get color() {return this._color;}
    set color(value) {this._color = value}
    get type() {return this._type;}
    set type(value) {this._type = value}
    get align() {return this._align;}
    set align(value) {this._align = value}


};
