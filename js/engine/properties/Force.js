import Property from "./Property.js";
import Vector2 from "../math/Vector2.js";

export default class Force extends Property {
    gravity;
    weight;
    bounce;
    _valueType = {
        gravity:"Number",
        weight:"Number",
        bounce:"Boolean"
    };
    /**
     * @desc adds a variable force to move an object
     * @param {number} gravity the gravity force our object must receive
     * @param {number} weight the weight of our object
     * @param {boolean} bounce whether our object is bouncing or not
     */
    constructor(gravity = 0, weight = 0, bounce=false) {
        super(arguments);
        this._PROPERTY_NAME = "force";
        this.gravity = gravity;
        this.weight = weight;
        this.bounce = bounce;
        this._force = new Vector2(0,0);
        this._stopped = false;
    }

    update(delay = 0) {
        this._force.add(new Vector2(0, this.gravity * delay / 1000));

        const apply = new Vector2(Math.round(this._force.x), Math.round(this._force.y))
        if (apply.x !== 0) {
            this._gameObject.x += apply.x;
        }
        if (apply.y !== 0) {
            this._gameObject.y += apply.y; 
        }
    }

    apply(value) {
        this._stopped = false;
        this._force = value;
    }

    add(value) {
        this._force.add(value);
    }

    stop(direction) {
        this._stopped = true;
        if (direction === "y" && this.bounce) {
            this._force.y *= -1;
        }
        else if (this.bounce) {
            this._force.x *= -1;
        }
        else if (direction === "y") {
            this._force.y = 0;
        }
        else {
            this._force.x = 0;
        }
    }

    get y(){return this._force.y;}
    set y(value){this._force.y = value;}
    get x(){return this._force.x;}
    set x(value){this._force.x = value;}
    get stopped(){return this._stopped;}
    get value(){return this._force;}
};
