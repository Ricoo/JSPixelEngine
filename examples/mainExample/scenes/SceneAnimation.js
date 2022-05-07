import Scene from "../../../js/engine/Scene.js";
import SceneMain from "./SceneMain.js";
import SceneCollider from "./SceneCollider.js";
import SceneForce from "./SceneForce.js";
import SceneGraphic from "./SceneGraphic.js";
import SceneParticles from "./SceneParticles.js";
import SceneText from "./SceneText.js";
import Layout from "../gameObjects/Layout.js";

export default class SceneAnimation extends Scene {
    init() {
        const scenes = [
            new SceneMain(),
            new SceneGraphic(),
            this,
            new SceneParticles(),
            new SceneText(),
            new SceneForce(),
            new SceneCollider(),
        ];
        new Layout(2, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
    }

    update() {

    }
}