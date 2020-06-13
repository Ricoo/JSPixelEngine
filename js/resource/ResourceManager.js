import Sprite from "./sprite/Sprite.js";
import Sound from "./sound/Sound.js";
import SpriteAtlas from "./sprite/SpriteAtlas.js";
import {DefaultValues} from "../enum/DefaultValues.js";

export default class ResourceManager {
    constructor() {
        if (ResourceManager.instance !== undefined) {
            return ResourceManager.instance;
        }
        ResourceManager.instance = this;

        this._sprites = [];
        this._sounds = [];
        this._count = 0;
        this._total = 0;
        this._done = false;
    }

    /**
     * @desc loads the resources listed in the packageDescriptor into memory
     * @param {{audio:*[],sprites:*[]}} packageDescriptor the object listing all required resources
     * @callback this function sets this._done to true after the resources have been loaded
     */
    loadResources(packageDescriptor) {
        this._done = false;
        this._total = packageDescriptor.sprites.length + packageDescriptor.audio.length;
        let {sprites, audio} = packageDescriptor;
        this._total = [...sprites, ...audio].length;
        let callback = () => {
            this._count += 1;
            if (this._count === this._total) {
                console.log("Finished loading  ["+this._total+"/"+this._total+"]");
                this._done = true;}};
        this._sprites.push(new Sprite(DefaultValues.EMPTY_IMAGE.src,
            DefaultValues.EMPTY_IMAGE.name,  DefaultValues.EMPTY_IMAGE.res, ()=>{}));
        sprites.forEach((elem) => {
            if (elem.hasOwnProperty("atlas")) {
                this._sprites.push(new SpriteAtlas(elem["src"],elem["name"],elem["res"], callback, elem["atlas"]));
            }
            else {
                this._sprites.push(new Sprite(elem["src"],elem["name"],elem["res"], callback));
            }
        });
        audio.forEach((elem) => {
            this._sounds.push(new Sound(elem["src"],elem["name"], callback));
        });
    }

    static getSprite(name){return ResourceManager.sprites.find(elem=> elem.name === name)};
    static getSound(name){return ResourceManager.sounds.find(elem=> elem.name === name)};

    static get sounds() {return ResourceManager.instance._sounds;}
    static get sprites() {return ResourceManager.instance._sprites;}
    get done() {return this._done;}

    get count() {return this._count;}
    get total() {return this._total;}
};

export {ResourceManager}