let Properties = class Properties {
    constructor() {
        if (new.target === Properties) {
            throw TypeError("You have to extend this class");
        }
    }

    attachTo(gameObject) {
        this._gameObject = gameObject
    }
};

export {Properties};