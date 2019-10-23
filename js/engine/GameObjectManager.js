import GameObject from "./GameObject";

export default class GameObjectManager {
    constructor() {
        if (GameObjectManager.instance !== undefined) {
            return GameObjectManager.instance;
        }
        GameObjectManager.instance = this;

        this._list = [];
    }

    /**
     * @desc adds given GameObject to the manager's list
     * @param {GameObject} gameObject the game object to add
     */
    add(gameObject) {
        if (gameObject instanceof GameObject) {
            this._list.push(gameObject);
        }
        else {
            throw TypeError("You must provide an GameObject object");
        }
    }

    /**
     * @desc removes given GameObject from the manager's list
     * @param {GameObject} rem the game object to remove
     */
    remove(rem) {
        this._list.splice(this._list.indexOf(rem), 1);
    }

    /**
     * @desc fetches a list of all GameObjects having a Collider property and returns it
     * @returns {GameObject[]}
     */
    colliders() {
        return this._list.filter(elem => elem.hasProperty("collider"));
    }

    /**
     * @desc fetches a list of all GameObjects having a Collider with rigid property set to true
     * @returns {GameObject[]}
     */
    rigids() {
        return this._list.filter(elem => elem.hasProperty("collider") && elem.property("collider").rigid);
    }
    /**
     * @desc fetches a list of all GameObjects having a Graphic property and returns it
     * @returns {GameObject[]}
     */
    graphics() {
        this._list.sort((a,b) => {return a.position.y - b.position.y});
        return this._list.filter(elem => elem.hasProperty("graphic"));
    }

    /**
     * @desc fetches a list of all GameObjects having a Force property and returns it
     * @returns {GameObject[]}
     */
    forces() {
        return this._list.filter(elem => elem.hasProperty("force"));
    }

    /**
     * @desc fetches a list of all GameObjects having a Graphic property inside the given layer and returns it
     * @param {Layer} nb the layer we want to retrieve
     * @returns {GameObject[]}
     */
    layer(nb) {
        this._list.sort((a,b) => {return a.position.y - b.position.y});
        return this._list.filter(elem => elem.hasProperty("graphic") && elem.property("graphic").layer === nb);
    }

    /**
     * @desc finds a GameObject by its name identifier
     * @param {string} name the name identifier of the GameObject we are trying to find
     * @returns {GameObject|undefined}
     */
    find(name) {
        return this._list.find(function(elem) {return elem.name === name;});
    }

    static register(drawable) {GameObjectManager.instance.add(drawable);}
    static unregister(drawable) {GameObjectManager.instance.remove(drawable.name);}

};
