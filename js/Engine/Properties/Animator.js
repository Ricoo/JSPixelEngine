import {Properties} from "./Properties";
import {SpriteAtlas} from "../../Resource/Sprite/SpriteAtlas";

let Animator = class Animator extends Properties {
    constructor() {
        super();
        this.name = "animator";
        this._animations = [];
        this._running = null;
        this._current = "";
    }

    attachTo(gameObject) {
        super.attachTo(gameObject);
        if (!this._gameObject.hasProperty("graphic")) {
            console.error("Cannot animate gameObject without graphic");
        }
        this._element = this._gameObject.property("graphic").sprite;
        if (!this._element instanceof SpriteAtlas) {
            console.error("Cannot animate static graphic element");
        }
    }

    play(name) {
        if (this._current === name) return;
        let animation = this._animations.find((anim) => {return anim.name === name});
        if (animation === undefined) {
            console.error("Couldn't play " + name + ": animation doesn't exist")
        }
        this.stop();
        this._running = setInterval(() => {this._animate(animation)},animation.delay);
        this._current = name;
    }

    add(animation) {
        this._animations.push(animation);
    }

    stop() {
        if (this._running !== null) {
            clearInterval(this._running);
            this._running = null;
            this._current = "";
        }
    }

    _animate(animation) {
        this._element.tileId = animation.frames[animation.current];
        animation.next();
    }
};

export {Animator};