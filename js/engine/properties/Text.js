import Property from "./Property.js";
import Vector2 from "../math/Vector2.js";
import {TextType} from "../../enum/TextType.js";
import {TextAlign} from "../../enum/TextAlign.js";

export default class Text extends Property {
    text;
    offset;
    font;
    type;
    color;
    size;
    align;
    _valueType = {
        text:"String",
        offset:"Vector2",
        font:"String",
        type:"TextType",
        color:"String",
        size:"Number",
        align:"TextAlign"
    };
    /**
     * @desc this is a text property we can add on an object for it to display said text on draw
     * @param {string|string[]} txt the text we want to display
     * @param {Vector2} offset the offset with which we want to start writing
     * @param {string} font the css font we want to use
     * @param {number} size the css size of our text
     * @param {string} color the css color we want to use
     * @param {TextType} type whether we want to fill or stroke our text
     * @param {TextAlign} align the alignment of our text
     */
    constructor(txt="", offset=new Vector2(0,0), font="Arial", size=20, color="black", type=TextType.fill, align=TextAlign.start) {
        super();
        this._PROPERTY_NAME = "text";
        this.text = txt;
        this.offset = offset;
        this.font = font;
        this.size = size;
        this.color = color;
        this.type = type;
        this.align = align;
    }

    /**
     * @desc writes the text set in this object and if the text is an array, writes several lines
     * @param {CanvasRenderingContext2D} context
     */
    write(context) {
        context.save();
        context.font = this.size + "px " + this.font;
        context.textAlign = this.align;
        context.fillStyle = this.color;
        if (Array.isArray(this._text)) {
            for (let line = 0; line < this.text.length; line++) {
                context[this.type](this.text[line], this._gameObject.position.x + this.offset.x,
                                          this._gameObject.position.y + this.offset.y + this.size * line);
            }
        }
        else {
            context[this.type](this.text, this._gameObject.x + this.offset.x, this._gameObject.y + this.offset.y);
        }
        context.restore()
    }

    getDimensions(context) {
        context.save();
        context.font = this._size + "px " + this.font;
        context.textAlign = this.align;
        context.fillStyle = this.color;
        let dimensions = new Vector2(context.measureText(this.text).width, this.size);
        context.restore();
        return dimensions;
    }
};
