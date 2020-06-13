import GameObject from "../GameObject.js";
import Graphic from "../properties/Graphic.js";
import {Layer} from "../../enum/Layer.js";

export default class GUIImage extends GameObject {
    constructor(name, x, y, sprite, layer=Layer.GUI) {
        super(name, x, y);
        this.attach(new Graphic(sprite, layer));
    }
}