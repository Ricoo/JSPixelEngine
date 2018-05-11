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
import {Lerp} from "../js/Engine/Lerp";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/wand.png",name:"wood_wand",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu",res:[64,32]},
        {src:"./resource/texture/button.png",name:"button",res:[64,32]},
        {src:"./resource/texture/button.png",name:"atlas_button",res:[64,64],atlas:[1,2]},
        {src:"./resource/texture/female-full.png",name:"female-full",res:[560,280],atlas:[8,4]},
        {src:"./resource/texture/female2-full.png",name:"female-full2",res:[560,280],atlas:[8,4]},
        {src:"./resource/texture/pikachu.png",name:"pikachu",res:[96,128],atlas:[3,4]},
        {src:"./resource/texture/crocodil.png",name:"crocodil",res:[96,128],atlas:[3,4]}
    ]
};

class Girl extends GameObject {
    constructor(x,y) {
        super("girl", x, y);
        this.attach(new Graphic("female-full", Layer.CHARACTERS, 4, 1));
        this.attach(new Animator());

        this.property("animator").add(new Animation("walk_forward", [0,1,2,3,4,5,6,7], 100, 0));
        this.property("animator").add(new Animation("walk_left", [8,9,10,11,12,13,14,15], 100, 8));
        this.property("animator").add(new Animation("walk_right", [16,17,18,19,20,21,22,23], 100, 16));
        this.property("animator").add(new Animation("walk_backward", [24,25,26,27,28,29,30,31], 100, 24));

    }
}

let Game = class Game extends JSPixelApp {
    constructor() {
        super("game", resourceList);
    }

    initialize() {
        let clickSound = ResourceManager.getSound("click");
        clickSound.volume = 0.2;
        clickSound.speed = 1;

        this.button = new GameObject("button", 0, 0);
        this.button.attach(new Graphic("atlas_button", Layer.GUI, 1));

        this.moveX = new Lerp(this.button.position, "x", ()=>{this.move();});
        this.moved = true;
        this.move();

        this.character = new Girl(100, 100);

        EventManager.registerHandler(Event.MouseDown, (mouse) => {clickSound.play(); this.button.property("graphic").sprite.next();});

        console.log("game initialized");
    }

    move() {
        this.moved = !this.moved;
        if (this.moved) {
            this.moveX.run(0,1000);
        }
        else {
            this.moveX.run(400,1000);
        }
    }

    frame() {
        let keys = EventManager.keys;
        if (keys.includes(KeyCode.arrowRight)) {
            this.character.position.x += 5;
            this.character.property("animator").play("walk_right");
        }
        else if (keys.includes(KeyCode.arrowLeft)) {
            this.character.position.x -= 5;
            this.character.property("animator").play("walk_left");
        }
        else if (keys.includes(KeyCode.arrowUp)) {
            this.character.position.y -= 5;
            this.character.property("animator").play("walk_backward");
        }
        else if (keys.includes(KeyCode.arrowDown)) {
            this.character.position.y += 5;
            this.character.property("animator").play("walk_forward");
        }
        else {
            this.character.property("animator").stop();
        }

        //fades in and out
        if (keys.includes(KeyCode.i)) {
            this.character.property("graphic").alpha += 0.01;
            this.character.angle += 1;
        }
        if (keys.includes(KeyCode.o)) {
            this.character.property("graphic").alpha -= 0.01;
        }

        // toggles graphic property when spacebar is pressed/released
        this.character.property("graphic").visible = !keys.includes(KeyCode.spacebar);
    }

};

// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;