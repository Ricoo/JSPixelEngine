import {JSPixelApp} from "../js/Engine/JSPixelApp";
import {ResourceManager} from "../js/Resource/ResourceManager";
import {GraphicsManager} from "../js/Engine/GraphicsManager";
import {Drawable} from "../js/Engine/Drawable";
import {Layer} from "../js/Enum/Layer";
import {KeyCode} from "../js/Enum/KeyCode";

const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/wand.png",name:"wood_wand",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu",res:[64,64]}
    ]
};

let Game = class Game extends JSPixelApp {
    constructor() {
        super("game");
    }

    initialize() {
        this.getEngine().preStart(resourceList);
        let clickSound = ResourceManager.sounds.findByName("click");
        let wand = new Drawable("wood_wand","wand", Layer.GUI, 0, 0, 10);
        GraphicsManager.register(wand);

  //      window.onclick = () => {clickSound.play();};
 /*       window.onkeydown = (ev) => {
            switch (ev.keyCode) {
                case KeyCode.arrowUp:
                    wand.y-=5;
                    break;
                case KeyCode.arrowDown:
                    wand.y+=5;
                    break;
                case KeyCode.arrowRight:
                    wand.x+=5;
                    break;
                case KeyCode.arrowLeft:
                    wand.x-=5;
                    break;
            }
        };*/
        console.log("game initialized");
    }

    frame() {

    }
};

function init(){
    let game = new Game();
}

window.onload = init;