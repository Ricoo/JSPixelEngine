import Enum from "./Enum.js";

const Trigger = new Enum({
    CLICK : {click:true, hover:false, collide:false},
    HOVER : {click:false, hover:true, collide:false},
    MOUSE : {click:true, hover:true, collide:false},
    COLLIDER : {click:false, hover:false,collide:true},
    ALL : {click:true, hover:true, collide:true}
});

export {Trigger};