let ImageFactory = class ImageFactory {
    constructor() {
        //Singleton
        if (ImageFactory.instance !== undefined) {
            return ImageFactory.instance;
        }
        ImageFactory.instance = this;

        this._canvas = document.createElement("canvas");

    }

    get canvas(){return this._canvas; }

    static merge(...images) {
        //TODO use previous version filter system to merge images
        for (let img of images) {

        }
    }

    static addText(image, text) {
        //TODO use previous version filter system to add text

    }

    static cut(image, start, end) {
        if (!ImageFactory.instance) {
            new ImageFactory();
        }
        let context = ImageFactory.instance.canvas.getContext("2d");
        let canvas = ImageFactory.instance.canvas;
        let sprite = new Image();

        canvas.width = end.x - start.x;
        canvas.height = end.y - start.y;

        context.drawImage(image, start.x,start.y,
            canvas.width,canvas.height,
            0,0,
            canvas.width,canvas.height);

        sprite.src = canvas.toDataURL("image/png");
        return sprite;
    }
};

export {ImageFactory};