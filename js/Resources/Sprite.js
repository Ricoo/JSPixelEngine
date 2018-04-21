let Sprite = class Sprite {
    constructor(context,src,name,size,callback) {
        this._context = context;
        this._image = new Image();
        this._image.onload = callback;
        this._image.src = src;
        this._name= name;
        this._res = [];
        this._res.x = size[0];
        this._res.y = size[1];
    }

    draw(posX, posY, size = 1) {
        this._context.drawImage(this._image, 0,0,
            this._res.x,this._res.y,
            posX,posY,
            size*this._res.x,size*this._res.y);
    }

    drawPart(posX,posY, cutX,cutY, part, size = 1) {
        this._context.drawImage(this._image);
    }

    get name(){return this._name;}
};

export {Sprite}