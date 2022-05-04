import Scene from "../../../js/engine/Scene.js";
import Layout from "../gameObjects/Layout.js";
import SceneAnimation from "./SceneAnimation.js";
import SceneCollider from "./SceneCollider.js";
import SceneForce from "./SceneForce.js";
import SceneGraphic from "./SceneGraphic.js";
import SceneParticles from "./SceneParticles.js";
import SceneText from "./SceneText.js";

export default class SceneMain extends Scene {
    init() {
        const scenes = [
            this,
            new SceneGraphic(),
            new SceneAnimation(),
            new SceneParticles(),
            new SceneText(),
            new SceneForce(),
            new SceneCollider(),
        ];
        new Layout(0, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
    }

    update() {

    }
}