import GameObject from "./GameObject";

export default class GameObjectManager {
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

    remove(rem) {
        this._list.splice(this._list.indexOf(rem), 1);
    }

    colliders() {
        return this._list.filter(elem => elem.hasProperty("collider"));
    }

    graphics() {
        this._list.sort((a,b) => {return a.position.y - b.position.y});
        return this._list.filter(elem => elem.hasProperty("graphic"));
    }

    layer(nb) {
        this._list.sort((a,b) => {return a.position.y - b.position.y});
        return this._list.filter(elem => elem.hasProperty("graphic") && elem.property("graphic").layer === nb);
    }

    find(name) {
        return this._list.find(function(elem) {return elem.name === name;});
    }

    static register(drawable) {GameObjectManager.instance.add(drawable);}
    static unregister(drawable) {GameObjectManager.instance.remove(drawable.name);}

};
