let Animation = class Animation {
    constructor(name, frames) {
        this._name = name;
        this._frames = frames;
    }

    frame(id) {return this._frames[id];}
    get name(){return this._name;}
};

export {Animation};