import Property from "./Property.js";

export default class Filter extends Property {
    constructor() {
        super(arguments);
        this._PROPERTY_NAME = "filter";
    }
};
