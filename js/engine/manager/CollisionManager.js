import Vector2 from "../math/Vector2.js";
import Scene from "../Scene.js";

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
        this._groups.forEach(([group1, group2]) => {
            const targetGroup = Scene.colliders().filter(go => go.constructor.name === group2 && go.collider.trigger.collide)

            Scene.colliders()
                .filter(go => go.constructor.name === group1 && go.collider.trigger.collide)
                .forEach(go => {
                    targetGroup.forEach(other => {
                        if (go.collider?.collide(other.collider)) {
                            go.collider.callback(go, other)
                            other.collider.callback(other, go)
                            console.log(`${go.name}:${go.uuid} collides with ${other.name}:${other.uuid}`)
                        }
                    })
                })
        });
    }

    /**
     * @desc checks if a point collides with any underneath collider and returns at first collision
     * @param {number} x the x coordinate of our point
     * @param {number} y the y coordinate of our point
     * @param {boolean} click whether the mouse have been clicked or not
     * @returns {GameObject}
     */
    checkRaycast(x, y, click) {
        let list = Scene.colliders().filter(elem => elem["collider"].trigger[(click ? "click" : "hover")]);
        let res = undefined;
        for (let obj of list) {
            if (!obj.collider) {
                continue;
            }
            if (obj["collider"].raycast(x,y)) {
                res = obj;
                if (!click) {
                    obj["collider"].hover = true;
                }
                else {
                    obj["collider"].callback(obj, {click:true, hover:false});
                }
            }
        }
        if (!click) {
            for (let reset of list) {
                if (res !== reset) {
                    reset["collider"].hover = false;
                }
            }
        }
        return res;
    }

    /**
     * @desc checks for conflicts amongst rigid colliders with our test gameObject
     * @param {GameObject} go
     * @param {Vector2} newPos the new position of our object
     * @param {string} prop the property updated
     * @returns {Vector2} the final position of our object
     */
    checkRigid(go, newPos, prop) {
        let oldPos = go.position.copy;
        let tmp = oldPos.sub(newPos).normalize;

        if (tmp.length) {
            Scene.rigids().forEach(obj => {
                if (go !== obj && go.collider.collide(obj.collider, newPos)) {
                    if (go.force?.weight && obj.force?.weight) {
                        const m1 = go.force.weight;
                        const m2 = obj.force.weight;
                        const v1 = go.force.value.copy.mult(tmp.axis);
                        const v2 = obj.force.value.copy.mult(tmp.axis);
                        
                        // New speeds calculations
                        const goForce = v2.copy
                            .mult(2 * m2)
                            .add(v1.copy.mult(m1 - m2))
                            .mult(1 / (m1 + m2))
                            .sub(v1)
                        const objForce = v1.copy
                            .mult(2 * m1)
                            .add(v2.copy.mult(m2 - m1))
                            .mult(1 / (m1 + m2))
                            .sub(v2)
                        obj.force.add(objForce)
                        go.force.add(goForce)
                    }
                    else {
                        go.force?.stop(prop)
                    }
                    while ((tmp.length !== 0) && go.collider.collide(obj.collider, newPos)) {
                        newPos.add(tmp);
                    }
                }
            })
        }
        return newPos;
    }

    /**
     * @desc adds a group to the manager, group 1 will detect if it's colliding with group 2
     * @param {String[]} group an array of two classnames that are supposed to collide
     */
    addGroup(group) {
        if (this._groups.every(([g1, g2]) => g1 !== group[0] && g2 !== group[1])) {
            this._groups.push(group);
        }
    }

    /**
     * @desc removes a group from the manager
     * @param {String[]} group an array of two classnames that are supposed to collide
     */
    removeGroup(group) {
        this._groups = this._groups.filter(([g1, g2]) => g1 !== group[0] && g2 !== group[1])
    }
};
