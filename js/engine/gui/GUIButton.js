import {GUIObject} from "./GUIObject";
import {Graphic} from "../properties/Graphic";
import {Layer} from "../../enum/Layer";
import {Collider} from "../properties/Collider";
import {Trigger} from "../../enum/Trigger";

let GUIButton = class GUIButton extends GUIObject {
    constructor(name, spriteName, x, y, callback=()=>{}, layer=Layer.GUI, scale=1.0) {
        super(name, x, y);
        this.attach(new Graphic(spriteName, layer,scale));
        let sprite = this.property("graphic").sprite;
        this.attach(new Collider(sprite.width*scale,sprite.height*scale,callback,Trigger.CLICK))
    }
};

export {GUIButton};