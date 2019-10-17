export default class Sound {
    /**
     * @desc the Sound class is a wrapper for the native Audio class
     * @param {string} src the source of our sound
     * @param {string} name the identifier of our sound
     * @param {function} callback the callback after the sound has been loaded
     */
    constructor(src, name, callback) {
        this._sound = new Audio(src);
        this._name = name;
        callback();
    }

    /**
     * @desc plays the sound
     */
    play() {
        this._sound.play();
    }

    /**
     * @desc stops the sound
     */
    pause() {
        this._sound.pause();
    }

    get sound(){return this._sound;}
    get name(){return this._name;}

    get volume() {return this._sound.volume;}
    set volume(value) {this._sound.volume = value;};

    get speed() {return this._sound.playbackRate;}
    set speed(rate){this._sound.playbackRate = rate;}

    //TODO rework sound system to introduce audio filtering and pitch shifting
};

export {Sound};