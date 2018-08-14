import {SpriteList} from "./sprite/SpriteList";
import {Sprite} from "./sprite/Sprite";
import {SoundList} from "./sound/SoundList";
import {Sound} from "./sound/Sound";
import {SpriteAtlas} from "./sprite/SpriteAtlas";

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

    /**
     * @desc loads the resources listed in the packageDescriptor into memory
     * @param packageDescriptor : {audio:*[],sprites:*[]}, the object listing all required resources
     */
    loadResources(packageDescriptor) {
        let spriteList = [];
        let soundList = [];
        let self = this;
        let callback = () => {};
        packageDescriptor.sprites.forEach(function(elem, index, array) {
            if (elem.hasOwnProperty("atlas")) {
                spriteList.push(new SpriteAtlas(elem["src"],elem["name"],elem["res"], callback, elem["atlas"]));
            }
            else {
                spriteList.push(new Sprite(elem["src"],elem["name"],elem["res"], callback));
            }
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

    static getSprite(name){return ResourceManager.sprites.findByName(name)};
    static getSound(name){return ResourceManager.sounds.findByName(name)};

    static get sounds() {return ResourceManager.instance._sounds;}
    static get sprites() {return ResourceManager.instance._sprites;}
    get done() {return (this._sprites instanceof SpriteList &&
                        this._sounds instanceof SoundList);}
};

export {ResourceManager}