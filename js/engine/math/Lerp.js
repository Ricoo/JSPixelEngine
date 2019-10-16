export default class Lerp {
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
        this._running = null;
    }

    /**
     * @desc runs the modification from starting value to target value
     * @param target : number, the target value
     * @param delay : number, the delay between two iterations | The total duration of our modification
     * @param pas : number, the value we increase our property of, If blank it is generated and delay is the total duration instead
     */
    run(target, delay, pas = null) {
        if (this._running !== null) {
            clearTimeout(this._running);
        }
        if (pas === null) {
            let iterations = 100;
            pas = (target - this._object[this._property]) / iterations;
            delay = delay/iterations;
        }
        if(Math.abs(this._object[this._property] - target) > Math.abs(pas)) {
            this._object[this._property] += pas;
            this._running = setTimeout(() => {this.run(target, delay, pas);}, delay);
        }
        else {
            this._object[this._property] = target;
            this.end();
        }
    }

    end() {
        if (this._callback !== null)
            this._callback();
        this._running = null;
    }
};
