import {Property} from "./Property";
import {SpriteAtlas} from "../../resource/sprite/SpriteAtlas";

let Animator = class Animator extends Property {
    constructor() {
        super();
        this.name = "animator";
        this._animations = [];
        this._running = null;
        this._playing = null;
        this._current = 0;
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
        if (this._playing !== null && this._playing.name === name) return;
        let animation = this._animations.find((anim) => {return anim.name === name});
        if (animation === undefined) {
            console.error("Couldn't play " + name + ": animation doesn't exist")
        }
        this.stop();
        this._playing = animation;
        this._animate(animation);
        this._running = setInterval(() => {this._animate(animation)},animation.delay);
    }

    add(animation) {
        this._animations.push(animation);
    }

    stop() {
        if (this._running !== null) {
            if (this._playing !== null) {
                this._current = 0;
                this._gameObject.property("graphic").image = this._element[this._playing.frames[this._current]];
                this._gameObject.property("graphic").tile = this._playing.frames[this._current];
            }
            clearInterval(this._running);
            this._running = null;
            this._playing = null;
            this._current = 0;
        }
    }

    _animate(animation) {
        this._gameObject.property("graphic").image = this._element[this._playing.frames[this._current]];
        this._gameObject.property("graphic").tile = this._playing.frames[this._current];
        this._current = (this._current === animation.size - 1 ? 0 : this._current + 1);
    }
};

export {Animator};