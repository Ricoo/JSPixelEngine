import Property from "./Property";
import Vector2 from "../math/Vector2";

export default class Force extends Property {
    /**
     * @desc adds a variable force to move an object
     * @param {number} gravity the gravity force our object must receive
     * @param {number} weight the weight of our object
     * @param {boolean} bounce whether our object is bouncing or not
     */
    constructor(gravity, weight = 0, bounce=false) {
        super();
        this.name = "force";
        this._gravity = gravity;
        this._weight = weight;
        this._force = new Vector2(0,0);
        this._stopped = false;
    }

    //TODO
    update() {
        this._force.add(new Vector2(0, this._gravity));
        this.gameObject.position.x += this._force.x;
        this.gameObject.position.y += this._force.y;
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
    get bounce(){return this._bounce;}
    set bounce(value){this._bounce = value;}
    get stopped(){return this._stopped;}
};
