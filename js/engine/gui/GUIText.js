import GameObject from "../GameObject";
import Text from "../properties/Text";
import Graphic from "../properties/Graphic";
import {Layer} from "../../enum/Layer";
import {Values} from "../../enum/Values";

export default class GUIText extends GameObject {
    constructor(name, text, x, y, layer=Layer.GUI) {
        super(name, x, y);
        this._text = new Text(text);
        this.attach(new Graphic(Values.EMPTY_IMAGE.name, layer));
        this.attach(new Text(text));
    }

    get txt() {return this.text.text};
    set txt(value) {
        this.text.text = value;
    }
};
