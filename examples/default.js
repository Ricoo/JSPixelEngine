import JSPixelApp from "../js/engine/JSPixelApp";
import ResourceManager from "../js/resource/ResourceManager";
import GameObjectManager from "../js/engine/GameObjectManager";
import EventManager from "../js/engine/EventManager";
import GameObject from "../js/engine/GameObject";
import GUIButton from "../js/engine/gui/GUIButton";
import GUIText from "../js/engine/gui/GUIText";
import Graphic from "../js/engine/properties/Graphic";
import Animator from "../js/engine/properties/Animator";
import Animation from "../js/resource/sprite/Animation";
import Lerp from "../js/engine/math/Lerp";
import Collider from "../js/engine/properties/Collider";
import Particle from "../js/engine/properties/Particle";
import Vector2 from "../js/engine/math/Vector2";
import {Layer} from "../js/enum/Layer";
import {KeyCode} from "../js/enum/KeyCode";
import {Event} from "../js/enum/Event";
import {ParticleType} from "../js/enum/ParticleType";
import {Trigger} from "../js/enum/Trigger";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/female-full.png",name:"female-full",res:[560,280],atlas:[8,4]},
        {src:"./resource/texture/female2-full.png",name:"female-full2",res:[560,280],atlas:[8,4]},
        {src:"./resource/texture/Basicship.png",name:"ship",res:[318,64],atlas:[5,1]},
        {src:"./resource/texture/Tickbox.png",name:"tickbox",res:[32,16],atlas:[2,1]}
    ]
};

const animationList = {
    full_forward :  new Animation("walk_forward",  [0, 1, 2, 3, 4, 5, 6, 7 ], 100, 0),
    full_left :     new Animation("walk_left",     [8, 9, 10,11,12,13,14,15], 100, 8),
    full_right :    new Animation("walk_right",    [16,17,18,19,20,21,22,23], 100, 16),
    full_backward : new Animation("walk_backward", [24,25,26,27,28,29,30,31], 100, 24),
    missile_fire :  new Animation("missile_fire",  [1,2,3,4]                , 100, 4)
};

class Tickbox extends GameObject {
    constructor(x, y, text="") {
        super("tickbox", x, y);
        this.attach(new Graphic("tickbox", Layer.GUI, 1, 1));

        this.tooltip = new GUIText("tooltip", "", x + 20, y);
        this.tooltip.property("text").size = 13;

        this.attach(new Collider(new Vector2(20,20), undefined, () =>{
            let graphic = this.property("graphic");
            if (graphic.tile === 0) {
                graphic.tile = 1;
                graphic.image = graphic.sprite.tile(1);
                this.tooltip.text = text;
            } else {
                graphic.tile = 0;
                graphic.image = graphic.sprite.tile(0);
                this.tooltip.text = "";
            }
        }, Trigger.CLICK));

    }
}

class Girl extends GameObject {
    constructor(x,y, sprite) {
        super("girl", x, y);
        this.attach(new Graphic(sprite, Layer.CHARACTERS, 2, 1));
        this.attach(new Collider(new Vector2(50, 50), new Vector2(0,40), ()=>{}, Trigger.COLLIDER, true));
        this.attach(new Animator([animationList.full_forward,
            animationList.full_left,
            animationList.full_right,
            animationList.full_backward]));
        this.attach(new Particle("ship", ParticleType.Fall, 1, 1500, 10, false, [.4,.6], [2,3,4], [100,200]))
    }
}

class Game extends JSPixelApp {
    constructor() {
        super("game", resourceList);
    }

    initialize() {
        let clickSound = ResourceManager.getSound("click");
        clickSound.volume = 0.2;
        clickSound.speed = 1;

        this.girl2 = new Girl(100, 300, "female-full");
        this.girl1 = new Girl(100, 200, "female-full2");
        this.tickbox = new Tickbox(20, 100, "Hey you ticked me !");
        this.tickbox2 = new Tickbox(20, 120, "Why do you keep ticking us ??");

        this.moveX = new Lerp(this.girl2.position, "x", () => {this.move();});
        this.moved = true;
        this.move();

        EventManager.registerHandler(Event.MouseDown, (mouse) => {clickSound.play();});
        console.log("my super game have been initialized !");
    }

    move() {
        this.moved = !this.moved;
        if (this.moved) {
            this.moveX.run(0,2000);
            this.girl2.property("animator").play("walk_left");
        }
        else {
            this.moveX.run(350,2000);
            this.girl2.property("animator").play("walk_right");
        }
    }

    frame() {
        let keys = EventManager.keys;
        if (keys.includes(KeyCode.arrowRight)) {
            this.girl1.position.x += 3;
            this.girl1.property("animator").play("walk_right");
        }
        else if (keys.includes(KeyCode.arrowLeft)) {
            this.girl1.position.x -= 3;
            this.girl1.property("animator").play("walk_left");
        }
        else if (keys.includes(KeyCode.arrowUp)) {
            this.girl1.position.y -= 3;
            this.girl1.property("animator").play("walk_backward");
        }
        else if (keys.includes(KeyCode.arrowDown)) {
            this.girl1.position.y += 3;
            this.girl1.property("animator").play("walk_forward");
        }
        else {
            this.girl1.property("animator").stop();
        }

        //fades in and out
        if (keys.includes(KeyCode.i)) {
            this.girl1.property("graphic").alpha += 0.01;
            // this.girl1.angle += 1;
            this.girl1.property("particle").run();
        }
        if (keys.includes(KeyCode.o)) {
            this.girl1.property("graphic").alpha -= 0.01;
            this.girl1.property("particle").stop();
            this.tickbox.toggle();
        }

        if (keys.includes(KeyCode.num1)) {
            this._debug = false;
        }
        if (keys.includes(KeyCode.num2)) {
            this._debug = true;
        }

        // toggles graphic property when spacebar is pressed/released
        this.girl1.property("graphic").visible = !keys.includes(KeyCode.spacebar);
        this.girl1.property("collider").collide(this.girl2.property("collider"));
    }
};

// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;