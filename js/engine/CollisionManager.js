import GameObjectManager from "./GameObjectManager";

export default class CollisionManager {
    constructor() {
        if (CollisionManager.instance)
            return CollisionManager.instance;
        else
            CollisionManager.instance = this;
        this._groups = [];
    }

    /**
     * @desc checks if for any collision group, our corresponding colliders overlap
     */
    checkCollision() {
        let list = GameObjectManager.instance.colliders().filter(elem => elem.property("collider").trigger.collide);
        for (let g = 0; g < this._groups.length; g++) {
            for (let g1 = 0; g1 < list.length; g1++) {
                if(list[g1].constructor.name === this._groups[g][0]) {
                    for (let g2 = 0; g2 < list.length; g2++) {
                        if (g1 !== g2 && list[g2].constructor.name === this._groups[g][1]) {
                            let c1 = list[g1].property("collider");
                            let c2 = list[g2].property("collider");
                            if (c1 && c2 && c1.collide(c2)) {
                                c1.callback(g1, g2);
                                c2.callback(g2, g1);
                                console.log(list[g1].constructor.name + " collides with " + list[g2].constructor.name);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * @desc checks if a point collides with any underneath collider and returns at first collision
     * @param {number} x the x coordinate of our point
     * @param {number} y the y coordinate of our point
     * @returns {boolean}
     */
    checkRaycast(x,y) {
        let list = GameObjectManager.instance.colliders().filter(elem => elem.property("collider").trigger.click);
        for (let obj of list) {
            if (obj.property("collider").raycast(x,y)) {
                obj.property("collider").callback(obj);
                return true;
            }
        }
        return false;
    }

    /**
     * @desc checks for conflicts amongst rigid colliders with our test gameObject
     * @param {GameObject} go
     * @param {Vector2} newPos the new position of our object
     * @param {string} prop the property updated
     * @returns {Vector2} the final position of our object
     */
    checkRigid(go, newPos, prop) {
        let oldPos = go.position;
        let list = GameObjectManager.instance.rigids();
        let tmp = oldPos.copy.sub(newPos).normalize;
        for (let obj of list) {
            while (go !== obj && go.property("collider").collide(obj.property("collider"), newPos)) {
                newPos.add(tmp);
            }
        }
        return newPos;
    }

    /**
     * @desc adds a group to the manager, group 1 will detect if it's colliding with group 2
     * @param {String[]} group an array of two classnames that are supposed to collide
     */
    addGroup(group) {
        this._groups.push(group);
    }
};
