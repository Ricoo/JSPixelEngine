let Animation = class Animation {
    constructor(name, frames, delay) {
        this._name = name;
        this._frames = frames;
        this._delay = delay;
    }

    get name(){return this._name;}
    get frames() {return this._frames;}
    get delay() {return this._delay;}
    get size(){return this._frames.length;}
};

export {Animation};