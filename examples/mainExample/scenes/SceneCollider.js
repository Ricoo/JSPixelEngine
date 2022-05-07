import Scene from "../../../js/engine/Scene.js";
import SceneMain from "./SceneMain.js";
import SceneAnimation from "./SceneAnimation.js";
import SceneForce from "./SceneForce.js";
import SceneGraphic from "./SceneGraphic.js";
import SceneParticles from "./SceneParticles.js";
import SceneText from "./SceneText.js";
import Layout from "../gameObjects/Layout.js";

export default class SceneCollider extends Scene {
    init() {
        const scenes = [
            new SceneMain(),
            new SceneGraphic(),
            new SceneAnimation(),
            new SceneParticles(),
            new SceneText(),
            new SceneForce(),
            this,
        ];
        new Layout(6, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
    }

    update() {

    }
}