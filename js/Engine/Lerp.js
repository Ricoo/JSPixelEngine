let Lerp = class Lerp {
    constructor(object, property, callback=null) {
        if (Lerp.instance)
            return Lerp.instance;
        else
            Lerp.instance = this;
        this._object = object;
        this._property = property;
        this._callback = callback;
    }

    run(target, delay, pas = null) {
        if (pas === null) {
            let iterations = delay / 20;
            pas = (target - this._object[this._property]) / iterations;
        }
        if(!(this._object[this._property] === target)) {
            this._object[this._property] += pas;
            setTimeout(() => {this.run(target, delay, pas);}, 20);
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