import JSPixelApp from "../js/engine/JSPixelApp.js";
import ResourceManager from "../js/resource/ResourceManager.js";
import EventManager from "../js/engine/manager/EventManager.js";
import GameObject from "../js/engine/GameObject.js";
import GUIText from "../js/engine/gui/GUIText.js";
import Graphic from "../js/engine/properties/Graphic.js";
import Animator from "../js/engine/properties/Animator.js";
import Animation from "../js/resource/sprite/Animation.js";
import Collider from "../js/engine/properties/Collider.js";
import CollisionManager from "../js/engine/manager/CollisionManager.js";
import Vector2 from "../js/engine/math/Vector2.js";
import {Layer} from "../js/enum/Layer.js";
import {Event} from "../js/enum/Event.js";
import {TextAlign} from "../js/enum/TextAlign.js";
import {Trigger} from "../js/enum/Trigger.js";
import Scene from "../js/engine/Scene.js";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/Basicship.png",name:"ship",res:[318,64],atlas:[5,1]},
        {src:"./resource/texture/button.png",name:"button",res:[64,64],atlas:[1,2]}
    ]
};

const animationList = {
    full_forward : new Animation("walk_forward",  [0, 1, 2, 3, 4, 5, 6, 7 ], 100, 0),
    full_left : new Animation("walk_left",     [8, 9, 10,11,12,13,14,15], 100, 8),
    full_right : new Animation("walk_right",    [16,17,18,19,20,21,22,23], 100, 16),
    full_backward : new Animation("walk_backward", [24,25,26,27,28,29,30,31], 100, 24),
    missile_fire : new Animation("missile_fire", [1,2,3,4],100, 4)
};

class Ship extends GameObject {
    constructor(x,y) {
        super("ship",x,y, Layer.CHARACTERS);
        this.attach(new Graphic("ship", 2, 1));
        this.attach(new Collider(new Vector2(100,100), undefined, ()=>{}, Trigger.COLLIDER, true));
        this._fire = false;
    }

    fire() {
        if (this._fire)
            return;
        this._fire = true;
        new Missile(this.position.x + 30,this.position.y - 40);
        new Missile(this.position.x + 30,this.position.y + 40);
        setTimeout(() => {this._fire = false}, 300)
    }
}

class Enemy extends GameObject {
    constructor(x,y) {
        super("ship", x, y, Layer.CHARACTERS, 180);
        this.attach(new Graphic("ship",2,1));
        this.attach(new Collider(new Vector2(120,100), undefined, ()=>{
            this.generate();
        }, Trigger.COLLIDER, true));
        this._loop = setInterval(() => {this.move()}, 20);
    }

    move() {
        this.position.x -= 5;
        if (this.position.x < 100) {
            this.generate();
        }
    }

    generate() {
        new Enemy(1000, Math.floor((Math.random() * 800) + 1));
        clearInterval(this._loop);
        this.delete();
    }

    delete() {
        clearInterval(this._loop);
        super.delete();
    }
}

class Missile extends GameObject {
    constructor(x,y) {
        super("missile", x, y);
        this.attach(new Graphic("ship", Layer.ANIMATION, 1, 1, 1));
        this.attach(new Animator([animationList.missile_fire]));
        this.attach(new Collider(new Vector2(50,20), undefined, ()=>{
            MainScene.score += 1;
            MainScene.scoreText.txt = "Score : "+ MainScene.score;
            this.delete();
        }));
        this["animator"].play("missile_fire", false);
        this._i = setInterval(() => {this.update()}, 5);
    }

    update () {
        this.x += 5;
        if (this.x > 2000) {
            this.delete()
        }
    }

    delete() {
        clearInterval(this._i);
        super.delete();
    }
}


class MainScene extends Scene {
    init() {
        let clickSound = ResourceManager.getSound("click");
        clickSound.volume = 0.2;
        clickSound.speed = 1;

        this.ship = new Ship(100, 100);
        this.drag = false;

        EventManager.registerHandler(Event.MouseDown, () => {clickSound.play();});

        CollisionManager.instance.addGroup(["Enemy","Missile"]);

        console.log("my super game have been initialized !");
        new Enemy(1000, Math.floor((Math.random() * 500) + 1));

        MainScene.score = 0;
        MainScene.scoreText = new GUIText("score", "Score : " + MainScene.score, 70, 35);
        MainScene.scoreText["text"].align = TextAlign.center;        
    }

    update(deltaTime) {
        let keys = EventManager.keys;
        let mouse = EventManager.mouse;

        if (keys.includes("ArrowUp")) {
            this.ship.y -= 500 * deltaTime / 1000;
        }
        else if (keys.includes("ArrowDown")) {
            this.ship.y += 500 * deltaTime / 1000;
        }
        if (keys.includes(" ")) {
            this.ship.fire();
        }
        if (keys.includes("4")) {
            CollisionManager.instance.addGroup(["Enemy","Missile"]);
        }
        if (keys.includes("5")) {
            CollisionManager.instance.removeGroup(["Enemy","Missile"]);
        }
        if (keys.includes("3")) {
            console.log(Scene.current._gameObjects);
        }
        if (keys.includes("i")) {
            this.ship["collider"].rigid = false;
        }
        if (keys.includes("o")) {
            this.ship["collider"].rigid = true;
        }
        if (this.ship["collider"].raycast(mouse.x, mouse.y) && mouse.click) {
            this.drag = true;
            this.ship.fire();
        }
        if (!mouse.click) {
            this.drag = false;
        }
        if (this.drag) {
            this.ship.position.y = mouse.y;
        }
    }
}
class Game extends JSPixelApp {
    constructor() {
        super("game", resourceList);
    }

    initialize() {
        new MainScene(this).load()
    }

    frame() {
        const keys = EventManager.keys

        if (keys.includes("1")) {
            this._debug.colliders = false;
        }
        if (keys.includes("2")) {
            this._debug.colliders = true;
        }
    }
}

// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;