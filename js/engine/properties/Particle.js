import Property from "./Property";
import GameObject from "../GameObject";
import Graphic from "./Graphic";
import {ParticleType} from "../../enum/ParticleType";
import {Layer} from "../../enum/Layer";

export default class Particle extends Property {
    /**
     * @desc the particle system, allowing us to create volatile sprites for animation purpose
     * @param {string} spriteName string the sprite to use
     * @param {ParticleType} type the desired type of particle
     * @param {number} amount the quantity of desired particles
     * @param {number} lifetime time during which the particle should stay alive
     * @param {number} period time after which the particle should repeat, 0 if no repeat
     * @param {boolean} fadeout should the particle fade out before disappearing
     * @param {number|number[]} scale scale or scale range of the graphics we want to draw
     * @param {number|number[]} tileId if the graphic used is an atlas, the id of the sprite we need or a range for a randomized particle
     * @param {number[]} speed the particle's range of velocity
     */
    constructor(spriteName, type, amount, lifetime, period, fadeout, scale=1.0, tileId=0, speed=undefined) {
        super();
        this.name = "particle";
        this._spriteName = spriteName;
        this._tile = tileId;
        this._amount = amount;
        this._type = type;
        this._lifetime = lifetime;
        this._period = period;
        this._fadeout = fadeout;
        this._scale = scale;
        this._speed = (speed === undefined ? type.speed : speed);
        this._angle = type.angle;
        this._layer = Layer.PARTICLE;
        this._running = false;
    }

    /**
     * @desc generating the particle GameObjects we need
     */
    generate() {
        for (let x = 0; x < this._amount; x++) {
            let obj = this._createObject();
            let interval = setInterval(() => {
                obj.position.x += obj.moveX;
                obj.position.y += obj.moveY;
                if (obj.gravity) {
                    obj.moveY += .1;
                }

                if (this._fadeout) {
                    obj.property("graphic").alpha = obj.lifetime / this._lifetime;
                }
                obj.lifetime -= 17;

            }, 17);
            setTimeout(() => {
                clearInterval(interval);
                obj.delete();
            }, this._lifetime);
        }

        if (this._running && this._period > 0) {
            this._timeout = setTimeout(()=>{this.generate()}, this._period);
        }
        else {
            this._running = 0;
        }
    }

    /**
     * @desc creates a new GameObject which will be a particle
     * @returns {GameObject}
     * @private
     */
    _createObject() {
        let obj = new GameObject("particle", this._gameObject.position.x, this._gameObject.position.y);
        let tile = this._tile;
        let scale = this._scale;

        if (Array.isArray(this._tile)) {
            tile = this._tile[Math.floor(Math.random() * this._tile.length)]
        }
        if (Array.isArray(this._scale)) {
            scale = Math.random() * (this._scale[1] - this._scale[0]) + this._scale[0];
        }

        obj.attach(new Graphic(this._spriteName, this._layer, scale, 1.0, tile));

        obj.speed = Math.random() * (this._speed[1] - this._speed[0]) + this._speed[0];
        obj.angle = Math.random() * (this._angle[1] - this._angle[0]) + this._angle[0];
        obj.gravity = this._type.gravity;

        obj.moveX = (Math.cos(obj.angle * Math.PI / 180)) * obj.speed / (this._lifetime / 17);
        obj.moveY = (Math.sin(obj.angle * Math.PI / 180)) * obj.speed / (this._lifetime / 17);
        obj.lifetime = this._lifetime;
        return obj;
    }

    /**
     * @desc runs the set particle effect
     */
    run() {
        if (this._timeout !== undefined)
            return ;
        this._running = true;
        this.generate();
    }

    /**
     * @desc stops the currently running particle effect
     */
    stop() {
        this._running = false;
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    }

    delete() {
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    }

    get spriteName() {return this._spriteName;}
    set spriteName(value) {this._spriteName = value;}
    get amount() {return this._amount;}
    set amount(value) {this._amount = value;}
    get period() {return this._period;}
    set period(value) {this._period = value;}
    get lifetime() {return this._lifetime;}
    set lifetime(value) {this._lifetime = value;}
    get fadeout() {return this._fadeout;}
    set fadeout(value) {this._fadeout = value;}
    get type() {return this._type;}
    set type(value) {this._type = value}
    get speed() {return this._speed}
    set speed(value) {this._speed = value;}
    get layer() {return this._layer;}
    set layer(value) {this._layer = value;}

};
