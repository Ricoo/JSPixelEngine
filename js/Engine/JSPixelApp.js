import {JSPixelSettings} from "./JSPixelSettings";
import {JSPixelEngine} from "./JSPixelEngine";
import {GraphicsManager} from "./GraphicsManager";

let JSPixelApp = class JSPixelApp {
    constructor(canvasName, settings = null) {
        if (new.target === JSPixelApp) {
            throw TypeError("You have to implement this class first")
        }
        if (this.initialize === undefined) {
            throw SyntaxError("You cannot leave the void:initialize() method unimplemented")
        }
        if (this.frame === undefined) {
            throw SyntaxError("You cannot leave the void:frame() method unimplemented")
        }
        this._name = canvasName;
        this._canvas = document.getElementById(canvasName);
        this._context = this._canvas.getContext("2d");

        this._engine = new JSPixelEngine();
        this._engine.register(this);

        this._context.webkitImageSmoothingEnabled = false;
        this._context.mozImageSmoothingEnabled = false;
        this._context.imageSmoothingEnabled = false;

        if (settings === null) {
            settings = new JSPixelSettings();
        }
        this._settings = settings;
        this._context.canvas.width = this._settings.resX;
        this._context.canvas.height = this._settings.resY;
    }
    
    set name(name) {this._name = name;}
    get name(){return this._name;}
    getEngine(){return this._engine;}
    get context(){return this._context;}
    registerDrawable(drawable) {
        GraphicsManager.register(drawable);
    }
    unregisterDrawable(drawable){GraphicsManager.unregister(drawable)}
};

export {JSPixelApp};