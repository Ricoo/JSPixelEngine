let SpriteManager = class SpriteManager {
    constructor(spriteList, atlasList) {
        if (SpriteManager.instance)
            return SpriteManager.instance;
        else
            SpriteManager.instance = this;

        this._spriteList = spriteList;
        this._atlasList = atlasList;
    }

    _sprite(name) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i].name === name) {
                return this._list[i];
            }
        }
        return null;}
    _atlas(name) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i].name === name) {
                return this._list[i];
            }
        }
        return null;}

    static getSprite(name) {return SpriteManager.instance._sprite(name);}
    static getAtlas(name) {return SpriteManager.instance._atlas(name);}
};

export {SpriteManager};