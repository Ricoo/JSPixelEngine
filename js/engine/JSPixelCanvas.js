import { Layer } from "../enum/Layer.js";
import ImageFactory from "../resource/sprite/ImageFactory.js";
import JSPixelEngine from "./JSPixelEngine.js";
import EventManager from "./manager/EventManager.js";
import GameObjectManager from "./manager/GameObjectManager.js";

export default class JSPixelCanvas {
    constructor() {
        if (JSPixelCanvas.instance !== undefined) {
            return JSPixelCanvas.instance;
        }
        JSPixelCanvas.instance = this;
        
        [this._canvas, this._context] = JSPixelCanvas.canvasFactory(window.innerWidth, window.innerHeight)
        this._frameData = [];
        this._eventData = [];
        this._frameGraph = new Image()
        this._eventGraph = new Image()
        this._framesElapsed = 0;
        JSPixelCanvas.collectData()
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

        if (debug && debug !== {}) {
            JSPixelCanvas.debug(debug);
        }
        JSPixelCanvas.instance._framesElapsed += 1;
    }

    static debug(debug) {
        const {
            _context: context,
            _frameGraph: frameGraph,
            _eventGraph: eventGraph
        } = JSPixelCanvas.instance;
        let x = 5;

        if (debug.colliders){
            GameObjectManager.instance.colliders().forEach(go => {
                go.collider?.show(context)
            })
        }
        if (debug.fps) {
            context.drawImage(frameGraph, x, 5);
            x += frameGraph.width + 5;
        }
        if (debug.events) {
            context.drawImage(eventGraph, x, 5);
            x += frameGraph.width + 5;
        }
        if (debug.keys) {
            context.font = "10px Arial"
            context.fillStyle = "#ffffff"
            context.textBaseLine = "top"
            EventManager.keys.forEach((value, index)=>{
                context.fillText(value, x, 10 + 10 * index)
            })
        }
    }

    static collectData() {
        const {instance} = JSPixelCanvas
        instance._frameData.push(JSPixelCanvas.instance._framesElapsed)
        if (instance._frameData.length > 60) {
            instance._frameData.shift()
        }
        instance._frameGraph = ImageFactory.renderDataGraph("FPS", instance._frameData)
        instance._framesElapsed = 0;

        instance._eventData.push(JSPixelEngine.instance.loops)
        if (instance._eventData.length > 60) {
            instance._eventData.shift()
        }
        instance._eventGraph = ImageFactory.renderDataGraph("Eventloops", instance._eventData)
        JSPixelEngine.instance.loops = 0;
        setTimeout(JSPixelCanvas.collectData, 1000);
    }

    static collectEvents() {
        const {instance} = JSPixelCanvas
        instance._frameData.push(JSPixelCanvas.instance._framesElapsed)
        if (instance._frameData.length > 60) {
            instance._frameData.shift()
        }
        instance._frameGraph = ImageFactory.renderDataGraph("Events:", instance._frameData)
        instance._framesElapsed = 0;
        setTimeout(JSPixelCanvas.collectFrames, 1000);
    }

    static image() {
        return JSPixelCanvas.instance._canvas;
    }

    static context() {
        return JSPixelCanvas.instance._context;
    }
    
    static canvasFactory(width = window.innerWidth, height = window.innerHeight) {
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        
        const context = canvas.getContext("2d")

        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;   

        return [canvas, context]
    }
}