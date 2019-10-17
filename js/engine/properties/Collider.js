import Property from "./Property";
import Vector2 from "../math/Vector2";
import {Trigger} from "../../enum/Trigger";

export default class Collider extends Property {
    /**
     * @desc a collider to detect any collision or hit for event triggering or interaction
     * @param {number} width the width of our collider
     * @param {number} height the height of our collider
     * @param {function} callback the callback to run if our collider is triggered
     * @param {Trigger} trigger the triggering type for our collider
     * @param {boolean} rigid whether our collider is physical or not
     */
    constructor(width, height, callback=()=>{}, trigger=Trigger.COLLIDER, rigid=false) {
        super();
        this.name = "collider";
        this._width = width;
        this._height = height;
        this._callback = callback;
        this._trigger = trigger;
        this._rigid = rigid;
    }

    /**
     * @desc checks whether this collider and the collider given in parameter
     * are overlapping and runs the callback for both colliders if needed
     * @param {Collider} other the second collider we are checking
     * @returns {boolean}
     */
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

    /**
     * @desc checks if a point is inside this collider
     * @param {number} x the x coordinate of our point
     * @param {number} y the y coordinate of our point
     * @returns {boolean}
     */
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
    }

    /**
     * @desc this is a debug fonction to show the collider as a green rectangle. Use it to adjust your colliders
     * @param {CanvasRenderingContext2D} context the context of our canvas
     */
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
