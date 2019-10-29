// import GameObject from "./GameObject";
import Vector2 from "./math/Vector2";
import {Layer} from "../enum/Layer";
import {Trigger} from "../enum/Trigger";
// import GameObject from "./GameObject";

export default class Scene {
    constructor(sceneJSON) {
        sceneJSON = {
            "name":"Scene1",
            "gameObjects" : [
                {
                    "args":[
                        "test",
                        "100",
                        "200"],
                    "props":{
                        "Graphic":["hero","Layer.CHARACTERS"],
                        "Force":["1","10"],
                        "Collider":["new Vector2(10,10)","undefined","()=>{}","Trigger.COLLIDER","false"]
                    },
                    "children": [
                        {
                            "cls":"GUIText",
                            "path":"./gui/GUIText.js",
                            "args":[
                                "test",
                                "this is a test text",
                                "100",
                                "100"],
                            "props":{
                                "Collider":["new Vector2(40,40)","undefined","()=>{}","Trigger.COLLIDER","false"]
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
        // if (obj.path !== undefined) {
            // await import(obj.path).then(
            await import(obj.path || "./GameObject.js").then(
                (cls) => {
                    go = new cls.default(...(obj.args));
                }
            );
        // }
        // else {
        //     go = new GameObject(...(obj.args));
        // }
        for (let prop in obj.props) {
            let args = [];
            console.log(prop);
            await import(obj.props[prop].path || "./Properties/" + prop + ".js").then(
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
                    console.log(args);
                    go.attach(new cls.default(...args));
                }
            );
        }
        if (obj.children !== undefined)
            obj.children.forEach(child => this.createGameObject(child).then(newChild => go.addChild(newChild)));
        return Promise.resolve(go);
    }
}