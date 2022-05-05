import GameObject from "./GameObject.js";

export default class Scene {
    constructor(app) {
        if (new.target === Scene) {throw TypeError("Scene isn't instanciable, inherit it first");}
        if(this.init === undefined) {throw SyntaxError("Scene instance must implement an init() => void method")}
        if(this.update === undefined) {throw SyntaxError("Scene instance must implement a update() => void method")}
        this._gameObjects = []
        this._app = app;
    }

    async preload() {
        this.load()
        this._gameObjects.forEach(go => {go.disable();});
    }

    async load() {
        if (Scene.current === this) {
            return;
        }
        if (Scene.current) {
            Scene.current.unload();
        }
        Scene.initializing = this;
        this.init();
        Scene.initializing = undefined;
        Scene.current = this;
    }

    async reload() {
        this.unload();
        Scene.current = undefined;
        this.load();
    }

    async unload() {
        Scene.unloading = this;
        this._gameObjects.forEach(go => {go.delete();})
        this._gameObjects = []
        Scene.unloading = undefined;
        Scene.current = undefined;
    }

    add(go) {
        if (go instanceof GameObject) {
            this._gameObjects.push(go);
        }
        else {
            throw TypeError("You must provide an instance of GameObject");
        }
    }

    remove(go) {
        this._gameObjects.splice(this._gameObjects.indexOf(go), 1);
    }

    static forces() {
        return Scene.current?.gameObjects.filter(go => go.enabled && go.hasProperty("force")) || []
    }

    static graphics() {
        return Scene.current?.gameObjects
            .filter(go => go.enabled && (go.hasProperty("graphic") || go.hasProperty("text")))
            .sort((a, b) => a.layer - b.layer || a.position.y - b.position.y) || []
    }

    static colliders() {
        return Scene.current?.gameObjects.filter(go => go.enabled && go.hasProperty("collider")) || []
    }

    static rigids() {
        return Scene.current?.gameObjects.filter(go => go.enabled && go.hasProperty("collider") && go["collider"].rigid) || []
    }

    static find(name) {
        return Scene.current.gameObjects.filter(go => go.name === name)
    }

    static register(go) {
        if (Scene.initializing) {
            Scene.initializing.add(go);
        } else {
            Scene.current.add(go);
        }
    }

    static unregister(go) {
        if (Scene.unloading) {
            Scene.unloading.remove(go);
        } else {
            Scene.current.remove(go);
        }    
    }

    get gameObjects() {return this._gameObjects;}
    get app() {return this._app;}
}