import Enum from "./Enum.js";

const Layer = new Enum({
    BACKGROUND:0,
    ANIMATION:1,
    CHARACTERS:2,
    PARTICLE:3,
    GUI:4,
    GUI2:5,
    GUI3:6,
    ABOVEGUI:7,
    POPUP:8,
    ABOVEPOPUP:9
});

export {Layer};