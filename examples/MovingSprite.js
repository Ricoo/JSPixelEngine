import {JSPixelApp} from "../js/engine/JSPixelApp";
import {ResourceManager} from "../js/resource/ResourceManager";
import {GameObjectManager} from "../js/engine/GameObjectManager";
import {EventManager} from "../js/engine/EventManager";
import {GameObject} from "../js/engine/GameObject";
import {Layer} from "../js/enum/Layer";
import {KeyCode} from "../js/enum/KeyCode";
import {Event} from "../js/enum/Event";
import {GUIButton} from "../js/resource/sprite/GUI/GUIButton";
import {GUIText} from "../js/resource/sprite/GUI/GUIText";
import {Graphic} from "../js/engine/properties/Graphic";
import {Animator} from "../js/engine/properties/Animator";
import {Animation} from "../js/resource/sprite/Animation";
import {Lerp} from "../js/engine/math/Lerp";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/wand.png",name:"wood_wand",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu",res:[64,32]},
        {src:"./resource/texture/button.png",name:"button",res:[64,64],atlas:[1,2]},
        {src:"./resource/texture/female-full.png",name:"female-full",res:[560,280],atlas:[8,4]},
        {src:"./resource/texture/female2-full.png",name:"female-full2",res:[560,280],atlas:[8,4]},
        {src:"./resource/texture/pikachu.png",name:"pikachu",res:[96,128],atlas:[3,4]},
        {src:"./resource/texture/crocodil.png",name:"crocodil",res:[96,128],atlas:[3,4]},
        {src:"./resource/texture/BasicTile.png",name:"tile",res:[32,32]}
    ]
};

const animationList = {
    full_forward : new Animation("walk_forward",  [0, 1, 2, 3, 4, 5, 6, 7 ], 100, 0),
    full_left : new Animation("walk_left",     [8, 9, 10,11,12,13,14,15], 100, 8),
    full_right : new Animation("walk_right",    [16,17,18,19,20,21,22,23], 100, 16),
    full_backward : new Animation("walk_backward", [24,25,26,27,28,29,30,31], 100, 24)
};

class Girl extends GameObject {
    constructor(x,y, sprite) {
        super("girl", x, y);
        this.attach(new Graphic(sprite, Layer.CHARACTERS, 4, 1));
        this.attach(new Animator());

        this.property("animator").add(animationList.full_forward);
        this.property("animator").add(animationList.full_left);
        this.property("animator").add(animationList.full_right);
        this.property("animator").add(animationList.full_backward);
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

        this.girl2 = new Girl(100, 200, "female-full");
        this.girl1 = new Girl(100, 100, "female-full2");

        this.moveX = new Lerp(this.girl2.position, "x", () => {this.move();});
        this.moved = true;
        this.move();

        EventManager.registerHandler(Event.MouseDown, (mouse) => {clickSound.play();});
        console.log("game initialized");
    }

    move() {
        this.moved = !this.moved;
        if (this.moved) {
            this.moveX.run(0,1000);
            this.girl2.property("animator").play("walk_left");
        }
        else {
            this.moveX.run(400,1000);
            this.girl2.property("animator").play("walk_right");
        }
    }

    frame() {
        let keys = EventManager.keys;
        if (keys.includes(KeyCode.arrowRight)) {
            this.girl1.position.x += 5;
            this.girl1.property("animator").play("walk_right");
        }
        else if (keys.includes(KeyCode.arrowLeft)) {
            this.girl1.position.x -= 5;
            this.girl1.property("animator").play("walk_left");
        }
        else if (keys.includes(KeyCode.arrowUp)) {
            this.girl1.position.y -= 5;
            this.girl1.property("animator").play("walk_backward");
        }
        else if (keys.includes(KeyCode.arrowDown)) {
            this.girl1.position.y += 5;
            this.girl1.property("animator").play("walk_forward");
        }
        else {
            this.girl1.property("animator").stop();
        }

        //fades in and out
        if (keys.includes(KeyCode.i)) {
            this.girl1.property("graphic").alpha += 0.01;
//            this.girl1.angle += 1;
        }
        if (keys.includes(KeyCode.o)) {
            this.girl1.property("graphic").alpha -= 0.01;
        }

        // toggles graphic property when spacebar is pressed/released
        this.girl1.property("graphic").visible = !keys.includes(KeyCode.spacebar);
    }
};

// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;