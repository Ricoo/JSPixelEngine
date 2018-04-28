import {JSPixelApp} from "../js/Engine/JSPixelApp";
import {ResourceManager} from "../js/Resource/ResourceManager";
import {GameObjectManager} from "../js/Engine/GameObjectManager";
import {EventManager} from "../js/Engine/EventManager";
import {GameObject} from "../js/Engine/GameObject";
import {Layer} from "../js/Enum/Layer";
import {KeyCode} from "../js/Enum/KeyCode";
import {Event} from "../js/Enum/Event";
import {GUIButton} from "../js/Engine/GUI/GUIButton";
import {GUIText} from "../js/Engine/GUI/GUIText";
import {Graphic} from "../js/Engine/Properties/Graphic";

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
        super("game", resourceList);
    }

    initialize() {
        let clickSound = ResourceManager.getSound("click");
        clickSound.volume = 0.2;
        clickSound.speed = 1;
        this.wand = new GameObject("wand", 0, 0);
        this.wand.attach(new Graphic(ResourceManager.getSprite("wood_wand"), Layer.CHARACTERS, 1));

        //TODO rework GUI elemnents so they match the new property system
        this.button = new GUIButton("button","button", "BUTTON", 50, 50, 2, "#000000", 27);
        this.text = new GUIText("randomText", "Hello i'm a text !", 200, 200);

        // GameObjectManager.register(this.wand);
        // GameObjectManager.register(this.button);
        // GameObjectManager.register(this.text);

        EventManager.registerHandler(Event.MouseDown, (mouse) => {clickSound.play();});

        console.log("game initialized");
    }

    frame() {
        let keys = EventManager.keys;
        if (keys.includes(KeyCode.arrowRight)) {
            this.wand.position.x += 5;
        }
        if (keys.includes(KeyCode.arrowLeft)) {
            this.wand.position.x -= 5;
        }
        if (keys.includes(KeyCode.arrowUp)) {
            this.wand.position.y -= 5;
        }
        if (keys.includes(KeyCode.arrowDown)) {
            this.wand.position.y += 5;
        }
        if (keys.includes(KeyCode.spacebar)) {
            this.wand.detach("graphic");
        }
    }

};


// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;