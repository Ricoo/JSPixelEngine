import JSPixelApp from "../js/engine/JSPixelApp";
import EventManager from "../js/engine/manager/EventManager";
import ResourceManager from "../js/resource/ResourceManager";
import GameObjectManager from "../js/engine/manager/GameObjectManager";
import CollisionManager from "../js/engine/manager/CollisionManager";
import GameObject from "../js/engine/GameObject";
import Vector2 from "../js/engine/math/Vector2";
import Animator from "../js/engine/properties/Animator";
import Force from "../js/engine/properties/Force";
import Particle from "../js/engine/properties/Particle";
import Text from "../js/engine/properties/Text";
import TiledGraphic from "../js/engine/properties/TiledGraphic";
import Collider from "../js/engine/properties/Collider";
import Graphic from "../js/engine/properties/Graphic";
import {Layer} from "../js/enum/Layer";
import {DefaultValues} from "../js/enum/DefaultValues";
import {Trigger} from "../js/enum/Trigger";
import {KeyCode} from "../js/enum/KeyCode";
import {TextType} from "../js/enum/TextType";
import {TextAlign} from "../js/enum/TextAlign";
import {ParticleType} from "../js/enum/ParticleType";

(function main(){
    let resourcePack = {
        audio:[
            {src:"./resource/sound/click.wav",name:"click"}
        ],
        sprites:[
            {src:"./resource/texture/Tickbox.png",name:"tickbox",res:[32,16],atlas:[2,1]}
        ]
    };

    let enumList = {
        "Layer":Layer,
        "Trigger":Trigger,
        "TextType":TextType,
        "TextAlign":TextAlign,
        "ParticleType":ParticleType
    };

    let propertyList = {
        "Animator" : Animator,
        "Collider" : Collider,
        "Force" : Force,
        "Graphic" : Graphic,
        "Particle" : Particle,
        "Text" : Text,
        "TiledGraphic" : TiledGraphic
    };

    class EditorGameObject extends GameObject {
        constructor(name, x, y, editor) {
            super(name, x, y);
            this.object = new GameObject("gameObject", x, y);
            this.editor = editor;
            this.addChild(this.object);
            this.attach(new Graphic(DefaultValues.EMPTY_IMAGE.name, Layer.CHARACTERS));
            this.attach(new Collider(new Vector2(40,40),undefined,(o, ev)=>{if (ev.click) {this.select();}},Trigger.MOUSE));

            // html nodes
            this.listElement = document.createElement("div");
            this.listElement.className = "gameObjectNode";
            this.listElement.onclick = ()=>{this.select();};
            this.nameElement = document.createTextNode(this.name);
            this.listElement.appendChild(this.nameElement);
            let container = document.getElementById("gameObjectList");
            container.appendChild(this.listElement);

            this.goName = document.getElementById("gameObjectName").getElementsByTagName("input")[0];
            this.goX = document.getElementById("gameObjectPosition").getElementsByTagName("input")[0];
            this.goY = document.getElementById("gameObjectPosition").getElementsByTagName("input")[1];
            this.propContainer = document.getElementById("gameObjectProperties");
        }

        select() {
            this.editor._selected = this;
            this.propContainer.innerHTML="";
            GameObjectManager.instance.colliders().forEach(obj=> {if (obj instanceof EditorGameObject) obj["collider"].trigger=Trigger.MOUSE;});
            Array.from(document.getElementsByClassName("selected")).forEach(elem => elem.classList.remove("selected"));
            this.listElement.classList.add("selected");
            this["collider"].trigger = Trigger.HOVER;

            this.goName.value = this.name;
            this.goX.value = this.position.x;
            this.goY.value = this.position.y;

            this.goName.onchange = ()=>{if (this.goName.value === "") return; this.name = this.goName.value; this.listElement.innerText = this.name;};
            this.goX.oninput = ()=>{super.x = parseInt(this.goX.value)};
            this.goY.oninput = ()=>{super.y = parseInt(this.goY.value);};

            this.object._properties.forEach(i => {
                let propDiv = document.createElement("div");
                let link = document.createElement("a");
                let attrDiv = document.createElement("div");
                let remove = document.createElement("a");

                propDiv.classList.add("property");
                attrDiv.classList.add("attrContainer");

                remove.classList.add("remove");
                remove.innerHTML = "X";
                link.classList.add("collapse");
                link.innerHTML = " " + this.object[i].constructor.name + " :";
                link.onclick = ()=>{link.classList.toggle("activated"); attrDiv.classList.toggle("collapsed")};
                remove.onclick = ()=>{this.object.detach(i); this.select()};
                propDiv.appendChild(link);
                propDiv.appendChild(remove);
                propDiv.appendChild(attrDiv);
                let prop = this.object[i];
                Object.getOwnPropertyNames(prop).filter(e=>!e.startsWith("_")).forEach((attr, index)=>{
                    console.log(attr + ": " + prop._valueType[attr]);
                    if (index > 0) {attrDiv.appendChild(document.createElement("br"));}
                    attrDiv.appendChild(document.createTextNode(attr + " :"));
                    let input = document.createTextNode("");
                    // console.log(prop[attr].constructor.name);
                    switch (prop._valueType[attr]) {
                        case "Number":
                            input = document.createElement("input");
                            input.type = "number";
                            input.value = prop[attr];
                            input.onchange = ()=>{prop[attr] = parseInt(input.value)};
                            break;
                        case "Sprite":
                            input = document.createElement("select");
                            for (let sprite of ResourceManager.sprites) {
                                let o = document.createElement("option");
                                o.appendChild(document.createTextNode(sprite.name));
                                o.value = sprite.name;
                                input.appendChild(o);
                            }
                            input.value = prop[attr].name;
                            input.onchange = ()=>{prop[attr] = ResourceManager.getSprite(input.value);};
                            break;
                        case "Vector2":
                            input = document.createElement("div");
                            input.style.display = "inline";
                            let x = document.createElement("input");
                            x.type = "number";
                            x.classList.add("vector2");
                            let y = x.cloneNode(true);
                            input.appendChild(x);
                            input.appendChild(y);
                            x.value = prop[attr].x;
                            y.value = prop[attr].y;
                            x.onchange = ()=>{prop[attr].x = parseInt(x.value);};
                            y.onchange = ()=>{prop[attr].y = parseInt(y.value)};
                            break;
                        case "Boolean":
                            input = document.createElement("input");
                            input.type = "checkbox";
                            input.checked = prop[attr];
                            input.onchange = ()=>{prop[attr] = input.checked;};
                            break;
                        case "Function":
                            input = document.createElement("strong");
                            input.appendChild(document.createTextNode("defined in code"));
                            break;
                        case "String":
                            input = document.createElement("input");
                            input.type = "text";
                            input.value = prop[attr];
                            input.onchange = ()=>{prop[attr] = input.value;};
                            break;
                        default:
                            input = document.createElement("select");
                            const curEnum = enumList[prop._valueType[attr]];
                            for (let field in curEnum) {
                                let o = document.createElement("option");
                                o.appendChild(document.createTextNode(field));
                                o.value = field;
                                input.appendChild(o);
                            }
                            input.value = Object.keys(curEnum).find(key => curEnum[key] === prop[attr]);
                            input.onchange = () => {prop[attr] = curEnum[input.value]};
                            break;
                    }
                    attrDiv.appendChild(input);
                });
                if (prop.customEditorDisplay !== undefined) {
                    attrDiv.appendChild(prop.customEditorDisplay);
                }
                this.propContainer.appendChild(propDiv);
            });
        }

        addProperty() {
            let propName = document.getElementById("propertySelect").value;
            console.log(propName);
            let prop = new propertyList[propName]();
            try {
                this.object.attach(prop);
            } catch {
                console.log("Cancelled invalid attach method");
                this.object.detach(prop._PROPERTY_NAME);
            }
            this.select();
        }

        delete() {
            this.listElement.remove();
            super.delete();
        }

        set x(value) {
            super.x = value;
            this.goX.value = this.position.x;
        }
        set y(value) {
            super.y = value;
            this.goY.value = this.position.y;
        }
        get x(){return this.position.x;}
        get y(){return this.position.y;}
    }

    class Editor extends JSPixelApp {
        constructor() {
            super("editor", resourcePack);
            this._debug = true;
            this._drag = false;
            this._selected = undefined;
            this.createEmpty();
        }

        initialize() {
            document.getElementById("addGameObject").onclick = ()=>{this.createEmpty()};
            document.getElementById("removeGameObject").onclick = ()=>{this.deleteGameObject()};
            document.getElementById("addProperty").onclick = ()=>{this.addProperty()};
            let selector = document.getElementById("propertySelect");
            for (let prop in propertyList) {
                let o = document.createElement("option");
                o.appendChild(document.createTextNode(prop));
                o.value = prop;
                selector.appendChild(o);
            }
        }

        createEmpty() {
            new EditorGameObject("gameObject", this._canvas.width/2, this._canvas.height/2, this);
        }

        deleteGameObject() {
            if (this._selected !== undefined) {
                this._selected.delete();
                this._selected = undefined;
            }
        }

        addProperty() {
            if (this._selected !== undefined) {
                this._selected.addProperty();
            }
        }

        frame() {
            let mouse = EventManager.mouse;
            let keys = EventManager.keys;

            if (keys.includes(KeyCode.spacebar)) {
                console.log(document.activeElement);//this._selected);
            }

            if (this._selected !== undefined) {
                let mvt = 1;
                if (!this._drag && mouse.click) {
                    let dragged = CollisionManager.instance.checkRaycast(mouse.x, mouse.y, false);
                    this._drag = (dragged === this._selected);
                }
                if (!mouse.click) {
                    this._drag = false;
                }
                if (this._drag) {
                    this._selected.x = mouse.x;
                    this._selected.y = mouse.y;
                }

                if (keys.includes(KeyCode.shift)) {
                    mvt = 5;
                }

                let activeElement = document.activeElement;
                let inputs = ['input', 'select', 'button', 'textarea'];

                if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) === -1) {
                    if (keys.includes(KeyCode.arrowLeft)) {
                        this._selected.x -= mvt;
                    }
                    if (keys.includes(KeyCode.arrowRight)) {
                        this._selected.x += mvt;
                    }
                    if (keys.includes(KeyCode.arrowDown)) {
                        this._selected.y += mvt;
                    }
                    if (keys.includes(KeyCode.arrowUp)) {
                        this._selected.y -= mvt;
                    }
                    if (keys.includes(KeyCode.d) && keys.includes(KeyCode.alt)) {
                        this.deleteGameObject();
                    }
                }
            }
        }
    }

    new Editor();
})();