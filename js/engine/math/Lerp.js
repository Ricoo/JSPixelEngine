let Lerp = class Lerp {
    /**
     * @desc Lerp is an over-time linear property modifier
     * @param object : Object, the object we want to change the property of
     * @param property : string, the property name
     * @param callback : function, the callback after the completion
     * @returns {Lerp|*}
     */
    constructor(object, property, callback=null) {
        if (Lerp.instance)
            return Lerp.instance;
        else
            Lerp.instance = this;
        this._object = object;
        this._property = property;
        this._callback = callback;
    }

    /**
     * @desc runs the modification from starting value to target value
     * @param target : number, the target value
     * @param delay : number, the delay between two iterations | The total duration of our modification
     * @param pas : number, the value we increase our property of, If blank it is generated and delay is the total duration instead
     */
    run(target, delay, pas = null) {
        if (pas === null) {
            let iterations = delay / 20;
            pas = (target - this._object[this._property]) / iterations;
        }
        if(!(this._object[this._property] === target)) {
            this._object[this._property] += pas;
            setTimeout(() => {this.run(target, delay, pas);}, delay);
        }
        else {
            this.end();
        }
    }

    end() {
        if (this._callback !== null)
            this._callback();
    }
};

export {Lerp};