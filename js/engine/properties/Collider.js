import Property from "./Property";
import Vector2 from "../math/Vector2";
import CollisionManager from "../CollisionManager";
import {Trigger} from "../../enum/Trigger";

export default class Collider extends Property {
    /**
     * @desc a collider to detect any collision or hit for event triggering or interaction
     * @param {Vector2} dimensions the dimensions of our collider
     * @param {Vector2} offset the offset of our collider
     * @param {function(GameObject, boolean)} callback the callback to run if our collider is triggered
     * @param {Trigger} trigger the triggering type for our collider
     * @param {boolean} rigid whether our collider is physical or not
     * @note the boolean value in the callback designs whether the mouse have been clicked or not
     */
    constructor(dimensions, offset=new Vector2(0,0), callback=()=>{}, trigger=Trigger.COLLIDER, rigid=false) {
        super();
        this.name = "collider";
        this._dimensions = dimensions;
        this._offset = offset;
        // this._width = width;
        // this._height = height;
        this._callback = callback;
        this._trigger = trigger;
        this._rigid = rigid;
        this._hover = false;
    }

    attachTo(gameObject) {
        super.attachTo(gameObject);
        this.rigid = this.rigid; //We need this to apply a Proxy to listen for changes
    }

    /**
     * @desc checks whether this collider and the collider given in parameter
     * are overlapping and runs the callback for both colliders if needed
     * @param {Collider} other the second collider we are checking
     * @param {Vector2} position the position to test for, if needed
     * @returns {boolean}
     */
    collide(other, position=undefined) {
        let posThis = (position === undefined ? this.gameObject.position.copy : position.copy).add(new Vector2(-this.dimensions.x/2,-this.dimensions.y/2)).add(this._offset);
        let posOther = other.gameObject.position.copy.add(new Vector2(-other.dimensions.x/2,-other.dimensions.y/2)).add(other.offset);
        return (!(posOther.x > posThis.x + this.dimensions.x||
            posOther.x + other.dimensions.x < posThis.x ||
            posOther.y > posThis.y + this.dimensions.y ||
            posOther.y + other.dimensions.y < posThis.y));
    }

    /**
     * @desc checks if a point is inside this collider
     * @param {number} x the x coordinate of our point
     * @param {number} y the y coordinate of our point
     * @param {boolean} click whether the mouse have been clicked or not
     * @returns {boolean}
     */
    raycast(x, y, click = true) {
        let pos = this.gameObject.position.copy.add(this._offset);
        return (x > pos.x - this._dimensions.x / 2 &&
            x < pos.x + this._dimensions.x / 2 &&
            y > pos.y - this._dimensions.y / 2 &&
            y < pos.y + this._dimensions.y / 2);
    }

    /**
     * @desc this is a debug function to show the collider as a outlined rectangle. Use it to adjust your colliders
     * @param {CanvasRenderingContext2D} context the context of our canvas
     */
    show(context) {
        let pos = this.gameObject.position.copy.add(this.offset);
        context.beginPath();
        context.strokeStyle = (this._rigid ? "#FF0000" : (this._trigger.click ? "#00ebff" : "#00FF00"));
        context.rect(pos.x - this.dimensions.x / 2, pos.y - this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
        context.stroke();
        context.closePath();
    }

    delete() {
        this.rigid = false;
        super.delete();
    }

    set rigid(value) {
        this._rigid = value;
        if (value) {
            let collider = this;
            this._gameObject._position = new Proxy(this.gameObject.position, {
                set(target, prop, val) {
                    let pos = collider.gameObject.position.copy;
                    pos[prop] = val;
                    pos = CollisionManager.instance.checkRigid(collider.gameObject, pos, prop);
                    val = pos[prop];
                    return Reflect.set(target, prop, val);
                }
            });
        }
        else {
            let proxy = this._gameObject.position;
            this._gameObject._position = new Vector2(proxy.x, proxy.y);
        }
    }

    get hover() {return this._hover;}
    set hover(value) {
        if (this._hover !== value) {
            this.callback(this._gameObject, {click: false, hover: value});
            this._hover = value;
        }
    }
    get trigger() {return this._trigger;}
    set trigger(value) {this._trigger = value}
    get rigid() {return this._rigid;}
    get callback() {return this._callback;}
    get dimensions() {return this._dimensions;}
    get offset() {return this._offset;}
};
