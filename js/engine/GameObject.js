import Property from "./properties/Property.js";
import Vector2 from "./math/Vector2.js";
import GameObjectManager from "./manager/GameObjectManager.js";
import UUID from "./math/UUID.js";

export default class GameObject {
    name;
    /**
     * @desc a gameObject, the standardized way to create and manipulate game elements
     * @param {string} name the assigned name of this object so we can find it using its name in GameObjectManager
     * @param {number} x the x position of our object
     * @param {number} y the y position of our object
     * @param {number} angle the angle our object should be displayed with (if necessary)
     */
    constructor(name = "", x = 0, y = 0, angle = 0) {
        this._uuid = UUID.generateUUID();
        console.log(this._uuid);
        this._position = new Vector2(x, y);
        this._angle = angle;
        this.name = name;
        this._properties = [];
        this._enabled = true;
        this._children = [];
        this._parent = undefined;
        this._arguments = [...arguments]
        GameObjectManager.register(this);
    }

    /**
     * @desc adds a property to our GameObject and replaces the old property if one exists
     * @param {Property} property the instance of Property
     */
    attach(property) {
        if (!property instanceof Property) {
            throw TypeError("You can only attach instances of Property objects");
        }
        if (this[property._PROPERTY_NAME] !== undefined ) {
            this.detach(property._PROPERTY_NAME);
        }
        this[property._PROPERTY_NAME] = property;
        this._properties.push(property._PROPERTY_NAME);
        property.attachTo(this);
    }

    /**
     * @desc removes a property from this object
     * @param {string} name the name of the property
     */
    detach(name) {
        if (this[name] === undefined) {
            console.trace();
            throw ReferenceError(this.name + "." + name + " is undefined");
        }
        this._properties.splice(this._properties.indexOf(name), 1);
        this[name].delete();
        delete this[name];
    }

    /**
     * @desc Adds a child to the gameObject
     * @param {GameObject} child the child to add
     */
    addChild(child) {
        this._children.push(child);
        child.addParent(this);
    }

    /**
     * @desc Removes a child to the gameObject
     * @param {GameObject} child the child to remove
     */
    removeChild(child) {
        if (this._children.includes(child)) {
            this._children.splice(this._children.indexOf(child), 1);
            if (child.parent !== undefined)
                child.removeParent();
        }
    }

    /**
     * @desc Sets the parent of the gameObject
     * @param {GameObject} parent the parent to set
     */
    addParent(parent) {
        this._parent = parent;
    }

    /**
     * @desc Removes the parent from the gameObject
     */
    removeParent() {
        if (this._parent.children.includes(this)) {
            this._parent.removeChild(this);
        }
        this._parent = undefined;
    }

    /**
     * @deprecated will be replaced by direct access to the property, use go["text"] or go.text instead of go.property("text")
     * @desc returns the named property
     * @param {string} name
     * @returns {Property}
     */
    property(name) {
        return (this[name]);
    }

    /**
     * @desc toggles all properties of the GameObject
     */
    toggle() {
        this._enabled = !this._enabled;
        for (let child of this._children) {
            child.toggle();
        }
    }

    /**
     * @desc enables all properties of the GameObject
     */
    enable() {
        this._enabled = true;
        for (let child of this._children) {
            child.enable();
        }
    }

    /**
     * @desc disables all properties of the GameObject
     */
    disable() {
        this._enabled = false;
        for (let child of this._children) {
            child.disable();
        }
    }

    /**
     * @desc checks if a property exists on this GameObject
     * @param {string} name
     * @returns {boolean}
     */
    hasProperty(name) {
        if (this._enabled)
            return this.hasOwnProperty(name);
        return false;
    }

    /**
     * @desc deletes the GameObjects and cleans every property
     */
    delete() {
        for (let child of this._children) {
            this.removeChild(child);
        }
        for (let prop of this._properties) {
            this[prop].delete();
            delete this[prop];
        }
        GameObjectManager.instance.remove(this);
        delete this;
    }

    get x() {return this._position.x;}
    set x(value) {
        let base = this._position.x;
        this._position.x = value;
        for (let child of this._children) {
            child.x += this._position.x - base;
        }
    }
    get y() {return this._position.y;}
    set y(value) {
        let base = this._position.y;
        this._position.y = value;
        for (let child of this._children) {
            child.y += this._position.y - base;
        }
    }
    get position() {return this._position;}
    set position(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
    get angle() {return this._angle;}
    set angle(a) {this._angle = (a > 360 ? a - 360 : (a < 0 ? a + 360 : a));}

    get children() {return this._children;}
    get parent() {return this._parent;}
    get uuid() {return this._uuid;}
    set forceUuid(uuid) {this._uuid = uuid;}
    get properties() {return this._properties.map(key=>this[key]);}
    get arguments() {return this._arguments;}
};
