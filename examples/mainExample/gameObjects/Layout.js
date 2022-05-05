import GameObject from "../../../js/engine/GameObject.js"
import Vector2 from "../../../js/engine/math/Vector2.js"
import Collider from "../../../js/engine/properties/Collider.js"
import Graphic from "../../../js/engine/properties/Graphic.js"
import Text from "../../../js/engine/properties/Text.js"
import { Layer } from "../../../js/enum/Layer.js"
import { Trigger } from "../../../js/enum/Trigger.js"
import ResourceManager from "../../../js/resource/ResourceManager.js"

class Tab extends GameObject {
    constructor(active, x, y, label, callback) {
        super("tab " + label, x, y, active ? Layer.ANIMATION : Layer.BACKGROUND)
        this.attach(new Text(label, ResourceManager.getStyle("centeredText")));
        this.attach(new Graphic(
            ResourceManager.getPath("roundRectangle")
                .get(100, 50, 4,
                    active ? "white" : "black",
                    `rgba(221,${active ? 200 : 180},125,1)`
                ))
        );
        this.attach(new Collider(new Vector2(80, 50), undefined, (_, mouse) => {
            if (mouse.click) {
                callback()
            }
        }, Trigger.CLICK))
    }
}

export default class Layout extends GameObject {
    constructor(activeTab, tabLabels, callback) {
        const [x, y] = [window.innerWidth, window.innerHeight - 70];
        super("layout", x / 2, 70 + y / 2, Layer.ANIMATION)
        this.attach(new Graphic(
            ResourceManager.getPath("square")
                .get(x, y, 4, "black", `rgba(221,180,125,1)`)))
        tabLabels.forEach((label, index) => {
            new Tab(activeTab === index, 50+ 80*index, 50, label, () => {
                callback(index);
            })
        });
    }
}