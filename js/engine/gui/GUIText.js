import GUIObject from "./GUIObject";
import Text from "../properties/Text";
import Graphic from "../properties/Graphic";
import {Layer} from "../../enum/Layer";
import {Values} from "../../enum/Values";

export default class GUIText extends GUIObject {
    constructor(name, text, x, y, layer=Layer.GUI) {
        super(name, x, y);
        this._text = new Text(text);
        this.attach(new Graphic(Values.EMPTY_IMAGE.name, layer));
        this.attach(this._text);
    }

    get text() {return this._text};
    set text(value) {
        this._text.text = value;
    }
};
