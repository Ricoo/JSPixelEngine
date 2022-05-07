import Scene from "../../../js/engine/Scene.js";
import SceneMain from "./SceneMain.js";
import SceneAnimation from "./SceneAnimation.js";
import SceneCollider from "./SceneCollider.js";
import SceneGraphic from "./SceneGraphic.js";
import SceneParticles from "./SceneParticles.js";
import SceneText from "./SceneText.js";
import Layout from "../gameObjects/Layout.js";

export default class SceneForce extends Scene {
    init() {
        const scenes = [
            new SceneMain(),
            new SceneGraphic(),
            new SceneAnimation(),
            new SceneParticles(),
            new SceneText(),
            this,
            new SceneCollider(),
        ];
        new Layout(5, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
    }

    update() {

    }
}