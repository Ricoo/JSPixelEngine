import {JSPixelApp} from "../js/Engine/JSPixelApp";
import {ResourceManager} from "../js/Resource/ResourceManager";
import {GraphicsManager} from "../js/Engine/GraphicsManager";
import {EventManager} from "../js/Engine/EventManager";
import {Drawable} from "../js/Engine/Drawable";
import {Layer} from "../js/Enum/Layer";
import {KeyCode} from "../js/Enum/KeyCode";
import {Event} from "../js/Enum/Event";
import {GUIButton} from "../js/Engine/GUI/GUIButton";
import {GUIText} from "../js/Engine/GUI/GUIText";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/wand.png",name:"wood_wand",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu",res:[64,32]},
        {src:"./resource/texture/button.png",name:"button",res:[64,32]}
    ]
};

let Game = class Game extends JSPixelApp {
    constructor() {
        super("game");
    }

    initialize() {
        this.getEngine().preStart(resourceList);
        let clickSound = ResourceManager.sounds.findByName("click");
        this.wand = new Drawable("wood_wand","wand", Layer.CHARACTERS, 0, 0, 2);
        this.button = new GUIButton("button","button", "BUTTON", 50, 50, 2, "#000000", 27);
        this.text = new GUIText("randomText", "Hello i'm a text !", 200, 200);

        GraphicsManager.register(this.wand);
        GraphicsManager.register(this.button);
        GraphicsManager.register(this.text);

        EventManager.registerHandler(Event.MouseDown, (mouse) => {clickSound.play();});

        console.log("game initialized");
    }

    frame() {
        let keys = EventManager.keys;
        if (keys.includes(KeyCode.arrowRight)) {
            this.wand.x += 5;
        }
        if (keys.includes(KeyCode.arrowLeft)) {
            this.wand.x -= 5;
        }
        if (keys.includes(KeyCode.arrowUp)) {
            this.wand.y -= 5;
        }
        if (keys.includes(KeyCode.arrowDown)) {
            this.wand.y += 5;
        }
    }

};

function init(){
    new Game();
}

window.onload = init;