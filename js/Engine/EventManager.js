import {Event} from "../Enum/Event";
import {KeyCode} from "../Enum/KeyCode";

let EventManager = class EventManager {
    constructor(){
        // Singleton
        if (EventManager.instance) {
            return EventManager.instance;
        }
        EventManager.instance = this;

        window.onmousedown = (ev) => {this.mouseDown(ev)};
        window.onmouseup = (ev) => {this.mouseUp(ev)};
        window.onmousemove = (ev) => {this.mouseMove(ev)};
        window.onkeydown = (ev) => {this.keyDown(ev)};
        window.onkeyup = (ev) => {this.keyUp(ev)};

        this._keysPressed = [];
        this._mouse = {click:false,x:0,y:0};
        this._handlers = {};
        for (let ev in Event) {
            this._handlers[Event[ev]] = [];
        }
    }

    mouseDown(ev) {
        //ev.preventDefault();
        this._mouse.click = true;
        for (let handler of this._handlers[Event.MouseDown]) {
            handler(this._mouse);
        }
    }

    mouseUp(ev) {
        //ev.preventDefault();
        this._mouse.click = false;
        for (let handler of this._handlers[Event.MouseUp]) {
            handler(this._mouse);
        }
    }

    mouseMove(ev) {
        this._mouse.x = ev.clientX;
        this._mouse.y = ev.clientY;
        for (let handler of this._handlers[Event.MouseMove]) {
            handler(this._mouse);
        }
    }

    keyDown(ev) {
        //ev.preventDefault();
        if (!this._keysPressed.includes(ev.keyCode))
            this._keysPressed.push(ev.keyCode);
        for (let handler of this._handlers[Event.KeyDown]) {
            handler(this._keysPressed);
        }
        //    console.log(Array.from(this._keysPressed, (x) => {return Object.keys(KeyCode).find(key => KeyCode[key] === x)}));
    }

    keyUp(ev) {
        //ev.preventDefault();
        this._keysPressed.splice(this._keysPressed.indexOf(ev.keyCode), 1);
        for (let handler of this._handlers[Event.KeyUp]) {
            handler(this._keysPressed);
        }
    }

    addHandler(event, handler) {this._handlers[event].push(handler);}
    removeHandler(event, handler) {this._handlers[event].splice(this._handlers.indexOf(handler), 1);}
    removeAllHandlers(event) {this._handlers[event] = []}

    static get mouse(){return EventManager.instance._mouse;}
    static get keys(){return EventManager.instance._keysPressed;}

    static registerHandler(event, handler) {EventManager.instance.addHandler(event, handler)}
    static unregisterHandler(event, handler) {EventManager.instance.removeHandler(event,handler);}
    static removeAllHandlers(event) {}
};

export {EventManager};