import GameObject from "./GameObject";
import Vector2 from "./math/Vector2";
import {Layer} from "../enum/Layer";
import {Trigger} from "../enum/Trigger";

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
                        "Force":["1","10"],
                        "Collider":["new Vector2(10,10)","undefined","()=>{}","Trigger.COLLIDER","true"]
                    },
                    "children": [
                        {
                            "name":"text",
                            "cls":"GUIText",
                            "path":"./gui/GUIText",
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
            await import(obj.props[prop].path || "./properties/" + prop + "").then(
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