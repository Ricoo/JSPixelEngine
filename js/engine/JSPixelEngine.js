import CollisionManager from "./manager/CollisionManager.js";
import EventManager from "./manager/EventManager.js";
import JSPixelApp from "./JSPixelApp.js";
import JSPixelCanvas from "./JSPixelCanvas.js";
import ResourceManager from "../resource/ResourceManager.js";
import Scene from "./Scene.js";

export default class JSPixelEngine {
    constructor() {
        if (JSPixelEngine.instance !== undefined) {
            return JSPixelEngine.instance;
        }
        JSPixelEngine.instance = this;

        this._app = []; //This might be changed into a list in case we need to manage several canvas at once
        this._time = undefined;
        this.loops = 0;
        new JSPixelCanvas();
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
    preLoad(resourcePack, canvas) {
        if (this._resourceManager === undefined) {
            this._resourceManager = new ResourceManager(canvas);
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
        if (!this._time) {
            this._time = Date.now();
        }
        const time = Date.now();
        const delta = time - this._time;
        this._time = time;

        Scene.current.update(delta);
        Scene.forces().forEach(go => go.force.update(delta));
        CollisionManager.instance.checkCollision();

        //TODO add custom event handling from EventManager
        this.loops += 1
    }

    /**
     * @desc The display loop of the engine, running slower than the event loop
     */
    displayLoop() {
        JSPixelCanvas.draw(this._app)
            .then(()=> {
                const {context} = this._app;
                const {canvas} = context;

                this._app.frame?.();
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(JSPixelCanvas.image(), 0,0)

                window.requestAnimationFrame(this.displayLoop.bind(this));
            })
    }
};
