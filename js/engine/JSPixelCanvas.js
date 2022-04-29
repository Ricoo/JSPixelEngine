import { Layer } from "../enum/Layer.js";
import GameObjectManager from "./manager/GameObjectManager.js";

export default class JSPixelCanvas {
    constructor() {
        if (JSPixelCanvas.instance !== undefined) {
            return JSPixelCanvas.instance;
        }
        JSPixelCanvas.instance = this;
        
        this._canvas = document.createElement("canvas");
        this._canvas.width = window.innerWidth
        this._canvas.height = window.innerHeight
        
        this._context = this._canvas.getContext("2d");
        this._context.webkitImageSmoothingEnabled = false;
        this._context.mozImageSmoothingEnabled = false;
        this._context.imageSmoothingEnabled = false;        
    }

    static setRes({ x, y }) {
        JSPixelCanvas.instance._canvas.width = x;
        JSPixelCanvas.instance._canvas.height = y;
    }

    /**
     * 
     * @param {JSPixelApp} param0 the app to draw into 
     */
    static async draw({ debug }) {
        const context = JSPixelCanvas.instance._context;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (const layer in Layer) {
            GameObjectManager.instance.layer(Layer[layer]).forEach(go=>{
                go.graphic?.draw(context);
                go.text?.write(context);
            })
        }

        if (debug) {
            GameObjectManager.instance.graphics().forEach(go => {
                go.collider?.show(context)
            })
        }
    }

    static image() {
        return JSPixelCanvas.instance._canvas;
    }
}