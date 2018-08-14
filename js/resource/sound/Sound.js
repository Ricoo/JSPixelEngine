let Sound = class Sound {
    constructor(src, name) {
        this._sound = new Audio(src);
        this._name = name;
    }

    play() {
        this._sound.play();
    }

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