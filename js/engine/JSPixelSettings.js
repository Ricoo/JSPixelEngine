export default class JSPixelSettings {
    constructor() {
        this._resX = window.innerWidth;
        this._resY = window.innerHeight;
    }

    get resX() {return this._resX;}
    get resY() {return this._resY;}

    set resX(resX){this._resX = resX}
    set resY(resY){this._resY = resY}
};
