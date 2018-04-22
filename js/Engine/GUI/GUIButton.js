import {Drawable} from "../Drawable";
import {Layer} from "../../Enum/Layer";

let GUIButton = class GUIButton extends Drawable {
    constructor(sprite, name, text, posX, posY, scale = 1, textColor = "black", fontSize = 30) {
        super(sprite, name, Layer.GUI, posX, posY, scale);

        this._text = text;
        this._fontSize = fontSize;
        this._textColor = textColor;
    }

    draw(context) {
        super.draw(context);
        context.fillStyle = this._textColor;
        context.font = this._fontSize + "px Comic Sans MS";
        context.textAlign = "center";
        context.textBaseline="middle";
        context.fillText(this._text,this._x + this.sprite.width * this._scale / 2, this._y + this.sprite.height * this._scale / 2);
    }

    raycast(x, y) {
        return super.raycast(x, y);
    }
};

export {GUIButton};