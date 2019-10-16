export default class Sprite {
    constructor(src,name,size,callback) {
        this._image = new Image();
        this._image.onload = callback;
        this._image.src = src;
        this._name= name;
        this._width = size[0];
        this._height = size[1];
    }

    tile(id) {return this._image;}

    get width(){return this._width;}
    get height(){return this._height;}
    get name(){return this._name;}
    get src(){return this._image.src;}
    get image(){return this._image;}
};

export {Sprite}