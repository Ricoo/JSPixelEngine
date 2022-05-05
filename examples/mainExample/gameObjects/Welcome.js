import GameObject from "../../../js/engine/GameObject.js";
import Vector2 from "../../../js/engine/math/Vector2.js";
import Graphic from "../../../js/engine/properties/Graphic.js";
import Particle from "../../../js/engine/properties/Particle.js";
import { DefaultValues } from "../../../js/enum/DefaultValues.js";
import { Layer } from "../../../js/enum/Layer.js";
import { ParticleType } from "../../../js/enum/ParticleType.js";
import ResourceManager from "../../../js/resource/ResourceManager.js";
import Sprite from "../../../js/resource/sprite/Sprite.js";

export default class Welcome extends GameObject {
    constructor(x, y) {
        super("logo", x, y, Layer.GUI);

        if (!ResourceManager.getSprite("LOGO_JSPENGINE")) {
            let logo = DefaultValues.LOGO_JSPENGINE;
            ResourceManager.addSprite(new Sprite(logo.src, logo.name, logo.res, () => {}));
        }
        this.attach(new Graphic(DefaultValues.LOGO_JSPENGINE.name));
        this.attach(new Particle("particle", ParticleType.Fall, 1, 500, 30, true, [2,3], [0,1,2,3], new Vector2(10,20), new Vector2(0,60)));
        this.particle.run();
    }
}