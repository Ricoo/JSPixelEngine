import GameObject from "../../../js/engine/GameObject.js"
import Graphic from "../../../js/engine/properties/Graphic.js"
import Text from "../../../js/engine/properties/Text.js"
import { Layer } from "../../../js/enum/Layer.js"
import ResourceManager from "../../../js/resource/ResourceManager.js"

class Tab extends GameObject {
    constructor(active, x, y, label) {
        super("tab " + label, x, y, active ? Layer.ANIMATION : Layer.BACKGROUND)
        this.attach(new Text(label, ResourceManager.getStyle("centeredText")));
        this.attach(new Graphic(
            ResourceManager.getPath("roundRectangle")
                .get(100, 50, 4,
                    active ? "white" : "black",
                    `rgba(221,${active ? 200 : 180},125,1)`
                ))
        );
    }
}

export default class Layout extends GameObject {
    constructor(activeTab, tabLabels) {
        const [x, y] = [1600, 1000];
        super("layout", x / 2, 50 + y / 2, Layer.ANIMATION)
        this.attach(new Graphic(
            ResourceManager.getPath("roundRectangle")
                .get(x, y, 4, "black", `rgba(221,180,125,1)`)))
        tabLabels.forEach((label, index) => {
            new Tab(activeTab === index, 50+ 80*index, 50, label)
        });
    }
}