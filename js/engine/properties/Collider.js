import Property from "./Property";
import Vector2 from "../math/Vector2";
import {Trigger}from "../../enum/Trigger";

export default class Collider extends Property {
    constructor(width, height, callback=()=>{}, trigger=Trigger.COLLIDER, rigid=false) {
        super();
        this.name = "collider";
        this._width = width;
        this._height = height;
        this._callback = callback;
        this._trigger = trigger;
        this._rigid = rigid;
    }

    collide(other) {
        let posThis = this.gameObject.position.copy.add(new Vector2(-this._width/2,-this._height/2));
        let posOther = other.gameObject.position.copy.add(new Vector2(-other._width/2,-other._height/2));
        if (!(posOther.x > posThis.x + this._width ||
            posOther.x + other._width < posThis.x ||
            posOther.y > posThis.y + this._height ||
            posOther.y + other._height < posThis.y)) {
            this._callback(this, other);
            other._callback(other, this);
            return true;
        }
        return false;
    }

    raycast(x, y) {
        let pos = this.gameObject.position;
        if (x > pos.x - this._width / 2 &&
            x < pos.x + this._width / 2 &&
            y > pos.y - this._height / 2 &&
            y < pos.y + this._height / 2) {
            this._callback(this);
            return true;
        }
        return false;
        // return (x > pos.x - this._width / 2 &&
        //         x < pos.x + this._width / 2 &&
        //         y > pos.y - this._height / 2 &&
        //         y < pos.y + this._height / 2);
    }

    show(context) {
        let pos = this.gameObject.position;
        context.beginPath();
        context.strokeStyle = "#00FF00";
        context.rect(pos.x - this._width / 2, pos.y - this._height / 2, this._width, this._height);
        context.stroke();
        context.closePath();
    }

    get trigger() {return this._trigger}
    set trigger(value) {this._trigger = value}
};
