import {SpriteList} from "./SpriteList";
import {Sprite} from "./Sprite";
import {SoundList} from "./SoundList";
import {Sound} from "./Sound";

let ResourceManager = class ResourceManager {
    constructor(context) {
        if (ResourceManager.instance !== undefined) {
            return ResourceManager.instance;
        }
        this._context = context;
        this._sprites = [];
        this._sounds = [];
        //this._progress = 0.0;

        ResourceManager.instance = this;
    }

    loadResources(packageDescriptor) {
        let spriteList = [];
        let soundList = [];
        let self = this;
        packageDescriptor.sprites.forEach(function(elem, index, array) {
            spriteList.push(new Sprite(self._context,
                elem["src"],elem["name"],elem["res"]));
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

    resourceLoaded() {

    }

    static get sounds() {return ResourceManager.instance._sounds;}
    static get sprites() {return ResourceManager.instance._sprites;}
    get done() {return (this._sprites instanceof SpriteList &&
                        this._sounds instanceof SoundList);}

    static getInstance(){return ResourceManager.instance;}
};

export {ResourceManager}