import {GameObject} from "../GameObject";
import {Layer} from "../../Enum/Layer";
import {Graphic} from "../Properties/Graphic";

let GUIButton = class GUIButton extends GameObject {
    constructor(sprite, name, text, posX, posY, scale = 1.0, textColor = "black", fontSize = 30) {
        super(sprite, name, Layer.GUI, posX, posY, scale);

        this._text = text;
        this._fontSize = fontSize;
        this._textColor = textColor;
        this.attach(new Graphic(sprite, Layer.GUI))
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