import Property from "./Property.js";
import GameObject from "../GameObject.js";
import Graphic from "./Graphic.js";
import {ParticleType} from "../../enum/ParticleType.js";
import {Layer} from "../../enum/Layer.js";
import Vector2 from "../math/Vector2.js";
import {Values} from "../../enum/DefaultValues.js";

export default class Particle extends Property {
    sprite;
    amount;
    period;
    lifetime;
    fadeout;
    type;
    speed;
    layer;
    offset;
    _valueType = {
        amount:"Number",
        sprite:"Sprite",
        period:"Number",
        lifetime:"Number",
        fadeout:"Boolean",
        type:"ParticleType",
        speed:"Vector2",
        layer:"Layer",
        offset:"Vector2"
    };
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
     * @param {Vector2} offset the offset of our particle
     */
    constructor(spriteName = DefaultValues.EMPTY_IMAGE.name, type=ParticleType.Fall, amount=1, lifetime=1000, period=20, fadeout=false, scale=1.0, tileId=0, speed=undefined, offset=undefined) {
        super();
        this._PROPERTY_NAME = "particle";
        this.sprite = ResourceManager.getSprite(spriteName);
        this._tile = tileId;
        this.amount = amount;
        this.type = type;
        this.lifetime = lifetime;
        this.period = period;
        this.fadeout = fadeout;
        this._scale = scale;
        this.speed = (speed === undefined ? new Vector2(type.speed[0],type.speed[1]) : speed);
        this._angle = type.angle;
        this.layer = Layer.PARTICLE;
        this.offset = (offset === undefined ? new Vector2(0,0) : offset);
        this._running = false;
    }

    /**
     * @desc generating the particle GameObjects we need
     */
    generate() {
        for (let x = 0; x < this.amount; x++) {
            let obj = this._createObject();
            let interval = setInterval(() => {
                obj.position.x += obj.moveX;
                obj.position.y += obj.moveY;
                if (obj.gravity) {
                    obj.moveY += .1;
                }

                if (this.fadeout) {
                    obj["graphic"].alpha = obj.lifetime / this.lifetime;
                }
                obj.lifetime -= 17;

            }, 17);
            setTimeout(() => {
                clearInterval(interval);
                obj.delete();
            }, this.lifetime);
        }

        if (this._running && this.period > 0) {
            this._timeout = setTimeout(()=>{this.generate()}, this.period);
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
        let obj = new GameObject("particle", this._gameObject.x + this.offset.x, this._gameObject.y + this.offset.y);
        let tile = this._tile;
        let scale = this._scale;

        if (Array.isArray(this._tile)) {
            tile = this._tile[Math.floor(Math.random() * this._tile.length)]
        }
        if (Array.isArray(this._scale)) {
            scale = Math.random() * (this._scale[1] - this._scale[0]) + this._scale[0];
        }

        obj.attach(new Graphic(this.sprite.name, this.layer, scale, 1.0, tile));

        obj.speed = Math.random() * (this.speed.y - this.speed.x) + this.speed.x;
        obj.angle = Math.random() * (this.type.angle[1] - this.type.angle[0]) + this.type.angle[0];
        obj.gravity = this.type.gravity;

        obj.moveX = (Math.cos(obj.angle * Math.PI / 180)) * obj.speed / (this.lifetime / 17);
        obj.moveY = (Math.sin(obj.angle * Math.PI / 180)) * obj.speed / (this.lifetime / 17);
        obj.lifetime = this.lifetime;
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

    get isRunning() {return this._running;}
    // set type(value) {
    //     this.type = value;
    //     this._angle = value.angle;
    // }

    get customEditorDisplay() {
        let display = document.createElement("div");
        let button = document.createElement("button");
        button.onclick = ()=>{
            if (this._running) {
                button.innerHTML = "PLAY";
                this.stop();
            }
            else {
                button.innerHTML = "STOP";
                this.run();
            }
        };
        button.innerHTML = "PLAY";
        display.appendChild(document.createTextNode("Test : "));
        display.appendChild(button);
        return display;
    }
};
