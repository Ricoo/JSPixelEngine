export default class Animation {
    constructor(name, frames, delay, end) {
        this._name = name;
        this._frames = frames;
        this._delay = delay;
        this._end = end;
    }

    get end(){return this._end;}
    get name(){return this._name;}
    get frames() {return this._frames;}
    get delay() {return this._delay;}
    get size(){return this._frames.length;}
};

export {Animation};