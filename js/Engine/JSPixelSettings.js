let JSPixelSettings = class JSPixelSettings {
    constructor() {
        this._resX = 1600;
        this._resY = 900;
    }

    get resX() {return this._resX;}
    get resY() {return this._resY;}

    set resX(resX){this._resX = resX}
    set resY(resY){this._resY = resY}
};

export {JSPixelSettings};