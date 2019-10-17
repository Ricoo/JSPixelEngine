export default class SoundList {
    constructor(list) {
        this._list = list;
    }

    /**
     * @desc finds a sound by its name
     * @param {string} name the identifier of the sound we want to retrieve
     * @returns {Sound|null}
     */
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

export {SoundList};