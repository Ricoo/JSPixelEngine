import GameObject from "../../../js/engine/GameObject.js";
import Vector2 from "../../../js/engine/math/Vector2.js";
import Animator from "../../../js/engine/properties/Animator.js";
import Collider from "../../../js/engine/properties/Collider.js";
import Force from "../../../js/engine/properties/Force.js";
import Graphic from "../../../js/engine/properties/Graphic.js";
import Particle from "../../../js/engine/properties/Particle.js";
import { DefaultValues } from "../../../js/enum/DefaultValues.js";
import { Layer } from "../../../js/enum/Layer.js";
import { ParticleType } from "../../../js/enum/ParticleType.js";
import { Trigger } from "../../../js/enum/Trigger.js";
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

        const go1 = new GameObject("object1", 260, 600);
        go1.attach(new Graphic("tickbox", 3))
        go1.attach(new Collider(new Vector2(40, 40), undefined, ()=>{}, Trigger.COLLIDE))
        go1.collider.rigid = true
        go1.attach(new Force(0, 20, true))

        // const go2 = new GameObject("object2", 580, 600);
        const go2 = new GameObject("object2", 400, 680);
        go2.attach(new Graphic("tickbox", 3))
        go2.attach(new Collider(new Vector2(40, 40), undefined, ()=>{}, Trigger.COLLIDE))
        go2.collider.rigid = true
        go2.attach(new Force(0, 10, true))

        go1.force.apply(new Vector2(2, 0));
        // go2.force.apply(new Vector2(-2, 0));
        go2.force.apply(new Vector2(-2, -2));

        const xs = [60, 260, 260, 460]
        const ys = [600, 400, 800, 600]
        const borders = Array.from({length: 4}, (_, i) => {
            return new GameObject("border" + i, xs[i], ys[i])
        })
        borders.forEach(border => {
            border.attach(new Collider(new Vector2(
                (border.x === 260 ? 390 : 10),
                (border.y === 600 ? 390 : 10),
            ), undefined, ()=>{}, Trigger.COLLIDE, true))
        })
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