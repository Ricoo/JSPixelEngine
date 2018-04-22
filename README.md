# JSPixelEngine

JSPixelEngine is a pixel-art based game engine being developped in JavaScript

### Features available

- Importing resources from a path or URL through a JSON package descriptor
- Drawing the graphics on a layer-based system
- Raycasting through a point to check whether the sprite has been hit

### Upcoming features

- Hitboxes for sprites
- Filters and matrices for sprite manipulation
- Sprite atlases system
- Management of two or more canvas instances running at once (to run a minimap for example)

### Usage

##### 1. _First class_

Create a class that extends JSPixelApp, and implement both initialize and frame functions
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
        {src:"./resource/texture/menu.png",name:"menu_icon",res:[64,64]}
    ]
};
```
Then we need to add some stuff to be drawn and register it
```
let menu = new Drawable("menu_icon", "menu", Layer.GUI)
GraphicsManager.register(menu);
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