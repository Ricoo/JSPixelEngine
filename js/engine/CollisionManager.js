import {GameObjectManager} from "./GameObjectManager";

let CollisionManager = class CollisionManager {
    constructor() {
        if (CollisionManager.instance)
            return CollisionManager.instance;
        else
            CollisionManager.instance = this;
        this._groups = [];
    }

    checkCollision() {
        let list = GameObjectManager.instance.colliders();
        for (let g = 0; g < this._groups.length; g++) {
            for (let g1 = 0; g1 < list.length; g1++) {
                if(list[g1].constructor.name === this._groups[g][0]) {
                    for (let g2 = 1; g2 < list.length; g2++) {
                        if (g1 !== g2 && list[g2].constructor.name === this._groups[g][1]) {
                            let c1 = list[g1].property("collider");
                            let c2 = list[g2].property("collider");
                            if (c1 && c2 && c1.collide(c2)) {
                                console.log(list[g1].constructor.name + " collides with " + list[g2].constructor.name);
                            }
                        }
                    }
                }
            }
        }
    }

    addGroup(group) {
        this._groups.push(group);
        console.log(this._groups);
    }
};

export {CollisionManager};