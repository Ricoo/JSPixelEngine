import assert from "assert"
import Enum from "./Enum"

describe("Enum test",  ()=>{
    let e = new Enum({
        "key1":"value1",
        "key2":"value2",
        "key3":"value3"
    })
    it("enum validity", ()=>{
        assert.equal(e["key1"], "value1")
        assert.notStrictEqual(e["key2"], "value3")
    })
    it("enum immutability", ()=>{
        assert.throws(()=>{
            e["key4"] = "value4"
        }, Error, "addition fail")
        assert.throws(()=>{
            delete e["key3"]
        }, Error, "deletion fail")
    })
})