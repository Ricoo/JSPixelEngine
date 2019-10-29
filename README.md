# JSPixelEngine

JSPixelEngine is a pixel-art based game engine being developped in JavaScript

### Features available

- Importing resources from a path or URL through a JSON package descriptor
- Drawing the graphics on a layer-based system
- Raycasting through a point to check whether the sprite has been hit
- Sprite Atlas system
- Animations
- Particles
- Colliders & hitboxes
- Physics and rigid bodies

### Upcoming features

- Scene system inducing dynamic import and creation of GameObjects through a JSON
- Dynamic components for game objects :
  - Event triggering
  - Image/sprite filters
- Sound engine
- Management of two or more canvas instances running at once (to run a minimap or for multiboxing/screen splitting for example)

### Usage

##### 1. _First class_

Create a class that extends JSPixelApp, and implement both initialize() and frame() functions
```javascript
class Game extends JSPixelApp {
  constructor() {
    // Here, "canvas" is the id of your html5 canvas and "package" our packagedescriptor
    super("canvas", "package");
  }
  
  initialize() {
    //This function is called before the first frame() call
  }
  
  frame() {
    //This function is called each time the engine refreshes the screen
  }
}
```

Here is an example of a package descriptor :
```javascript
const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click_sound"},
        {src:"./resource/sound/theme.mp3",name:"theme_song"},
    ],
    sprites:[
        {src:"./resource/texture/inventory.png",name:"inventory_icon",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu_icon",res:[64,64]},
        {src:"./resource/texture/pikachu.png",name:"pikachu",res:[96,128],atlas:[3,4]},
        {src:"./resource/texture/Knight",name:"knight",res:[256,128],atlas:[8,4]}
    ]
};
```
Then we need to add a GameObject instance and assign a Graphic property to be drawn
```javascript
//We can either instantiate GameObject directly or inherit GameObject
let pikachu = new GameObject("pika",0,0);
// We need to provide to Graphic's constructor the desired sprite's name and the layer it should be on
// We can also add optional parameters like scale and alpha
pikachu.attach(new Graphic("pikachu", Layer.CHARACTERS));
```

*Now we have a Pikachu drawn on our screen !*

##### 2. _Managing events_

To handle events, simply add an eventhandler to the EventManager class
```javascript
EventManager.registerHandler(Event.MouseDown,(mouse) => {console.log(mouse.x);});
EventManager.registerHandler(Event.KeyUp, (keys) => {console.log(keys.includes(KeyCode.arrowLeft));});
```
For MouseDown, MouseUp and MouseMove, the mouse object contains :
```
click : boolean, set at true if the mouse is actually clicking
x : int, the x position within the window
y : int, the y position within the window
```
For KeyUp and KeyDown, keys is an array containing the keys currently pressed
```
keys = [KeyCode.ctrl, Keycode.shift, KeyCode.t];
```
You can also get the current state of both mouse and keyboard using
```javascript
let mouse = EventManager.mouse;
let keyPressed = EventManager.keys;
```

So now we can move our sprite with the keys pressed every frame
```javascript
let keys = EventManager.keys;
if (keys.includes(KeyCode.arrowRight)) {
    pikachu.position.x += 5;
}
```
*Now we are able to move your Pikachu to the right !*

##### 3. _Animating sprites_

To animate sprites, you have to attach an Animator instance...
```javascript
//Animator takes no parameter
pikachu.attach(new Animator());
```
And then add some animations to it
```javascript
//Animation takes in parameter the name of the animation to find it later, an array containing the frames in the right order, and the delay between frames
pikachu.property("animator").add(new Animation("walk_forward", [0,1,2,1], 250));
```

We can then animate our character
```javascript
pikachu.property("animator").play("walk_forward");
```
*Now our Pikachu is walking !*

_(As the animation is generic, we can predeclare it and assign it to an unlimited number of GameObject's animators if spritesheets are in the same shape)_

##### 3. _Particles_

To create particles, you must attach a Particle instance first

```javascript
pikachu.attach(new Particle("pikachu", ParticleType.Explode, 1, 1500, 10, false, [.4,.6], [2,3,4], [100,200]))
```
Then, you can simply run the particle effect with the line
```javascript
pikachu.property("particle").run();
```
And stop them with this line
```javascript
pikachu.property("particle").stop();
```
*Now our pikachu emits smaller versions of himself !*

