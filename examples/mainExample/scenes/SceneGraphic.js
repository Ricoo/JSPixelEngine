import Scene from "../../../js/engine/Scene.js";
import SceneMain from "./SceneMain.js";
import SceneAnimation from "./SceneAnimation.js";
import SceneCollider from "./SceneCollider.js";
import SceneForce from "./SceneForce.js";
import SceneParticles from "./SceneParticles.js";
import SceneText from "./SceneText.js";
import Layout from "../gameObjects/Layout.js";

export default class SceneGraphic extends Scene {
    init() {
        const scenes = [
            new SceneMain(),
            this,
            new SceneAnimation(),
            new SceneParticles(),
            new SceneText(),
            new SceneForce(),
            new SceneCollider(),
        ];
        new Layout(1, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
    }

    update() {

    }
}