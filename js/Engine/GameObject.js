import {ResourceManager} from "../Resource/ResourceManager";
import {Properties} from "./Properties/Properties";
import {Vector2} from "./Vector2";
import {GameObjectManager} from "./GameObjectManager";

let GameObject = class GameObject {
    /**
     * @param name : String
     * @param x : int
     * @param y : int
     */
    constructor(name, x = 0, y = 0) {
        this._position = new Vector2(x, y);
        this._visible = true;
        this._name = name;
        this._properties = {};
        GameObjectManager.register(this);
    }

    attach(property) {
        if (!property instanceof Properties) {
            throw TypeError("You can only attach instances of Properties objects");
        }
        this._properties[property.name] = property;
        property.attachTo(this);
    }

    detach(name) {
        delete this._properties[name];
    }

    property(name) {
        return (this._properties[name]);
    }

    hasProperty(name) {
        return this._properties.hasOwnProperty(name);
    }

    get position(){return this._position;}
    set position(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }

    get name(){return this._name;}
    get sprite(){return this._sprite;}
    get layer(){return this._layer;}
};

export {GameObject};