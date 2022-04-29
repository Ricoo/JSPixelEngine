import Property from "./Property.js";
import Vector2 from "../math/Vector2.js";
import {TextType} from "../../enum/TextType.js";
import {TextAlign} from "../../enum/TextAlign.js";
import ResourceManager from "../../resource/ResourceManager.js";
import ImageFactory from "../../resource/sprite/ImageFactory.js";
import JSPixelCanvas from "../JSPixelCanvas.js";

export default class Text extends Property {
    _text;
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
     * @param {font: string, size: number, color: string, type: TextType, align: TextAlign} style the style to use
     * @param {Vector2} offset the offset with which we want to start writing
     */
    constructor(txt="", {font, size, color, type, align} = ResourceManager.getStyle("DEFAULT_STYLE"), offset=new Vector2(0,0)) {
        super();
        this._PROPERTY_NAME = "text";
        this._text = txt;
        this.offset = offset;
        this.font = font;
        this.size = size;
        this.color = color;
        this.type = type;
        this.align = align;
        this.rendered = ImageFactory.renderText(this)
    }

    /**
     * @desc writes the text set in this object and if the text is an array, writes several lines
     * @param {CanvasRenderingContext2D} context
     */
    write(context) {
        context.save();
        context.translate(this._gameObject.position.x ,this._gameObject.position.y);
        context.rotate(this._gameObject.angle*Math.PI/180);
        let posX = 0;
        switch(this.align) {
            case "right":
                posX = -this.rendered.width
            case "center":
                posX = -this.rendered.width/2
        }
        context.drawImage(this.rendered, 0,0,
            this.rendered.width, this.rendered.height,
            posX + this.offset.x ,
            -this.rendered.height/2 + this.offset.y, this.rendered.width, this.rendered.height);
        context.restore();
}

    getDimensions(context = JSPixelCanvas.context()) {
        context.save();
        context.font = this.size + "px " + this.font;
        context.textAlign = this.align;
        context.fillStyle = this.color;
        const {width, fontBoundingBoxAscent, fontBoundingBoxDescent} = context.measureText(this._text)
        let dimensions = new Vector2(width, (fontBoundingBoxAscent + fontBoundingBoxDescent) * (Array.isArray(this._text) ? this._text.length : 1));
        context.restore();
        return dimensions;
    }

    setStyle(style) {
        Object.keys(ResourceManager.getStyle("DEFAULT_STYLE")).forEach(key => {
            this[key] = style[key] || this[key]
        })
        this.updateRender()
    }

    updateRender() {
        console.log(this.size)
        this.rendered = ImageFactory.renderText(this)
    }

    get dimensions() {return this.getDimensions()}
    get text() {return this._text;}
    set text(txt) {
        this._text=txt;
        this.updateRender();
    }
};
