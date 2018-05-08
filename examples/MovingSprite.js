import {JSPixelApp} from "../js/Engine/JSPixelApp";
import {ResourceManager} from "../js/Resource/ResourceManager";
import {GameObjectManager} from "../js/Engine/GameObjectManager";
import {EventManager} from "../js/Engine/EventManager";
import {GameObject} from "../js/Engine/GameObject";
import {Layer} from "../js/Enum/Layer";
import {KeyCode} from "../js/Enum/KeyCode";
import {Event} from "../js/Enum/Event";
import {GUIButton} from "../js/Resource/Sprite/GUI/GUIButton";
import {GUIText} from "../js/Resource/Sprite/GUI/GUIText";
import {Graphic} from "../js/Engine/Properties/Graphic";
import {Animator} from "../js/Engine/Properties/Animator";
import {Animation} from "../js/Resource/Sprite/Animation";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/wand.png",name:"wood_wand",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu",res:[64,32]},
        {src:"./resource/texture/button.png",name:"button",res:[64,32]},
        {src:"./resource/texture/button.png",name:"atlas_button",res:[64,64],atlas:[1,2]},
        {src:"./resource/texture/pikachu.png",name:"pikachu",res:[96,128],atlas:[3,4]}
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
        this.button = new GameObject("button", 50, 50);
        this.button.attach(new Graphic(ResourceManager.getSprite("atlas_button"), Layer.GUI, 1));

        this.pikachu = new GameObject("pika", 100, 100);
        this.pikachu.attach(new Graphic(ResourceManager.getSprite("pikachu"), Layer.CHARACTERS, 4));
        this.pikachu.attach(new Animator());
        this.pikachu.property("animator").add(new Animation("walk_forward", [0,1,2,1], 250));
        this.pikachu.property("animator").add(new Animation("walk_left", [3,4,5,4], 250));
        this.pikachu.property("animator").add(new Animation("walk_right", [6,7,8,7], 250));
        this.pikachu.property("animator").add(new Animation("walk_backward", [9,10,11,10], 250));
        this.pikachu.property("animator").play("walk_forward");

        //TODO rework GUI elemnents so they match the new property system
        //this.button = new GUIButton("button","button", "BUTTON", 50, 50, 2, "#000000", 27);
        this.text = new GUIText("randomText", "Hello i'm a text !", 200, 200);

        EventManager.registerHandler(Event.MouseDown, (mouse) => {clickSound.play(); this.button.property("graphic").sprite.next();});

        console.log("game initialized");
    }

    frame() {
        let keys = EventManager.keys;
        if (keys.includes(KeyCode.arrowRight)) {
            this.wand.position.x += 5;
            this.pikachu.property("animator").play("walk_right");
        }
        if (keys.includes(KeyCode.arrowLeft)) {
            this.wand.position.x -= 5;
            this.pikachu.property("animator").play("walk_left");
        }
        if (keys.includes(KeyCode.arrowUp)) {
            this.wand.position.y -= 5;
            this.pikachu.property("animator").play("walk_backward");
        }
        if (keys.includes(KeyCode.arrowDown)) {
            this.wand.position.y += 5;
            this.pikachu.property("animator").play("walk_forward");

        }
        //zooms in and out
        if (keys.includes(KeyCode.i)) {
            this.wand.property("graphic").scale += 0.1;
        }
        if (keys.includes(KeyCode.o)) {
            this.wand.property("graphic").scale -= 0.1;
        }
        // removes the graphic property
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