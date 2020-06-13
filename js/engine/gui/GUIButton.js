import GameObject from "../GameObject.js";
import Graphic from "../properties/Graphic.js";
import Collider from "../properties/Collider.js";
import Vector2 from "../math/Vector2.js";
import {Layer} from "../../enum/Layer.js";
import {Trigger} from "../../enum/Trigger.js";

export default class GUIButton extends GameObject {
    constructor(name, spriteName, x, y, callback=()=>{}, layer=Layer.GUI, scale=1.0) {
        super(name, x, y);
        this.attach(new Graphic(spriteName, layer,scale));
        let sprite = this["graphic"].sprite;
        this.attach(new Collider(new Vector2(sprite.width*scale,sprite.height*scale),undefined,callback,Trigger.CLICK))
    }
};
