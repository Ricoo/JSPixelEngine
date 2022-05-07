import JSPixelSettings from "./JSPixelSettings.js";
import JSPixelEngine from "./JSPixelEngine.js";

export default class JSPixelApp {
    /**
     * @desc this is the main class we must inherit to run a working app
     * @param {string} canvasName the name of the canvas
     * @param {{audio:*[],sprites:*[]}} resourcePack the resource pack we are using
     * @param {JSPixelSettings|null} settings the settings we want to use for the app
     */
    constructor(canvasName, resourcePack, settings = null) {
        //Abstract class
        if (new.target === JSPixelApp) {throw TypeError("You have to inherit this class first");}
        if (this.initialize === undefined) {throw SyntaxError("You cannot leave the void:initialize() method unimplemented");}

        this._name = canvasName;
        this._canvas = document.getElementById(canvasName);
        this._context = this._canvas.getContext("2d");

        this._engine = new JSPixelEngine();
        this._engine.register(this);
        this._engine.preLoad(resourcePack, this._canvas);

        if (settings === null) {
            settings = new JSPixelSettings();
        }

        this._settings = settings;
        this._context.canvas.width = this._settings.resX;
        this._context.canvas.height = this._settings.resY;
        window.onresize = ()=>{
            if (this._settings.resize) {
                this._settings.resX = window.innerWidth;
                this._settings.resY = window.innerHeight;
                this._context.canvas.width = this._settings.resX;
                this._context.canvas.height = this._settings.resY;
            }
        }

        this._debug = {colliders: false, fps: false, events: false, keys: false};
    }

    //Getters and setters
    set name(name) {this._name = name;}
    get name(){return this._name;}
    get context(){return this._context;}
    get debug(){return this._debug;}
};
