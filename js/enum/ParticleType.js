import Enum from "./Enum.js";

const ParticleType = new Enum({
    Fall : {type:"fall", angle: [90,90], speed:[10,100], gravity:true},
    Explode : {type:"explode", angle: [1,360], speed: [10,100], gravity:false},
    Trail : {type:"trail", angle: [0,0], speed:[0,0], gravity:false},
    Source : {type:"source", angle: [225,315],speed:[1,100], gravity:true}
});

export {ParticleType};