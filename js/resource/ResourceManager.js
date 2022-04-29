import Sprite from "./sprite/Sprite.js";
import Sound from "./sound/Sound.js";
import SpriteAtlas from "./sprite/SpriteAtlas.js";
import {DefaultValues} from "../enum/DefaultValues.js";
import JSPixelEngine from "../engine/JSPixelEngine.js";
import JSPixelCanvas from "../engine/JSPixelCanvas.js";

export default class ResourceManager {
    constructor(canvas) {
        if (ResourceManager.instance !== undefined) {
            return ResourceManager.instance;
        }
        ResourceManager.instance = this;

        this._sprites = [];
        this._sounds = [];
        this._styles = [];
        this._count = 0;
        this._total = 0;
        this._done = false;
        this.canvas = canvas;
    }

    /**
     * @desc loads the resources listed in the packageDescriptor into memory
     * @param {{audio:*[],sprites:*[]}} packageDescriptor the object listing all required resources
     * @callback this function sets this._done to true after the resources have been loaded
     */
    loadResources(packageDescriptor) {
        const testPromises = 100;
        this._done = false;
        let {sprites, audio, styles} = packageDescriptor;
        this._total = [...sprites, ...audio].length + testPromises;
        let callback = () => {
            this._count += 1;
            JSPixelCanvas.loader(this.canvas, this._count, this._total)
            if (this._count === this._total) {
                console.log("Finished loading  ["+this._total+"/"+this._total+"]");
                this._done = true;}
        };
        Array.from({length: testPromises}, (v, i) => i).forEach(()=>{
            new Promise(resolve => {
                setTimeout(resolve, Math.random() * 5000);
            }).then(callback)
        });
        this._sprites.push(new Sprite(DefaultValues.EMPTY_IMAGE.src,
            DefaultValues.EMPTY_IMAGE.name,  DefaultValues.EMPTY_IMAGE.res, ()=>{}));
        sprites?.forEach((elem) => {
            if (elem.hasOwnProperty("atlas")) {
                this._sprites.push(new SpriteAtlas(elem["src"],elem["name"],elem["res"], callback, elem["atlas"]));
            }
            else {
                this._sprites.push(new Sprite(elem["src"],elem["name"],elem["res"], callback));
            }
        });
        audio?.forEach((elem) => {
            this._sounds.push(new Sound(elem["src"],elem["name"], callback));
        });
        this._styles.push(DefaultValues.DEFAULT_STYLE)
        styles?.forEach(elem => this._styles.push(elem))
    }

    static getSprite(name){return ResourceManager.sprites.find(elem=> elem.name === name)};
    static getSound(name){return ResourceManager.sounds.find(elem=> elem.name === name)};
    static getStyle(name) {return ResourceManager.styles.find(elem => elem.name === name)};

    static get sounds() {return ResourceManager.instance._sounds;}
    static get sprites() {return ResourceManager.instance._sprites;}
    static get styles() {return ResourceManager.instance._styles;}
    get done() {return this._done;}

    get count() {return this._count;}
    get total() {return this._total;}
};

export {ResourceManager}