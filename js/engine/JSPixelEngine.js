import {JSPixelApp} from "./JSPixelApp";
import {Layer} from "../enum/Layer";
import {GameObjectManager} from "./GameObjectManager";
import {ResourceManager} from "../resource/ResourceManager";
import {EventManager} from "./EventManager";

let JSPixelEngine = class JSPixelEngine {
    constructor() {
        //Singleton
        if (JSPixelEngine.instance !== undefined) {
            return JSPixelEngine.instance;
        }
        JSPixelEngine.instance = this;

        this._registeredApps = []; //This is a list in case we need to manage several canvas at once
        new GameObjectManager();
        new EventManager();
    }

    register(app) {
        if (app instanceof JSPixelApp) {
            this._registeredApps.push(app);
            console.log("registered " + app.name + " in apps list");
        }
        else {throw TypeError("Cannot register this, you may only register a JSPixelApp instance")}
    }

    preLoad(resourcePack) {
        if (this._resourceManager === undefined) {
            this._resourceManager = new ResourceManager();
            this._resourceManager.loadResources(resourcePack);
        }
        if (this._resourceManager.done === false) {
            setTimeout(() => { this.preStart(); }, 100);
        }
        else {
            this.start();
        }
    }

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

    loop() {
        let context = this._registeredApps[0].context;
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        this._registeredApps[0].frame();
        for (let layer in Layer) {
            let list = GameObjectManager.instance.layer(Layer[layer]);
            for (let i = 0; i < list.length; i++) {
                list[i].property("graphic").draw(context);
            }
        }
    }
};

export {JSPixelEngine};