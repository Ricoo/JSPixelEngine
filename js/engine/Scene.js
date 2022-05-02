import GameObject from "./GameObject.js";
import Vector2 from "./math/Vector2.js";
import {Layer} from "../enum/Layer.js";
import {Trigger} from "../enum/Trigger.js";
import ResourceManager from "../resource/ResourceManager.js";


export class Scene2 {
    constructor(json = "{}") {
        this._gameObjects = [];
        this._objects = {};
        this._json = JSON.parse(json); 
    }

    register(gameObject) {
        this._gameObjects.push(gameObject)
    }

    unregister(gameObject) {
        this._gameObjects.splice(this._gameObjects.indexOf(gameObject), 1)
    }

    async preload() {
        this._gameObjects = Object.keys(this._json).map(key => {
            // return this.instantiate(this._json.)
        });
    }

    async load() {
        Scene2.current.unload().then(()=>{
            Scene2.current = this;
            Promise.all(Object.values(this._object).map(key => {
                return this.instantiate(this._object[key]);
            }))
        });
    }

    async unload() {
        this.serialize()
        this._gameObjects.forEach(go => go.delete())
        return
    }
    
    async instantiate(object) {
        const {x, y, angle, name, cls} = object[key];
    }
    
    serialize() {
        let cache = [];
        this._objects = this._gameObjects.reduce((acc, go) => {
            acc[go.uuid] = {
                "_cls": go.constructor.name,
                "args": go.args,
                "props": go.properties.map(prop => ({
                        "_cls": prop.constructor.name,
                        "args": prop.arguments
                    }
                )),
                "children": go.children
            }
            return acc;
            // JSON.stringify(go, (key, value) => {
            //     if (typeof value === 'object' && value !== null) {
            //         if (cache.includes(value)) {
            //             return value?.uuid;
            //         }
            //         cache.push(value)
            //     }
            //     return value;
            // },);
        }, {});
        return this._objects
    }

    toString() {
        return this._objects.toString()
    }
}
export default class Scene {
    constructor(sceneJSON) {
        sceneJSON = {
            "name":"Scene1",
            "gameObjects" : [
                {
                    "name":"figure",
                    "args":[
                        "test",
                        100,
                        200],
                    "props":{
                        "Graphic":["hero","Layer.CHARACTERS",2],
                        "Force":["20","10"],
                        "Collider":["new Vector2(10,10)","undefined","()=>{}","Trigger.COLLIDER","true"]
                    },
                    "children": [
                        {
                            "name":"text",
                            "cls":"GUIText",
                            "path":"./gui/GUIText.js",
                            "args":[
                                "test",
                                "this is a test text",
                                100,
                                100],
                            "props":{
                                "Collider":["new Vector2(40,40)","undefined","()=>{}","Trigger.COLLIDER","true"]
                            }
                        },
                    ]
                },
            ]
        };
        this._json = sceneJSON;
        this._objects = [];
    }

    load() {
        for (let obj of this._json.gameObjects) {
            this.createGameObject(obj).then(go => {this._objects.push(go);});
        }
    }

    unload() {

    }

    async createGameObject(obj) {
        let go = {};
        if (obj.path !== undefined) {
            await import(obj.path).then(
                (cls) => {
                    go = new cls.default(...(obj.args));
                }
            );
        }
        else {
            go = new GameObject(...(obj.args));
        }
        for (let prop in obj.props) {
            let args = [];
            await import(obj.props[prop].path || "./properties/" + prop + ".js").then(
                (cls) => {
                    for (let arg of obj.props[prop]) {
                        try {
                            let tmp = eval(arg);
                            args.push(tmp);
                        }
                        catch (ReferenceError) {
                            args.push(arg);
                        }
                    }
                    go.attach(new cls.default(...args));
                }
            );
        }
        if (obj.children !== undefined)
            obj.children.forEach(child => this.createGameObject(child).then(newChild => go.addChild(newChild)));
        return Promise.resolve(go);
    }
}