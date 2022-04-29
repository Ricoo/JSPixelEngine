import JSPixelCanvas from "../../engine/JSPixelCanvas.js";

export default class ImageFactory {
    constructor() {
        //Singleton
        if (ImageFactory.instance !== undefined) {
            return ImageFactory.instance;
        }
        ImageFactory.instance = this;

        [this._canvas] = JSPixelCanvas.canvasFactory();

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

    /**
     * @desc cuts a sprite in a rectangle between two points and returns the result
     * @param {Text} text the text property to render
     * @param {any} style the ending point of our cut
     * @returns {HTMLImageElement}
     */
    static renderText({text, dimensions, font, size, color, type}) {
        const context = ImageFactory.instance.canvas.getContext("2d");
        const canvas = ImageFactory.instance.canvas;
        let renderedText = new Image();

        context.save()
        canvas.width = dimensions.x
        canvas.height = dimensions.y
        
        context.font = size + "px " + font;
        context.textAlign = "left";
        context.textBaseline = "top"
        context.fillStyle = color;
        if (Array.isArray(text)) {
            console.log(dimensions.y / text.length)
            text.forEach((line, index) => context[type](line, 0, (dimensions.y / text.length) * (index)))
        }
        else {
            context[type](text, 0, 0);
        }
        context.restore()
        
        renderedText.src = canvas.toDataURL("image/png");
        return renderedText
    }

    /**
     * @desc cuts a sprite in a rectangle between two points and returns the result
     * @param {HTMLImageElement} image the image we want to cut
     * @param {Vector2} start the starting point of our cut
     * @param {Vector2} end the ending point of our cut
     * @returns {HTMLImageElement}
     */
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