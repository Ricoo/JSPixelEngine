import Property from "./properties/Property";
import Vector2 from "./math/Vector2";
import GameObjectManager from "./GameObjectManager";

export default class GameObject {
    /**
     * @desc a gameObject, the standardized way to create and manipulate game elements
     * @param {string} name the assigned name of this object so we can find it using its name in GameObjectManager
     * @param {number} x the x position of our object
     * @param {number} y the y position of our object
     * @param {number} angle the angle our object should be displayed with (if necessary)
     */
    constructor(name, x = 0, y = 0, angle = 0) {
        this._position = new Vector2(x, y);
        this._angle = angle;
        this._name = name;
        this._properties = {};
        GameObjectManager.register(this);
    }

    /**
     * @desc adds a property to our GameObject and replaces the old property if one exists
     * @param {Property} property the instance of Property
     */
    attach(property) {
        if (!property instanceof Property) {
            throw TypeError("You can only attach instances of properties objects");
        }
        if (this._properties[property.name] !== undefined) {
            this.detach(property.name);
        }
        this._properties[property.name] = property;
        property.attachTo(this);
    }

    /**
     * @desc removes a property from this object
     * @param {string} name the name of the property
     */
    detach(name) {
        this._properties[name].delete();
        delete this._properties[name];
    }

    /**
     * @desc returns the named property
     * @param {string} name
     * @returns {Property}
     */
    property(name) {
        return (this._properties[name]);
    }

    /**
     * @desc checks if a property exists on this GameObject
     * @param {string} name
     * @returns {boolean}
     */
    hasProperty(name) {
        return this._properties.hasOwnProperty(name);
    }

    /**
     * @desc deletes the GameObjects and cleans every property
     */
    delete() {
        for (let prop in this._properties) {
            this._properties[prop].delete();
            delete this._properties[prop];
        }
        GameObjectManager.instance.remove(this);
        delete this;
    }

    get position(){return this._position;}
    set position(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
    get angle() {return this._angle;}
    set angle(a){this._angle = (a > 360 ? a - 360 : (a < 0 ? a + 360 : a));}

    get name(){return this._name;}
};
