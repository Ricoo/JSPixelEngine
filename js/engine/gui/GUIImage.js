import GameObject from "../GameObject";
import Graphic from "../properties/Graphic";
import {Layer} from "../../enum/Layer";

export default class GUIImage extends GameObject {
    constructor(name, x, y, sprite, layer=Layer.GUI) {
        super(name, x, y);
        this.attach(new Graphic(sprite, layer));
    }
}