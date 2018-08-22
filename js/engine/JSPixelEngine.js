import {JSPixelApp} from "./JSPixelApp";
import {GameObjectManager} from "./GameObjectManager";
import {ResourceManager} from "../resource/ResourceManager";
import {EventManager} from "./EventManager";
import {CollisionManager} from "./CollisionManager";

let JSPixelEngine = class JSPixelEngine {
    constructor() {
        //Singleton
        if (JSPixelEngine.instance !== undefined) {
            return JSPixelEngine.instance;
        }
        JSPixelEngine.instance = this;

        this._registeredApps = []; //This is a list in case we need to manage several canvas at once
        new GameObjectManager();
        new CollisionManager();
        new EventManager();
    }

    /**
     * @desc registers the app into the engine
     * @param app : JSPixelApp, the app instance
     */
    register(app) {
        if (app instanceof JSPixelApp) {
            this._registeredApps.push(app);
            console.log("Registered " + app.name + " in apps list");
        }
        else {throw TypeError("Cannot register this, you may only register a JSPixelApp instance")}
    }

    /**
     * @desc loads the given resource pack into memory before running the engine
     * @param resourcePack : {audio:*[],sprites:*[]}, the resource pack descriptor
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
        for (let app of this._registeredApps) {
            app.initialize();
        }
        if (this._loop === undefined) {
            this._loop = setInterval(() => {
                this.loop();
            }, 17);
            console.log("JSPixelEngine main loop started");
        }
    }

    /**
     * @desc the main loop of the engine
     */
    loop() {
        let context = this._registeredApps[0].context;
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();

        this._registeredApps[0].frame();
        let list = GameObjectManager.instance.graphics();
        CollisionManager.instance.checkCollision();
        for (let i = 0; i < list.length; i++) {
            list[i].property("graphic").draw(context);
            if (this._registeredApps[0].debug === true && list[i].hasProperty("collider")) {
                list[i].property("collider").show(context);
            }
        }
    }
};

export {JSPixelEngine};