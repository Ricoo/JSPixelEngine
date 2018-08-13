import {JSPixelApp} from "../js/Engine/JSPixelApp";
import {GameObject} from "../js/Engine/GameObject";
import {Graphic} from "../js/Engine/Properties/Graphic";
import {ResourceManager} from "../js/Resource/ResourceManager";
import {KeyCode} from "../js/Enum/KeyCode";
import {Layer} from "../js/Enum/Layer";
import {EventManager} from "../js/Engine/EventManager";

let resourcePack = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click"}
    ],
    sprites:[
        {src:"./resource/texture/snake_head.png",name:"head",res:[1,1]},
        {src:"./resource/texture/snake_body.png",name:"body",res:[1,1]},
        {src:"./resource/texture/snake_apple.png",name:"apple",res:[1,1]}
    ]
};

let Direction = {
    UP:-1,
    DOWN:1,
    LEFT:-2,
    RIGHT:2
};

class Apple extends GameObject {
    constructor() {
        super();
        this.attach(new Graphic("apple", Layer.CHARACTERS, 20));
    }

    randomize(snake) {
        this.position.x = Math.floor((Math.random() * 10) + 1) * 20;
        this.position.y = Math.floor((Math.random() * 10) + 1) * 20;
        if (this.position.x === snake.position.x &&
            this.position.y === snake.position.y) {
            this.randomize(snake);
        }
        for (let i of snake.body) {
            if (this.position.x === i.position.x &&
                this.position.y === i.position.y) {
                this.randomize(snake);
            }
        }
    }
}

class Head extends GameObject {
    constructor() {
        super("head");
        this._direction = Direction.DOWN;
        this.attach(new Graphic("head", Layer.CHARACTERS, 20));
        this._body = [];
        for (let i = 0; i < 4; i++) {
            this._body.push(new Body(this.position));
            this._running = true;
            this.move();
        }
        this._running = true;
    }

    move() {
        if (!this._running)
            return ;
        let last = this._body[this._body.length - 1];
        last.position = this.position;
        this._body.splice(this._body.length - 1, 1);
        this._body.unshift(last);

        switch (this._direction) {
            case Direction.RIGHT:
                this.position.x += 20;
                break;
            case Direction.LEFT:
                this.position.x -= 20;
                break;
            case Direction.UP:
                this.position.y -= 20;
                break;
            case Direction.DOWN:
                this.position.y += 20;
                break;
        }

        for (let part of this._body) {
            if (part.position.x === this.position.x &&
                part.position.y === this.position.y ) {
                this._running = false;
                alert("You lose !");
            }
        }
    }

    setDirection (direction) {
        if (this._direction + direction !== 0)
            this._direction = direction;
    }

    eat() {
        let tail = new Body();
        this._body.push(tail);
        tail.position = this._body[this._body.length - 2].position;
        ResourceManager.getSound("click").play();
    }

    get body() {return this._body;}
}

class Body extends GameObject {
    constructor() {
        super();
        this.attach(new Graphic("body", Layer.CHARACTERS, 20));
    }
}

class Game extends JSPixelApp {
    constructor() {
        super("game", resourcePack);
    }

    initialize() {
        this._frame = 0;
        this._delay = 30;
        this._score = 0;
        this._snake = new Head();
        this._apple = new Apple();
        this._apple.randomize(this._snake);
    }

    frame () {
        this._frame++;
        if (this._frame >= this._delay) {
            this._snake.move();
            this._frame = 0;
            if (this._apple.position.x === this._snake.position.x &&
                this._apple.position.y === this._snake.position.y) {
                this._apple.randomize(this._snake);
                this._snake.eat();
                this._score++;
                if (this._delay > 10)
                    this._delay -= 1;
            }
        }

        let keys = EventManager.keys;

        if (keys.includes(KeyCode.arrowRight)) {
            this._snake.setDirection(Direction.RIGHT);
        }
        else if (keys.includes(KeyCode.arrowLeft)) {
            this._snake.setDirection(Direction.LEFT);
        }
        else if (keys.includes(KeyCode.arrowUp)) {
            this._snake.setDirection(Direction.UP);
        }
        else if (keys.includes(KeyCode.arrowDown)) {
            this._snake.setDirection(Direction.DOWN);
        }
    }
}

// Simply create a new instance of your inherited JSPixelApp class
function init(){
    new Game();
}

// Ensures all the page content have been loaded, you shouldn't run any code before that
window.onload = init;