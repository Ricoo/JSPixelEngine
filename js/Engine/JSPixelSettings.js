let JSPixelSettings = class JSPixelSettings {
    constructor() {
        this._resX = window.innerWidth / 2;
        this._resY = window.innerHeight / 2;
    }

    get resX() {return this._resX;}
    get resY() {return this._resY;}

    set resX(resX){this._resX = resX}
    set resY(resY){this._resY = resY}
};

export {JSPixelSettings};