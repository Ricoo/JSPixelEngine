import GUIObject from "./GUIObject";
import Text from "../properties/Text";
import {Layer} from "../../enum/Layer";

export default class GUIText extends GUIObject {
    constructor(name, text, x, y, layer=Layer.GUI, scale=1.0) {
        super(name, x, y);
        this._text = new Text(text);
        this.attach(this._text);
    }

    get text() {return this._text};
    set text(value) {
        this._text.text = value;
    }
};
