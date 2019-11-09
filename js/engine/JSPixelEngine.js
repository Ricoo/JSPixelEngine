import JSPixelApp from "./JSPixelApp";
import GameObjectManager from "./manager/GameObjectManager";
import ResourceManager from "../resource/ResourceManager";
import EventManager from "./manager/EventManager";
import CollisionManager from "./manager/CollisionManager";
import {Layer}from "../enum/Layer";

export default class JSPixelEngine {
    constructor() {
        if (JSPixelEngine.instance !== undefined) {
            return JSPixelEngine.instance;
        }
        JSPixelEngine.instance = this;

        this._app = []; //This might be changed into a list in case we need to manage several canvas at once
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
            this._displayLoop = setInterval(() => {
                this.displayLoop();
            }, 17);
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
        let context = this._app.context;
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        this._app.frame();


        for (let layer in Layer) {
            let list = GameObjectManager.instance.layer(Layer[layer]);
            for (let go of list) {
                go["graphic"].draw(context);
                if (go.hasProperty("text")) {
                    go["text"].write(context);
                }
            }
        }

        let list = GameObjectManager.instance.forces();
        for (let go of list) {
            go["force"].update();
        }

        // Debug colliders
        if (this._app.debug === true) {
            let list = GameObjectManager.instance.graphics();
            for (let i = 0; i < list.length; i++) {
                if (list[i].hasProperty("collider")) {
                    list[i]["collider"].show(context);
                }
            }
        }
    }
};
