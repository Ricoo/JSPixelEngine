import {GameObject} from "../GameObject";

let GUIObject = class GUIObject extends GameObject {
    constructor(name = "guiElement", x = 0, y = 0) {
        super(name, x, y);
    }

    toggle() {
        if (this.hasProperty("graphic")) {
            this.property("graphic").toggle();
        }
        if (this.hasProperty("text")) {
            this.property("text").toggle();
        }
    }
};

export {GUIObject};