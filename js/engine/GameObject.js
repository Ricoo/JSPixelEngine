import {ResourceManager} from "../resource/ResourceManager";
import {Property} from "./properties/Property";
import {Vector2} from "./math/Vector2";
import {GameObjectManager} from "./GameObjectManager";

let GameObject = class GameObject {
    constructor(name, x = 0, y = 0, angle = 0) {
        this._position = new Vector2(x, y);
        this._angle = angle;
        this._name = name;
        this._properties = {};
        GameObjectManager.register(this);
    }

    /**
     * @desc adds a property to our GameObject and replaces the old property if one exists
     * @param property : Property, the instance of Property
     */
    attach(property) {
        if (!property instanceof Property) {
            throw TypeError("You can only attach instances of properties objects");
        }
        this._properties[property.name] = property;
        property.attachTo(this);
    }

    /**
     * @desc removes a property from this object
     * @param name : string, name of the property
     */
    detach(name) {
        delete this._properties[name];
    }

    /**
     * @desc returns the named property
     * @param name : string
     * @returns {Property}
     */
    property(name) {
        return (this._properties[name]);
    }

    /**
     * @desc checks if a property exists on this GameObject
     * @param name : string
     * @returns {boolean}
     */
    hasProperty(name) {
        return this._properties.hasOwnProperty(name);
    }

    /**
     * @desc deletes the GameObjects and cleans every property
     * @returns {Vector2}
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
    get sprite(){return this._sprite;}
    get layer(){return this._layer;}
};

export {GameObject};