export default class SpriteList {
    constructor(list) {
        this._list = list;
    }

    findByName(name) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i].name === name) {
                return this._list[i];
            }
        }
        return null;
    }

    get list() {return this._list;}
};

export {SpriteList};