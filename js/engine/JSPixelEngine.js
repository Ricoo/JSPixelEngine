import CollisionManager from "./manager/CollisionManager.js";
import EventManager from "./manager/EventManager.js";
import GameObjectManager from "./manager/GameObjectManager.js";
import JSPixelApp from "./JSPixelApp.js";
import JSPixelCanvas from "./JSPixelCanvas.js";
import ResourceManager from "../resource/ResourceManager.js";
import {Layer} from "../enum/Layer.js";

export default class JSPixelEngine {
    constructor() {
        if (JSPixelEngine.instance !== undefined) {
            return JSPixelEngine.instance;
        }
        JSPixelEngine.instance = this;

        this._app = []; //This might be changed into a list in case we need to manage several canvas at once
        new JSPixelCanvas();
        new GameObjectManager();
        new CollisionManager();
        new EventManager();
    }

    /**
     * @desc registers the app into the engine
     * @param {JSPixelApp} app the app instance
     */
    register(app) {
        if (app instanceof JSPixelApp) {
            this._app = app;
            console.log("Registered " + app.name + " as the current application");
        }
        else {throw TypeError("Cannot register this, you may only register a JSPixelApp instance")}
    }

    /**
     * @desc loads the given resource pack into memory before running the engine
     * @param {{audio:*[],sprites:*[]}} resourcePack the resource pack descriptor
     */
    preLoad(resourcePack) {
        if (this._resourceManager === undefined) {
            this._resourceManager = new ResourceManager();
            this._resourceManager.loadResources(resourcePack);
        }
        if (this._resourceManager.done === false) {
            console.log("Loading resources [" + this._resourceManager.count + "/" + this._resourceManager.total + "]");
            setTimeout(() => { this.preLoad(resourcePack); }, 50);
        }
        else {
            this.start();
        }
    }

    /**
     * @desc starts the engine, initializes the apps and launches the main loop
     */
    start() {
            this._app.initialize();
        if (this._eventloop === undefined) {
            this._eventloop = setInterval(() => {
                this.eventLoop();
            }, 1);
            window.requestAnimationFrame(this.displayLoop.bind(this))
            console.log("JSPixelEngine main loop started");
        }
    }

    /**
     * @desc The event loop of the engine, running once every ms
     */
    eventLoop() {
        CollisionManager.instance.checkCollision();
        //TODO add custom event handling from EventManager
    }

    /**
     * @desc The display loop of the engine, running slower than the event loop
     */
    displayLoop() {
        GameObjectManager.instance.forces().forEach(go => go.force.update());

        JSPixelCanvas.draw(this._app)
            .then(()=> {
                const {context} = this._app;
                const {canvas} = context;

                this._app.frame();
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(JSPixelCanvas.image(), 0,0)

                window.requestAnimationFrame(this.displayLoop.bind(this));
            })
    }
};
