import GameObject from "./GameObject.js";
import Vector2 from "./math/Vector2.js";
import {Layer} from "../enum/Layer.js";
import {Trigger} from "../enum/Trigger.js";
import ResourceManager from "../resource/ResourceManager.js";


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
        Scene.current.unload();
        Scene.current = undefined;
        this.load();
    }

    async unload() {
        Scene.unloading = this;
        this._gameObjects.forEach(go => {go.delete();})
        this._gameObjects = []
        Scene.unloading = undefined;
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

// export class Scene2 {
//     constructor(json = "{}") {
//         this._gameObjects = [];
//         this._objects = JSON.parse(json);
//         this._json = json;
//         this._preloaded = false;
//     }

//     register(gameObject) {
//         this._gameObjects.push(gameObject)
//     }

//     unregister(gameObject) {
//         this._gameObjects.splice(this._gameObjects.indexOf(gameObject), 1)
//     }

//     async preload() {
//         this._objects = JSON.parse(this._json)
//             Promise.all(Object.keys(this._objects).map(key => {
//                 return this.instantiate(this._objects[key]);
//             })).then(gos => gos.forEach(go => {
//                 this._gameObjects.push(go);
//                 go.disable();
//             }))
//         this._preloaded = true;
//     }

//     async load() {
//         this._objects = JSON.parse(this._json)
//         const instanciation = () => {
//             if (this._preloaded) {
//                 this._gameObjects.forEach(go => go.enable());
//                 return;
//             }
//             Promise.all(Object.keys(this._objects).map(key => {
//                 return this.instantiate(this._objects[key]);
//             })).then(gos => gos.forEach(go => this._gameObjects.push(go)))
//         }
//         if (Scene.current) {
//             Scene2.current.unload().then(instanciation);
//         }
//         else (
//             instanciation()
//         )
//         this._preloaded = false;
//     }

//     async unload() {
//         this.serialize()
//         this._gameObjects.forEach(go => go.delete())
//         this._gameObjects = []
//         return
//     }
    
//     async instantiate(object) {
//         const {args, _cls: cls, props} = object;
//         console.log(args)
//         const go = new GameObject(...args);
//         props.forEach(async ({_cls, args}) => {
//             const cls = await import("./properties/" + _cls + ".js")
//             go.attach(new cls.default(...args));
//         })
//         return go;
//     }
    
//     serialize() {
//         let cache = [];
//         const objects = this._gameObjects.reduce((acc, go) => {
//             acc[go.uuid] = {
//                 "_cls": go.constructor.name,
//                 "args": go.arguments,
//                 "props": go.properties.map(prop => ({
//                         "_cls": prop.constructor.name,
//                         "args": prop.arguments
//                     }
//                 )),
//                 "children": go.children
//             }
//             return acc;
//         }, {});
//         console.log(objects)
//         this._json = JSON.stringify(objects);
//         return this._json;
//     }

//     toString() {
//         return this._json;
//     }
// }
// export default class Scene {
//     constructor(sceneJSON) {
//         sceneJSON = {
//             "name":"Scene1",
//             "gameObjects" : [
//                 {
//                     "name":"figure",
//                     "args":[
//                         "test",
//                         100,
//                         200],
//                     "props":{
//                         "Graphic":["hero","Layer.CHARACTERS",2],
//                         "Force":["20","10"],
//                         "Collider":["new Vector2(10,10)","undefined","()=>{}","Trigger.COLLIDER","true"]
//                     },
//                     "children": [
//                         {
//                             "name":"text",
//                             "cls":"GUIText",
//                             "path":"./gui/GUIText.js",
//                             "args":[
//                                 "test",
//                                 "this is a test text",
//                                 100,
//                                 100],
//                             "props":{
//                                 "Collider":["new Vector2(40,40)","undefined","()=>{}","Trigger.COLLIDER","true"]
//                             }
//                         },
//                     ]
//                 },
//             ]
//         };
//         this._json = sceneJSON;
//         this._objects = [];
//     }

//     load() {
//         for (let obj of this._json.gameObjects) {
//             this.createGameObject(obj).then(go => {this._objects.push(go);});
//         }
//     }

//     unload() {

//     }

//     async createGameObject(obj) {
//         let go = {};
//         if (obj.path !== undefined) {
//             await import(obj.path).then(
//                 (cls) => {
//                     go = new cls.default(...(obj.args));
//                 }
//             );
//         }
//         else {
//             go = new GameObject(...(obj.args));
//         }
//         for (let prop in obj.props) {
//             let args = [];
//             await import(obj.props[prop].path || "./properties/" + prop + ".js").then(
//                 (cls) => {
//                     for (let arg of obj.props[prop]) {
//                         try {
//                             let tmp = eval(arg);
//                             args.push(tmp);
//                         }
//                         catch (ReferenceError) {
//                             args.push(arg);
//                         }
//                     }
//                     go.attach(new cls.default(...args));
//                 }
//             );
//         }
//         if (obj.children !== undefined)
//             obj.children.forEach(child => this.createGameObject(child).then(newChild => go.addChild(newChild)));
//         return Promise.resolve(go);
//     }
// }