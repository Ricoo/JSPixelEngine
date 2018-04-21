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
};

export {Sound};