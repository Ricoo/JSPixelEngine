import assert from "assert"
import GameObject from "./GameObject"
import GameObjectManager from "./manager/GameObjectManager"
import Graphic from "./properties/Graphic"
import ResourceManager from "../resource/ResourceManager"

describe("gameObject test", ()=>{
    let gm = new GameObjectManager()
    let rm = new ResourceManager()
    let go = new GameObject("test", 69, 420)

    it("gameObject creation", ()=>{
        assert.equal(go.name, "test")
        assert.equal(go.x, 69)
        assert.equal(go.angle, 0)
        assert.deepEqual(go.children, [])
        assert.strictEqual(gm.find("test"), go)
    })

    it("gameObject modifications", ()=>{
        let chld = new GameObject()
        go.x += 10
        assert.equal(go.x, 79)
        go.angle = 90
        assert.equal(go.angle, 90)
        go.addChild(chld)
        assert.deepEqual(go.children, [chld])
        go.removeChild(chld)
        assert.deepEqual(go.children, [])
    })

    it("gameObject children", ()=>{
        let chld = new GameObject("child1")
        let chld2 = new GameObject("child2")
        go.addChild(chld)
        go.x += 10
        assert.equal(chld.x, 10)
        chld.addChild(chld2)
        go.x -=10
        assert.equal(chld.x, 0)
        assert.equal(chld2.x, -10)
        assert.equal(chld.parent.name, "test")
        go.removeChild(chld)
        assert.deepEqual(go.children, [])
        chld2.removeParent()
        assert.equal(chld2.parent, undefined)
    })

    it("gameObject properties", ()=>{
        assert.equal(go.hasProperty("graphic"), false)

        go.attach(new Graphic())

        assert.equal(go.hasProperty("graphic"), true)
        assert.deepEqual(go["graphic"].image, rm._sprites.find("EMPTY_IMAGE"))
    })


})