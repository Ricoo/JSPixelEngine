import {GameObject} from "./GameObject";

let GraphicsManager = class GraphicsManager {
    constructor() {
        if (GraphicsManager.instance !== undefined) {
            return GraphicsManager.instance;
        }
        GraphicsManager.instance = this;

        this._list = [];
    }

    add(drawable) {
        if (drawable instanceof GameObject) {
            this._list.push(drawable);
        }
        else {
            throw TypeError("You must provide an GameObject object");
        }
    }

    remove(name) {
        let elem = this._list.find(function(elem) {return elem.name === name;});
        this._list.splice(this._list.indexOf(elem), 1);
    }

    layer(nb) {
        return this._list.filter(elem => elem.layer === nb);
    }

    find(name) {
        return this._list.find(function(elem) {return elem.name === name;});
    }

    static register(drawable) {GraphicsManager.instance.add(drawable);}
    static unregister(drawable) {GraphicsManager.instance.remove(drawable.name)}

};

export {GraphicsManager};