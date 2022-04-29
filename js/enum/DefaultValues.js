import Enum from "./Enum.js";
import { TextAlign } from "./TextAlign.js";
import { TextType } from "./TextType.js";

const DefaultValues = new Enum({
    EMPTY_IMAGE : {
        src:"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        name:"EMPTY_IMAGE",res:[1,1]
    },
    DEFAULT_STYLE: {
        name:"DEFAULT_STYLE",
        font: "Arial",
        size: 20,
        color: "#000000",
        type: TextType.fill,
        align: TextAlign.start,
    }
});

export {DefaultValues};