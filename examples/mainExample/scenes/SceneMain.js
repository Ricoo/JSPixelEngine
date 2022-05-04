import Scene from "../../../js/engine/Scene.js";
import Layout from "../gameObjects/Layout.js";

export default class SceneMain extends Scene {
    init() {
        new Layout(0, ["Main", "Graphic", "Animation", "Particles", "Text", "Force"])
    }

    update() {

    }
}