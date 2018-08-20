let Property = class Properties {
    constructor() {
        if (new.target === Property) {
            throw TypeError("You have to extend this class");
        }
    }

    /**
     * @desc keeps a reference to the gameObject available
     * @param gameObject : GameObject, the reference to the gameObject
     */
    attachTo(gameObject) {
        this._gameObject = gameObject
    }

    /**
     * Returns the gameObject this property is on
     * @returns {GameObject}
     */
    get gameObject() {return this._gameObject;}
};

export {Property};