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
};

export {ImageFactory};