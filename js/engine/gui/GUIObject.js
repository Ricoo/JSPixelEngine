import {GameObject} from "../GameObject";

let GUIObject = class GUIObject extends GameObject{
    constructor(name = "guiElement", x = 0, y = 0) {
        super(name, x, y);
    }
};

export {GUIObject};