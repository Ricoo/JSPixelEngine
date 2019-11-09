import Property from "./Property";
import SpriteAtlas from "../../resource/sprite/SpriteAtlas";

export default class Animator extends Property {
    animations;
    /**
     * @desc an animator, managing any animation the GameObject needs
     * @param {Animation[]} list the array of animations affected to our GameObject
     */
    constructor(list=undefined) {
        super();
        this._PROPERTY_NAME = "animator";
        this._animations = (list ? list : []);
        this._running = null;
        this._playing = null;
        this._loop = false;
        this._current = 0;
    }

    attachTo(gameObject) {
        super.attachTo(gameObject);
        if (!this._gameObject.hasProperty("graphic")) {
            throw TypeError("Cannot animate gameObject without graphic");
        }
        this._element = this._gameObject["graphic"].sprite;
        if (!this._element instanceof SpriteAtlas) {
            throw TypeError("Cannot animate static graphic element");
        }
    }

    /**
     * @desc runs the given animation
     * @param {string} name the name of the animation we want to run
     * @param {boolean} loop whether we want our animation to loop or not
     */
    play(name, loop = true) {
        this._loop = loop;
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

    /**
     * @desc adds an Animation to our current set
     * @param {Animation} animation the animation we want to add
     */
    add(animation) {
        this._animations.push(animation);
    }

    /**
     * @desc stops the animation and sets the frame to the end frame
     */
    stop() {
        if (this._running !== null) {
            if (this._playing !== null) {
                this._current = 0;
                this._gameObject["graphic"].image = this._element[this._playing.end];
                this._gameObject["graphic"].tile = this._playing.end;
            }
            clearInterval(this._running);
            this._running = null;
            this._playing = null;
            this._current = 0;
        }
    }

    _animate(animation) {
        this._gameObject["graphic"].image = this._element[this._playing.frames[this._current]];
        this._gameObject["graphic"].tile = this._playing.frames[this._current];
        this._current++;
        if (this._current === animation.size) {
            this._current = 0;
            if (this._loop === false) {
                this.stop();
            }
        }
    }

    delete() {
        clearInterval(this._running);
        super.delete();
    }
};
