import GameObject from "../GameObject.js";
import Text from "../properties/Text.js";
import {Layer} from "../../enum/Layer.js";
import ResourceManager from "../../resource/ResourceManager.js";

export default class GUIText extends GameObject {
    constructor(name, text, x, y, style=ResourceManager.getStyle("DEFAULT_STYLE"), layer=Layer.GUI) {
        super(name, x, y, layer);
        this._text = new Text(text, style);
        this.attach(this._text);
    }

    get txt() {return this.text.text};
    set txt(value) {
        this.text.text = value;
    }
};
