import Scene from "../../../js/engine/Scene.js";
import SceneMain from "./SceneMain.js";
import SceneAnimation from "./SceneAnimation.js";
import SceneCollider from "./SceneCollider.js";
import SceneForce from "./SceneForce.js";
import SceneGraphic from "./SceneGraphic.js";
import SceneParticles from "./SceneParticles.js";
import Layout from "../gameObjects/Layout.js";

export default class SceneText extends Scene {
    init() {
        const scenes = [
            new SceneMain(),
            new SceneGraphic(),
            new SceneAnimation(),
            new SceneParticles(),
            this,
            new SceneForce(),
            new SceneCollider(),
        ];
        new Layout(4, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
    }

    update() {

    }
}