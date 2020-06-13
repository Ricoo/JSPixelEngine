export default class JSPixelSettings {
    constructor() {
        this._resX = window.innerWidth;
        this._resY = window.innerHeight;
        this._resize = true;
    }

    get resX() {return this._resX;}
    get resY() {return this._resY;}

    set resX(resX){this._resX = resX}
    set resY(resY){this._resY = resY}

    set resize(val){this._resize = val}
    get resize(){return this._resize}
};
