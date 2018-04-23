import {ResourceManager} from "../Resource/ResourceManager";
import {Properties} from "./Properties/Properties";

let GameObject = class Drawable {
    /**
     *
     * @param sprite : String
     * @param name : String
     * @param layer : Layer
     * @param posX : int
     * @param posY : int
     * @param scale : float
     */
    constructor(sprite, name, layer, posX=0, posY=0, scale=1.0) {
        this._sprite = ResourceManager.sprites.findByName(sprite);
        this._x = posX;
        this._y = posY;
        this._scale = scale;
        this._visible = true;
        this._layer = layer;
        this._name = name;
        this._properties = {};
    }

    draw(context) {
        if (this._visible) {
            this._sprite.draw(context, this._x, this._y, this._scale);
        }
    }

    raycast(x, y) {
        if (x === undefined || y === undefined) {return false;}
        return (x > this._x && x < this._x + this._scale * this._sprite.res.x &&
                y > this._y && y < this._y + this._scale * this._sprite.res.y
        );
    }

    attach(property) {
        if (!property instanceof Properties) {
            throw TypeError("You can only attach instances of Properties objects");
        }
        this._properties[property.name] = property;
    }

    property(name) {
        return (this._properties[name]);
    }

    hasProperty(name) {
        return this._properties.hasOwnProperty(name);
    }

    hide() {this._visible = false;}
    show() {this._visible = true;}
    toggleVisible() {this._visible = !this._visible;}

    get scale() {return this._scale;}
    set scale(newScale) {this._scale = newScale;}

    get x(){return this._x;}
    set x(newX) {this._x = newX;}
    get y(){return this._y;}
    set y(newY) {this._y = newY;}

    get name(){return this._name;}
    get sprite(){return this._sprite;}
    get layer(){return this._layer;}
};

export {GameObject};