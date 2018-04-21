import {JSPixelApp} from "./JSPixelApp";
import {Layer} from "../Enums/Layer";
import {GraphicsManager} from "./GraphicsManager";
import {ResourceManager} from "../Resources/ResourceManager";

let JSPixelEngine = class JSPixelEngine {
    constructor() {
        if (JSPixelEngine.instance !== undefined) {
            return JSPixelEngine.instance;
        }

        this._registeredApps = []; //This is a list in case we need to manage several canvas at once
        this._drawables = new GraphicsManager();

        //TODO manage all stuff
        JSPixelEngine.instance = this;
    }

    register(app) {
        if (app instanceof JSPixelApp) {
            this._registeredApps.push(app);
            console.log("registered " + app.name + " in apps list");
            app.initialize();
        }
        else {throw TypeError("Cannot register this, you may only register a JSPixelApp instance")}
    }

    preStart(context, resourcePack) {
        if (this._resourceManager === undefined) {
            this._resourceManager = new ResourceManager(context);
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
        if (this._loop === undefined) {
            this._loop = setInterval(() => {
                this.loop();
            }, 17);
            console.log("started engine loop");
        }
    }

    loop() {
        let context = this._registeredApps[0].context;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        this._registeredApps[0].frame();
        for (let layer in Layer) {
            let list = this._drawables.layer(Layer[layer]);
            for (let i = 0; i < list.length; i++) {
                list[i].draw();
            }
        }
        //TODO Implement Layer drawing system
    }

    get drawables() {return this._drawables;}


    static getInstance() {
        return new JSPixelEngine();
    }
};

export {JSPixelEngine};