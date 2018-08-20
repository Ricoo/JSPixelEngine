import {GameObject} from "./GameObject";

let GameObjectManager = class GameObjectManager {
    constructor() {
        if (GameObjectManager.instance !== undefined) {
            return GameObjectManager.instance;
        }
        GameObjectManager.instance = this;

        this._list = [];
    }

    add(gameObject) {
        if (gameObject instanceof GameObject) {
            this._list.push(gameObject);
        }
        else {
            throw TypeError("You must provide an GameObject object");
        }
    }

    remove(name) {
        let elem = this._list.find(function(elem) {return elem.name === name;});
        this._list.splice(this._list.indexOf(elem), 1);
    }

    graphics() {
        this._list.sort((a,b) => {return a.position.y - b.position.y});
        return this._list.filter(elem => elem.hasProperty("graphic"));
    }

    layer(nb) {
        return this._list.filter(elem => elem.hasProperty("graphic") && elem.property("graphic").layer === nb);
    }

    find(name) {
        return this._list.find(function(elem) {return elem.name === name;});
    }

    static register(drawable) {GameObjectManager.instance.add(drawable);}
    static unregister(drawable) {GameObjectManager.instance.remove(drawable.name);}

};

export {GameObjectManager};