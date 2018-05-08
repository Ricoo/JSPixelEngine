let Animation = class Animation {
    constructor(name, frames, delay) {
        this._name = name;
        this._frames = frames;
        this._delay = delay;
        this._current = 0;
    }

    get name(){return this._name;}
    get frames() {return this._frames;}
    get delay() {return this._delay;}
    get current() {return this._current;}

    next() {
        this._current++;
        if (this._current >= this._frames.length) {
            this._current = 0;
        }
        return this._frames[this._current];
    }
};

export {Animation};