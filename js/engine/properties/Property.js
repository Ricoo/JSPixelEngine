export default class Property {
    /**
     * @desc the mother class of all our attachable properties
     */
    constructor() {
        this._PROPERTY_NAME = undefined;
        if (new.target === Property) {
            throw TypeError("You have to extend this class");
        }
    }

    /**
     * @desc keeps a reference to the gameObject available
     * @param {GameObject} gameObject, the reference to the gameObject
     */
    attachTo(gameObject) {
        this._gameObject = gameObject
    }

    /**
     * Returns the gameObject this property is on
     * @returns {GameObject}
     */
    get gameObject() {return this._gameObject;}

    delete() {}
};
