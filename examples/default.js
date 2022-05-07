import JSPixelApp from "../js/engine/JSPixelApp.js";
import ResourceManager from "../js/resource/ResourceManager.js";
import EventManager from "../js/engine/manager/EventManager.js";
import GameObject from "../js/engine/GameObject.js";
import GUIText from "../js/engine/gui/GUIText.js";
import Graphic from "../js/engine/properties/Graphic.js";
import Animator from "../js/engine/properties/Animator.js";
import Animation from "../js/resource/sprite/Animation.js";
import Lerp from "../js/engine/math/Lerp.js";
import Vector2 from "../js/engine/math/Vector2.js";
import Collider from "../js/engine/properties/Collider.js";
import Particle from "../js/engine/properties/Particle.js";
import Force from "../js/engine/properties/Force.js";
import {Layer} from "../js/enum/Layer.js";
import {Event} from "../js/enum/Event.js";
import {ParticleType} from "../js/enum/ParticleType.js";
import {Trigger} from "../js/enum/Trigger.js";
import TiledGraphic from "../js/engine/properties/TiledGraphic.js";
import Scene from "../js/engine/Scene.js";
import { TextType } from "../js/enum/TextType.js";
import { TextAlign } from "../js/enum/TextAlign.js";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/Knight.png",name:"marine",res:[256,64],atlas:[8,2]},
        {src:"./resource/texture/Hero.png",name:"hero",res:[256,128],atlas:[8,4]},
        {src:"./resource/texture/Clock.png",name:"clock",res:[128,32],atlas:[4,1]},
        {src:"./resource/texture/Platform_stone.png",name:"platform",res:[96,32],atlas:[3,1]},
        {src:"./resource/texture/BasicShip.png",name:"ship",res:[318,64],atlas:[5,1]},
        {src:"./resource/texture/Tickbox.png",name:"tickbox",res:[32,16],atlas:[2,1]},
        {src:"./resource/texture/Particle.png",name:"particle",res:[128,16],atlas:[4,1]}
    ],
    styles:[
        {name:"tooltipText",font: "Arial",size: 13,color: "#000000",type: TextType.fill,align: TextAlign.start}
    ],
    paths:[
        {name:"square", svg:"M0 0 h 80 v 80 h -80 Z", res:[80, 80]},
        {name:"roundRectangle", svg:"M 26 10 L 74 10 C 82.837 10 90 17.163 90 26 L 90 74 C 90 82.836 82.837 90 74 90 L 26 90 C 17.164 90 10 82.836 10 74 L 10 26 C 10 17.163 17.164 10 26 10 Z", res: [100,100]},
        {name:"star", svg:"M 50 10 L 59.888 39.912 L 90 40.557 L 66 59.689 L 74.721 90 L 50 71.912 L 25.279 90 L 34 59.689 L 10 40.557 L 40.112 39.912 Z", res: [100,100]},
    ]
};

const animationList = {
    character_right : new Animation("character_right",[0, 1, 2, 3, 4, 5, 6, 7 ],100,0),
    character_left : new Animation("character_left",[8, 9, 10,11,12,13,14,15],100,8),
    character_idle_right : new Animation("character_idle_right",[16,17,18,19,20,21,22,23],100,16),
    character_idle_left : new Animation("character_idle_left",[24,25,26,27,28,29,30,31],100,24),
    pendulum_tick : new Animation("pendulum_tick", [0,1,2,3], 200, 0),
    missile_fire : new Animation("missile_fire",[1,2,3,4],100,4)
};

class Square extends GameObject {
    constructor(x, y) {
        super("square", x, y, Layer.PARTICLE);
        this.attach(
            new Graphic(
                ResourceManager.getPath("roundRectangle")
                    .get(370, 170, 4, "yellow", "rgba(0,0,0,.5)")
            )
        );
    }
}

class Tickbox extends GameObject {
    constructor(x, y, text="") {
        super("tickbox", x, y, Layer.GUI);
        this.attach(new Graphic("tickbox", 1, 1));
        this._ticked = false;

        this.tooltip = new GUIText("tooltip", text, x + 20, y, ResourceManager.getStyle("tooltipText"));
        let dimensions = this.tooltip.text.getDimensions(Game.instance.context);
        this.tooltip.attach(new Collider(new Vector2(dimensions.x,dimensions.y), new Vector2(dimensions.x/2, 0), (obj, mouse)=>{
            if (mouse.hover) {
                obj.text.setStyle({color: "#FFFFFF"})
            }
            else {
                obj.text.setStyle({color: "#000000"})
            }
        }, Trigger.HOVER));
        this.tooltip.disable();

        this.attach(new Collider(new Vector2(20,20), undefined, (obj, mouse) =>{
            if (!mouse.click)
                return;
            this._ticked = !this._ticked;
            this["graphic"].tile = this._ticked ? 1 : 0;
            this.tooltip.toggle();
        }, Trigger.CLICK));

    }
}

class Clock extends GameObject {
    constructor(x, y) {
        super("clock", x, y, Layer.BACKGROUND);
        this.attach(new Graphic("clock", 4));
        this.attach(new Animator([animationList.pendulum_tick]));
        this["animator"].play("pendulum_tick");
    }
}

class Hero extends GameObject {
    constructor(x, y, sprite) {
        super("hero", x, y, Layer.CHARACTERS);
        this.attach(new Graphic(sprite, 4));
        this.attach(new Collider(new Vector2(50, 110), new Vector2(0,10), ()=>{}, Trigger.COLLIDER, true));
        this.attach(new Animator([animationList.character_left,
            animationList.character_right,
            animationList.character_idle_left,
            animationList.character_idle_right]));
        this.attach(new Particle("particle", ParticleType.Fall, 1, 500, 30, true, [2,3], [0,1,2,3], new Vector2(10,20), new Vector2(0,60)));
        this.attach(new Force(20, 10, false));
    }
}

class Marine extends GameObject {
    constructor(x, y, sprite) {
        super("marine", x, y, Layer.CHARACTERS);
        this.attach(new Graphic(sprite, 4));
        this.attach(new Collider(new Vector2(50, 90), new Vector2(0,0), ()=>{}, Trigger.COLLIDER, true));
        this.attach(new Animator([animationList.character_left, animationList.character_right]));
        this.attach(new Force(20, 10, true));
    }
}

class Platform extends GameObject {
    constructor(x, y) {
        super("platform", x, y, Layer.BACKGROUND);
        this.attach(new TiledGraphic("platform", 4, 0, 1, 2, 6));
        this.attach(new Collider(new Vector2(700, 40), new Vector2(0, -10), ()=>{}, Trigger.COLLIDER, true));
    }
}

class LandingScene extends Scene {
    init() {
        let clickSound = ResourceManager.getSound("click");
        clickSound.volume = 0.2;
        clickSound.speed = 1;

        this.marine = new Marine(300,100, "marine");
        this.hero = new Hero(100,100, "hero");
        this.jump = false;

        this.tickbox = new Tickbox(20, 100, ["Hey you ticked me !", "test"]);
        this.tickbox2 = new Tickbox(20, 120, "Why do you keep ticking us ??");
        this.clock = new Clock(640, 615);
        this.test = new Platform(400,710);

        this.moveX = new Lerp(this.marine, "x", () => {this.move();});
        this.moved = true;
        this.move();

        this.square = new Square(200, 100);

        EventManager.registerHandler(Event.MouseDown, () => {clickSound.play();});
        console.log("my super game have been initialized !");
    }

    update(deltaTime) {
        let keys = EventManager.keys;
        if (keys.includes("ArrowRight")) {
            this.hero.orientation = "right";
            this.hero.x += 300 * deltaTime / 1000;
            this.hero["animator"].play("character_right");
            this.hero["particle"].run();
        }
        else if (keys.includes("ArrowLeft")) {
            this.hero.orientation = "left";
            this.hero.x -= 300 * deltaTime / 1000;
            this.hero["animator"].play("character_left");
            this.hero["particle"].run();
        }
        else if (this.hero.orientation === "right") {
            this.hero["animator"].play("character_idle_right");
            this.hero["particle"].stop();
        }
        else {
            this.hero["animator"].play("character_idle_left");
            this.hero["particle"].stop();
        }
        if (keys.includes(" ") && !this.jump) {
            this.jump = true;
            this.hero["force"].apply(new Vector2(0,-5));
        }
        else if (!keys.includes(" ") && this.hero["force"].stopped){
            this.jump = false;
        }
    }

    move() {
        this.moved = !this.moved;
        if (this.moved) {
            this.moveX.run(100,2000);
            this.marine["animator"].play("character_left");
        }
        else {
            this.moveX.run(400,2000);
            this.marine["animator"].play("character_right");
        }
    }

}

class Game extends JSPixelApp {
    constructor() {
        super("game", resourceList);
        if (Game.instance)
            return Game.instance;
        else
            Game.instance = this;
    }

    initialize() {
        let scene = new LandingScene(this)
        scene.load();
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

// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;