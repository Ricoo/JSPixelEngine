export default class Animation {
    /**
     * @desc an animation, using frames on a SpriteAtlas
     * @param {string} name the name of our animation
     * @param {number[]} frames the selected frames for our animation
     * @param {number} delay the delay between each frame
     * @param {number} end the last frame of our animation
     */
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