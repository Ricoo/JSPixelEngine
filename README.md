# JSPixelEngine

JSPixelEngine is a pixel-art based game engine being developped in JavaScript

### Features available

- Importing resources from a path or URL through a JSON package descriptor
- Drawing the graphics on a layer-based system
- Raycasting through a point to check whether the sprite has been hit
- Sprite Atlas system
- Animations
- Linear increase of a variable through a time span

### Upcoming features

- Dynamic components for game objects :
  - Colliders
  - Event triggering
  - Image/sprite filters
- Management of two or more canvas instances running at once (to run a minimap or for multiboxing/screen splitting for example)

### Usage

##### 1. _First class_

Create a class that extends JSPixelApp, and implement both initialize() and frame() functions
```
class Game extends JSPixelApp {
  constructor() {
    super("canvas", package);
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
```
const resourceList = {
    audio:[
        {src:"./resource/sound/click.wav",name:"click_sound"},
        {src:"./resource/sound/theme.mp3",name:"theme_song"},
    ],
    sprites:[
        {src:"./resource/texture/inventory.png",name:"inventory_icon",res:[18,54]},
        {src:"./resource/texture/menu.png",name:"menu_icon",res:[64,64]},
        {src:"./resource/texture/pikachu.png",name:"pikachu",res:[96,128],atlas:[3,4]},
        {src:"./resource/texture/crocodil.png",name:"crocodil",res:[96,128],atlas:[3,4]}
    ]
};
```
Then we need to add a GameObject instance and assing a Graphic property to be drawn
```
//We can either instantiate GameObject directly or inherit GameObject
let pikachu = new GameObject("pika",0,0);
// We need to provide to Graphic's constructor the desired sprite's name and the layer it should be on
// We can also add optional parameters like scale and alpha
pikachu.attach(new Graphic("pikachu", Layer.CHARACTERS));
```

##### 2. _Managing events_

To handle events, simply add an eventhandler to the EventManager class
```
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
```
let mouse = EventManager.mouse;
let keyPressed = EventManager.keys;
```

So now we can move our sprite with the keys pressed every frame
```
let keys = EventManager.keys;
if keys.includes(KeyCode.arrowRight) {
    pikachu.position.x += 5;
}
```

##### 3. _Animating sprites_

To animate sprites, you have to attach an Animator instance...
```
//Animator takes no parameter
pikachu.attach(new Animator());
```
And then add some animations to it
```
//Animation takes in parameter the name of the animation to find it later, an array containing the frames in the right order, and the delay between frames
pikachu.property("animator").add(new Animation("walk_forward", [0,1,2,1], 250));
```

We can then animate our character
```
pikachu.property("animator").play("walk_forward");
```
_As the animation is generic, we can predeclare it and assign it to an unlimited number of GameObject's animators if spritesheets are in the same shape_