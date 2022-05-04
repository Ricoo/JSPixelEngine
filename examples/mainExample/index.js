import JSPixelApp from "../../js/engine/JSPixelApp.js";
import EventManager from "../../js/engine/manager/EventManager.js";
import { TextAlign } from "../../js/enum/TextAlign.js";
import { TextType } from "../../js/enum/TextType.js";
import SceneMain from "./scenes/SceneMain.js";

const resourcePack = {
    audio:[
        {src:"../resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"../resource/texture/Knight.png",name:"marine",res:[256,64],atlas:[8,2]},
        {src:"../resource/texture/Hero.png",name:"hero",res:[256,128],atlas:[8,4]},
        {src:"../resource/texture/Clock.png",name:"clock",res:[128,32],atlas:[4,1]},
        {src:"../resource/texture/Platform_stone.png",name:"platform",res:[96,32],atlas:[3,1]},
        {src:"../resource/texture/BasicShip.png",name:"ship",res:[318,64],atlas:[5,1]},
        {src:"../resource/texture/Tickbox.png",name:"tickbox",res:[32,16],atlas:[2,1]},
        {src:"../resource/texture/Particle.png",name:"particle",res:[128,16],atlas:[4,1]}
    ],
    styles:[
        {name:"tooltipText",font: "Arial",size: 13,color: "#000000",type: TextType.fill,align: TextAlign.start},
        {name:"centeredText",font: "Arial",size: 13,color: "#000000",type: TextType.fill,align: TextAlign.center}
    ],
    paths:[
        {name:"square", svg:"M0 0 h 80 v 80 h -80 Z", res:[80, 80]},
        {name:"roundRectangle", svg:"M 26 10 L 74 10 C 82.837 10 90 17.163 90 26 L 90 74 C 90 82.836 82.837 90 74 90 L 26 90 C 17.164 90 10 82.836 10 74 L 10 26 C 10 17.163 17.164 10 26 10 Z", res: [100,100]},
        {name:"star", svg:"M 50 10 L 59.888 39.912 L 90 40.557 L 66 59.689 L 74.721 90 L 50 71.912 L 25.279 90 L 34 59.689 L 10 40.557 L 40.112 39.912 Z", res: [100,100]},
    ]
}

class Game extends JSPixelApp {
    constructor() {
        super("game", resourcePack);
    }

    initialize() {
        const mainScene = new SceneMain()
        mainScene.load();
    }

    frame() {
        const keys = EventManager.keys;
        if (keys.includes("1")) {
            this._debug = {};
        }
        if (keys.includes("2")) {
            this._debug.colliders = true;
        }
        if (keys.includes("3")) {
            this._debug.fps = true;
        }
        if (keys.includes("4")) {
            this._debug.events = true;
        }
        if (keys.includes("5")) {
            this._debug.keys = true;
        }
        if (keys.includes("6")) {
            this._debug = {colliders: true, fps: true, events: true, keys: true}
        }
    }
}

window.onload = () => {new Game()}