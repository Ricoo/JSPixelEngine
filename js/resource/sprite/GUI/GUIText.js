import {GameObject} from "../../../engine/GameObject";
import {Layer} from "../../../enum/Layer";

let GUIText = class GUIText extends GameObject {
    constructor(name, text, posX, posY, textAlign = "left", textColor = "black", fontSize = 30) {
        super(null, name, Layer.ABOVEGUI, posX, posY);

        this._text = text;
        this._align = textAlign;
        this._textColor = textColor;
        this._fontSize = fontSize;
    }

    draw(context) {
        context.fillStyle = this._textColor;
        context.font = this._fontSize + "px Comic Sans MS";
        context.textAlign = this._align;
        context.textBaseline="middle";
        context.fillText(this._text,this._x , this._y);
        context.font = "30px Comic Sans MS";
    }
};

export {GUIText};