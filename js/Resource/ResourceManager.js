import {SpriteList} from "./SpriteList";
import {Sprite} from "./Sprite";
import {SoundList} from "./SoundList";
import {Sound} from "./Sound";

let ResourceManager = class ResourceManager {
    constructor() {
        //Singleton
        if (ResourceManager.instance !== undefined) {
            return ResourceManager.instance;
        }
        ResourceManager.instance = this;

        this._sprites = null;
        this._sounds = null;
        //this._progress = 0.0;
    }

    loadResources(packageDescriptor) {
        let spriteList = [];
        let soundList = [];
        let self = this;
        packageDescriptor.sprites.forEach(function(elem, index, array) {
            spriteList.push(new Sprite(elem["src"],elem["name"],elem["res"]));
            if (index === array.length - 1) {
                self._sprites = new SpriteList(spriteList);
            }

        });
        packageDescriptor.audio.forEach(function(elem, index, array) {
            soundList.push(new Sound(elem["src"],elem["name"]));
            if (index === array.length - 1) {
                self._sounds = new SoundList(soundList);
            }
        });
    }

    static getSprite(name){return ResourceManager.instance._sprites.findByName(name)};
    static getSound(name){return ResourceManager.instance._sounds.findByName(name)};

    static get sounds() {return ResourceManager.instance._sounds;}
    static get sprites() {return ResourceManager.instance._sprites;}
    get done() {return (this._sprites instanceof SpriteList &&
                        this._sounds instanceof SoundList);}
};

export {ResourceManager}