import Property from "./Property";
import Vector2 from "../math/Vector2";
import CollisionManager from "../CollisionManager";
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

    attachTo(gameObject) {
        super.attachTo(gameObject);
        this.rigid = this.rigid;
    }

    /**
     * @desc checks whether this collider and the collider given in parameter
     * are overlapping and runs the callback for both colliders if needed
     * @param {Collider} other the second collider we are checking
     * @param {Vector2} position the position to test for, if needed
     * @returns {boolean}
     */
    collide(other, position=undefined) {
        let posThis = (position === undefined ? this.gameObject.position.copy : position.copy).add(new Vector2(-this._width/2,-this._height/2));
        let posOther = other.gameObject.position.copy.add(new Vector2(-other._width/2,-other._height/2));
        return (!(posOther.x > posThis.x + this._width ||
            posOther.x + other._width < posThis.x ||
            posOther.y > posThis.y + this._height ||
            posOther.y + other._height < posThis.y));
    }

    /**
     * @desc checks if a point is inside this collider
     * @param {number} x the x coordinate of our point
     * @param {number} y the y coordinate of our point
     * @param {boolean} click whether the mouse have been clicked or not
     * @returns {boolean}
     */
    raycast(x, y, click = true) {
        let pos = this.gameObject.position;
        return (x > pos.x - this._width / 2 &&
            x < pos.x + this._width / 2 &&
            y > pos.y - this._height / 2 &&
            y < pos.y + this._height / 2);
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

    delete() {
        this.rigid = false;
        super.delete();
    }

    get trigger() {return this._trigger}
    set trigger(value) {this._trigger = value}
    get rigid() {return this._rigid;}
    get callback() {return this._callback;}
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
};
