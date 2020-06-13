import Enum from "./Enum.js";

const Event = new Enum({
    MouseDown : "mousedown",
    MouseUp : "mouseup",
    MouseMove : "mousemove",
    KeyDown : "keydown",
    KeyUp : "keyup"
});

export {Event};