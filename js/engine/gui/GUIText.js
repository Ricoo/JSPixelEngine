import GameObject from "../GameObject.js";
import Text from "../properties/Text.js";
import Graphic from "../properties/Graphic.js";
import {Layer} from "../../enum/Layer.js";
import {Values} from "../../enum/DefaultValues.js";

export default class GUIText extends GameObject {
    constructor(name, text, x, y, layer=Layer.GUI) {
        super(name, x, y);
        this._text = new Text(text);
        this.attach(new Graphic(DefaultValues.EMPTY_IMAGE.name, layer));
        this.attach(new Text(text));
    }

    get txt() {return this.text.text};
    set txt(value) {
        this.text.text = value;
    }
};
