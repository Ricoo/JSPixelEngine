import JSPixelCanvas from "../../engine/JSPixelCanvas.js";

export default class ImageFactory {
    constructor() {
        //Singleton
        if (ImageFactory.instance !== undefined) {
            return ImageFactory.instance;
        }
        ImageFactory.instance = this;

        [this._canvas, this._context] = JSPixelCanvas.canvasFactory();

    }

    get canvas(){return this._canvas;}
    get context(){return this._context;}

    static merge(...images) {
        //TODO use previous version filter system to merge images
        for (let img of images) {

        }
    }

    static addText(image, text) {
        //TODO use previous version filter system to add text

    }

    static buildPath(path, matrix, dimensions, lineWidth, strokeColor, fillColor) {
        const context = ImageFactory.instance.context;
        const canvas = ImageFactory.instance.canvas;
        const altPath = new Path2D();

        altPath.addPath(path, matrix);

        canvas.width = dimensions.x;
        canvas.height = dimensions.y;

        context.save();
        context.fillStyle = fillColor;
        context.strokeStyle = strokeColor;
        context.lineWidth = lineWidth;
        context.fill(altPath);
        context.stroke(altPath);
        context.restore();

        return canvas.toDataURL("image/png")
    }

    /**
     * @desc cuts a sprite in a rectangle between two points and returns the result
     * @param {Text} text the text property to render
     * @param {any} style the ending point of our cut
     * @returns {HTMLImageElement}
     */
    static renderText({text, dimensions, font, size, color, type}) {
        const context = ImageFactory.instance.context;
        const canvas = ImageFactory.instance.canvas;
        const renderedText = new Image();

        context.save()
        canvas.width = dimensions.x
        canvas.height = dimensions.y
        
        context.font = size + "px " + font;
        context.textAlign = "left";
        context.textBaseline = "top"
        context.fillStyle = color;
        if (Array.isArray(text)) {
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
        const context = ImageFactory.instance.context;
        const canvas = ImageFactory.instance.canvas;
        const sprite = new Image();

        canvas.width = end.x - start.x;
        canvas.height = end.y - start.y;

        context.drawImage(image, start.x,start.y,
            canvas.width,canvas.height,
            0,0,
            canvas.width,canvas.height);

        sprite.src = canvas.toDataURL("image/png");
        return sprite;
    }

    static renderDataGraph(dataName, frames) {
        if (!ImageFactory.instance) {
            new ImageFactory();
        }
        const context = ImageFactory.instance.context;
        const canvas = ImageFactory.instance.canvas;
        const highest = Math.max(...frames);
        const sprite = new Image();
        const height = 60

        canvas.width = 242;
        canvas.height = height + 20;

        context.beginPath();
        context.strokeStyle = "#ffffff";
        context.rect(0, 0, canvas.width, height);
        context.stroke();
        context.closePath();

        frames.forEach((amount, index) => {
            if (!highest) {
                return;
            }
            context.beginPath();
            const {width} = canvas;
            const x = width + 4 * (- frames.length + index) + 1;
            context.moveTo(x, height - 1);
            context.lineTo(x, height - (height  - 1) * (amount / highest));
            context.lineWidth = 4;
            context.strokeStyle = `rgb(
                ${(255 - (255 * amount / highest))},
                ${((255 * amount / highest))},
                0
                )`
            context.stroke();
            context.closePath();
        })

        context.font = "10px Arial";
        context.fillStyle = "#ffffff"
        context.textBaseline = "bottom"
        context.fillText(`${dataName}: ${frames[frames.length - 1]}(avg ${(frames.reduce((a, b) => a + b, 0) / frames.length).toFixed(2)})`,
            0, canvas.height
        )

        sprite.src = canvas.toDataURL("image/png");
        return sprite
    }
};

export {ImageFactory};