import Scene from "../../../js/engine/Scene.js";
import Layout from "../gameObjects/Layout.js";
import Welcome from "../gameObjects/Welcome.js";
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
            new SceneGraphic(this._app),
            new SceneAnimation(this._app),
            new SceneParticles(this._app),
            new SceneText(this._app),
            new SceneForce(this._app),
            new SceneCollider(this._app),
        ];
        new Layout(0, ["Main", "Graphic", "Animation", "Particles", "Text", "Force", "Collider"],
            index => scenes[index].load()
        )
        new Welcome(window.innerWidth / 2, 100);
    }

    update() {

    }
}