import {GameObjectManager} from "./GameObjectManager";

let CollisionManager = class CollisionManager {
    constructor() {
        if (CollisionManager.instance)
            return CollisionManager.instance;
        else
            CollisionManager.instance = this;
    }

    checkCollision() {
        let list = GameObjectManager.instance.colliders();
        for (let g1 = 0; g1 < list.length; g1++) {
            for (let g2 = 1; g2 < list.length; g2++) {
                if (g1 !== g2) {
                    let c1 = list[g1].property("collider");
                    let c2 = list[g2].property("collider");
                    if (c1.collide(c2)) {
                        console.log(list[g1].constructor.name + " collides with " + list[g2].constructor.name);
                    }
                }
            }
        }
    }
};

export {CollisionManager};