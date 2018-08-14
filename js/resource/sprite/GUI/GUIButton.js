import {GameObject} from "../../../engine/GameObject";
import {Layer} from "../../../enum/Layer";
import {Graphic} from "../../../engine/properties/Graphic";
import {Collider} from "../../../engine/properties/Collider";

let GUIButton = class GUIButton extends GameObject {
    constructor(sprite, name, text, posX, posY, scale = 1.0, textColor = "black", fontSize = 30) {
        super(sprite, name, Layer.GUI, posX, posY, scale);

        this._text = text;
        this._fontSize = fontSize;
        this._textColor = textColor;
//        this.attach(new Graphic(sprite, Layer.GUI));
        this.attach(new Collider(sprite.width, sprite.height));
    }

    /**
     * @deprecated because the graphic rework made it incoherent
     */
    draw(context) {
        super.draw(context);
        context.fillStyle = this._textColor;
        context.font = this._fontSize + "px Comic Sans MS";
        context.textAlign = "center";
        context.textBaseline="middle";
        context.fillText(this._text,this.position.x + this.sprite.width * this._scale / 2, this.position.y + this.sprite.height * this._scale / 2);
    }

    /**
     * @deprecated because the collider system made it incoherent
     */
    raycast(x, y) {
        return super.raycast(x, y);
    }
};

export {GUIButton};