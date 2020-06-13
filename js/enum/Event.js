import Enum from "./Enum";

const Event = new Enum({
    MouseDown : "mousedown",
    MouseUp : "mouseup",
    MouseMove : "mousemove",
    KeyDown : "keydown",
    KeyUp : "keyup"
});

export {Event};