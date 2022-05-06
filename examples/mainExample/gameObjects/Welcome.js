import GameObject from "../../../js/engine/GameObject.js";
import Vector2 from "../../../js/engine/math/Vector2.js";
import Animator from "../../../js/engine/properties/Animator.js";
import Graphic from "../../../js/engine/properties/Graphic.js";
import Particle from "../../../js/engine/properties/Particle.js";
import { DefaultValues } from "../../../js/enum/DefaultValues.js";
import { Layer } from "../../../js/enum/Layer.js";
import { ParticleType } from "../../../js/enum/ParticleType.js";
import ResourceManager from "../../../js/resource/ResourceManager.js";
import Animation from "../../../js/resource/sprite/Animation.js";
import Sprite from "../../../js/resource/sprite/Sprite.js";

export default class Welcome extends GameObject {
    constructor(x, y) {
        super("logo", x, y, Layer.GUI);

        if (!ResourceManager.getSprite("LOGO_JSPENGINE")) {
            let logo = DefaultValues.LOGO_JSPENGINE;
            ResourceManager.addSprite(new Sprite(logo.src, logo.name, logo.res, () => {}));
        }
        this.attach(new Graphic(DefaultValues.LOGO_JSPENGINE.name, 2));

        // this.welcomeText = new GUI
        const flame = new Flame(x, y + 100);
    }

}

class Flame extends GameObject {
    constructor(x, y) {
        super("flame", x, y, Layer.PARTICLE);

        this.attach(new Graphic("flame", 8));
        this.attach(new Animator([new Animation("flame_burning", [0, 1, 2, 3], 100, 0)]));
        this.attach(new Particle("particle", ParticleType.Smoke, 2, 1500, 500, true, [3,7], [0,1,2,3], new Vector2(100,200), new Vector2(0,-60)));
        this.animator.play("flame_burning")
        this.particle.run();
    }
}