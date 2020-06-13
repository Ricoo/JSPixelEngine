export default class Enum {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key];
        }
        return Object.freeze(this);
    }
};