console.log('%c    PoliPhaser - Version 1.01   ', 'background: #728FA5; color: white; font-size:20px;');

/************* HELPER FUNCTIONS *************/

const __PP_internal_cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
};

class __PP_internal_getset_obj_geometry {
    constructor(ph_obj) { this.ph_obj = ph_obj; }
  
    /**
    * The geomtry namespace is a particular namespace that is contained in several objects like
    * images, sprites, polygons, etc.
    * @namespace geometry
    * @property {number} x The horizontal position (in pixels)
    * @property {number} y The vertical position (in pixels)
    * @property {number} body_x The horizontal position of the physics body (in pixels)
    * @property {number} body_y The vertical position of the physics body (in pixels)
    * @property {number} scale_x The horizontal scale (ratio, 1=100% of the original size, 2=twice the original size, etc.)
    * @property {number} scale_y The vertical scale (ratio, 1=100% of the original size, 2=twice the original size, etc.)
    * @property {boolean} flip_x Flip horizontal
    * @property {boolean} flip_y Flip vertical
    * @property {number} angle The rotation angle, from 0 to 360
    * @property {number} alpha The alpha property (trasparency), from 0 to 1
    * @property {number} display_width (read-only) The displayed width in px (affected by scale)
    * @property {number} display_height (read-only) The displayed height in px (affected by scale)
    *
    * @memberof geometry
    */

    get x() {
        return this.ph_obj.x;
    }

    set x(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: x assigned to not a number.");
        this.ph_obj.x = new_val;
    }

    get body_x() {
        return this.ph_obj.body.x;
    }

    set body_x(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: x assigned to not a number.");
        this.ph_obj.body.x = new_val;
    }

    get y() {
        return this.ph_obj.y;
    }

    get body_y() {
        return this.ph_obj.body.y;
    }

    set y(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: y assigned to not a number.");
        this.ph_obj.y = new_val;
    }

    set body_y(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: y assigned to not a number.");
        this.ph_obj.body.y = new_val;
    }

    get scale_x() {
        return this.ph_obj.scaleX;
    }

    set scale_x(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: scale_x assigned to not a number.");
        this.ph_obj.scaleX = new_val;
    }

    get scale_y() {
        return this.ph_obj.scaleY;
    }

    set scale_y(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: scale_y assigned to not a number.");
        this.ph_obj.scaleY = new_val;
    }

    get flip_x() {
        return this.ph_obj.flipX;
    }

    set flip_x(new_val) {
        PP.debug.assert(typeof new_val  === "boolean", "Parameter error: flip_x assigned to not a boolean.");
        this.ph_obj.flipX = new_val;
    }

    get flip_y() {
        return this.ph_obj.flipY;
    }

    set flip_y(new_val) {
        PP.debug.assert(typeof new_val  === "boolean", "Parameter error: flip_x assigned to not a boolean.");
        this.ph_obj.flipY = new_val;
    }

    get display_width() {
        return this.ph_obj.displayWidth;
    }

    get display_height() {
        return this.ph_obj.displayHeight;
    }

    get angle() {
        return this.ph_obj.angle;
    }

    set angle(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: angle assigned to not an intenger.");
        this.ph_obj.angle = new_val;
    }

}

class __PP_internal_getset_obj_tile_geometry {
    constructor(ph_obj) { this.ph_obj = ph_obj; }
  
    /**
    * The geometry namespace is a particular namespace that is contained in several objects like
    * images, sprites, polygons, etc.
    * @namespace tile_geometry
    * @property {number} x The horizontal position (in pixels)
    * @property {number} y The vertical position (in pixels)
    * @property {number} scroll_factor_x The horizontal scroll factor (in percentage): the multiplicative
    *                                    factor of which the element move with the camera. 
    * @property {number} scroll_factor_y The vertical scroll factor (in percentage): the multiplicative
    *                                    factor of which the element move with the camera.
    *
    * @memberof tile_geometry
    */

    get x() {
        return this.ph_obj.tilePositionX;
    }

    set x(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: x assigned to not a number.");
        this.ph_obj.tilePositionX = new_val;
    }
    
    get y() {
        return this.ph_obj.tilePositionY;
    }

    set y(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: x assigned to not a number.");
        this.ph_obj.tilePositionY = new_val;
    }

    get scroll_factor_x() {
        return this.ph_obj.scrollFactorX;
    }

    set scroll_factor_x(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: scroll_factor_y assigned to not a number.");
        this.ph_obj.scrollFactorX = new_val;
    }

    get scroll_factor_y() {
        return this.ph_obj.scrollFactorY;
    }

    set scroll_factor_y(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: scroll_factor_y assigned to not a number.");
        this.ph_obj.scrollFactorY = new_val;
    }

}

class __PP_internal_getset_obj_visibility {
    constructor(ph_obj) { this.ph_obj = ph_obj; }

   /**
    * The visibility namespace is a particular namespace that is contained in several objects like
    * images, sprites, polygons, layers, etc.
    * @namespace visibility
    * @property {number} alpha The opacity value (from 0 to 1)
    * @property {boolean} hidden Is the element visible?
    *
    * @memberof visibility
    */

    get alpha() {
        return this.ph_obj.alpha;
    }

    set alpha(new_val) {
        PP.debug.assert(typeof new_val  === "number", "Parameter error: alpha assigned to not a number.");
        this.ph_obj.alpha = new_val;
    }

    get hidden() {
        return !this.ph_obj.visible;
    }

    set hidden(new_val) {
        PP.debug.assert(typeof new_val  === "boolean", "Parameter error: visible assigned to not a boolean.");
        this.ph_obj.visible = !new_val;
    }

}

/************* MAIN OBJECTS *************/

/**
 * The main namespace of FunPhaser.
 * @namespace
 */
let PP = {};

/**
 * The namespace containing the main functions of the game engine.
 * @namespace PP.game
 * @memberof PP
 */
PP.game   = {};

/**
 * The namespace containing the state variables of the game.
 * @namespace PP.game
 * @memberof PP
 */
PP.game_state   = {};

/**
 * The namespace containing functions for the scene management.
 * @namespace PP.scenes
 * @memberof PP
 */
PP.scenes = {};

/**
 * The list of timers applied in the scene
 * @namespace PP.timers
 * @memberof PP
 */
PP.timers = {};

/**
 * The namespace containing functions to manage physics
 * @namespace PP.physics
 * @memberof PP
 */
PP.physics = {};

/**
 * The namespace containing STATIC (non-movable objects) or DYNAMIC (movable objects).
 * @namespace
 * @memberof PP
 */
PP.physics.type = { STATIC: true, DYNAMIC: false };


/**
 * The namespace containing functions to load and manage assets
 * @namespace
 * @memberof PP
 */
PP.assets = {
    list_images_id : [],
};

/**
 * The namespace containing functions to load and manage image assets
 * @namespace PP.assets.image
 * @memberof PP.assets
 */
PP.assets.image  = {};

/**
 * The namespace containing functions to load and manage sprite assets
 * @namespace PP.assets.sprite
 * @memberof PP.assets
 */
PP.assets.sprite = {};

/**
 * The namespace containing functions to load and manage tilesprites assets
 * @namespace PP.assets.tilesprite
 * @memberof PP.assets
 */
PP.assets.tilesprite  = {};


/**
 * The namespace containing functions for the mouse and keyboard management.
 * @namespace
 * @memberof PP
 */
PP.interactive = {};

/**
 * The namespace containing functions for the mouse management.
 * @namespace
 * @memberof PP.interactive
 */
PP.interactive.mouse = {};

/**
 * The namespace containing functions for the keyboard management.
 * @namespace
 * @memberof PP.interactive
 */
PP.interactive.kb = {};

/**
 * The namespace containing the list of possible key codes for the keyboard. The list
 * is the following: A, ALT, B, BACK_SLASH, BACKSPACE, BACKTICK, BRACKET_LEFT_FIREFOX, BRACKET_RIGHT_FIREFOX, C, CAPS_LOCK, CLOSED_BRACKET, COLON, COMMA, COMMA_FIREFOX, COMMA_FIREFOX_WINDOWS, CTRL, D, DELETE, DOWN, E, EIGHT, END, ENTER, ESC, F, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, FIVE, FORWARD_SLASH, FOUR, G, H, HOME, I, INSERT, J, K, L, LEFT, M, MINUS, N, NINE, NUMPAD_ADD, NUMPAD_EIGHT, NUMPAD_FIVE, NUMPAD_FOUR, NUMPAD_NINE, NUMPAD_ONE, NUMPAD_SEVEN, NUMPAD_SIX, NUMPAD_SUBTRACT, NUMPAD_THREE, NUMPAD_TWO, NUMPAD_ZERO, O, ONE, OPEN_BRACKET, P, PAGE_DOWN, PAGE_UP, PAUSE, PERIOD, PLUS, PRINT_SCREEN, Q, QUOTES, R, RIGHT, S, SEMICOLON, SEMICOLON_FIREFOX, SEVEN, SHIFT, SIX, SPACE, T, TAB, THREE, TWO, U, UP, V, W, X, Y, Z, ZERO,
 * @namespace
 * @memberof PP
 */
PP.key_codes = Phaser.Input.Keyboard.KeyCodes;

/**
 * The namespace containing functions for the management of differnt kind of shapes.
 * @namespace
 * @memberof PP
 */
PP.shapes = {};

/**
 * The namespace containing functions for the management of the camera.
 * @namespace
 * @memberof PP
 */
PP.camera = {};

/**
 * The namespace containing functions to manage layers
 * @namespace
 * @memberof PP
 */
PP.layers = {};

PP.debug = {
    assert : function(condition, message) {
        if (!condition) {
            throw new Error("Assertion failed: " + message);
        }
    }
}

/************* GAME FUNCTIONS *************/

/**
 * Create the game object and initialize the Phaser framework.  This function must be called before PP.game.start is executed.
 * @function create
 * @memberof PP.game
 * @param config The object containing the game configuration.
 * @param {number} config.canvas_width     The width  of the canvas where the game will be rendered.
 * @param {number} config.canvas_height    The height of the canvas where the game will be rendered.
 * @param {string} config.canvas_id        The id of the HTML element containing the canvas.
 * @param {number} config.background_color Default background color used when no background is drawn, in RGB HEX format (for example 0x000000).
 * @param {boolean} config.debug_mode      It defines whether PoliPhaser should run in debug mode showing various debug information. 
 * @param {number} config.gravity_value    The value of gravity in pixels per second squared.
 * @return A game object. The user should not directly manipulate it, but pass it to other functions.
 */
PP.game.create = function (config) {
    PP.debug.assert(typeof config.canvas_width  === "number", "Parameter error: config.canvas_width is not a number.");
    PP.debug.assert(typeof config.canvas_height === "number", "Parameter error: config.canvas_height is not a number.");
    PP.debug.assert(typeof config.canvas_id     === "string", "Parameter error: config.canvas_id is not a string.");

    PP.debug.assert(config.canvas_width  > 0, "Parameter error: config.canvas_width is not a positive number.");
    PP.debug.assert(config.canvas_height > 0, "Parameter error: config.canvas_height is not a positive number.");

    PP.debug.assert(typeof config.gravity_value  === "number", "Parameter error: config.gravity_value is not a number.");


    if(config.debug_mode) {
        PP.debug_mode = true;
        console.log('%c PoliPhaser starting in debug mode ', 'background: #f86d2d; color: white; font-size:16px;');
    } else {
        PP.debug_mode = false;
    }

    if(!(PP.scenes.list)) {
        console.warn('WARNING: Starting a game without any scene loaded.');
    }

    PP.game.config = config;    // Save config for future use

    // Let's create the Phaser config and Phase Game object.
    const phaser_config = {
        type: Phaser.AUTO,
        width: config.canvas_width,
        height: config.canvas_height,
        backgroundColor: config.background_color,
        scene: PP.scenes.list,
        pixelArt: true,
        parent: config.canvas_id,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: config.gravity_value,
                },
                debug: PP.debug_mode
            }
        }
    
    };
    
    if(PP.scenes.list) {
        PP.game.current_main_scene_name = PP.scenes.list_names[0];
    }
    PP.game.ph_obj = new Phaser.Game(phaser_config);
}

/**
 * Return the delta time between the current frame and the previous one of
 * the rendering engine. This value may be averaged with a moving window.
 * @function time_delta
 * @memberof PP.game
 */
PP.game.time_delta = function() {
    return PP.game.ph_obj.loop.delta;
}

/**
 * Return the number of the current frame starting from 0.
 * @function time_frame_nr
 * @memberof PP.game
 */
PP.game.time_frame_nr = function() {
    return PP.game.ph_obj.loop.frame;
}

/**
 * Enforce a fixed value for the physics FPS. Note: this is only the FPS of the physics engine,
 * not the rendering engine!
 * @function set_physics_fps
 * @memberof PP.game
 * @param {object} scene The scene object
 * @param {number} fps The FPS to set
 */
PP.game.set_physics_fps = function(scene, fps) {    
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof fps === "number", "Parameter error: fps should be an object.");

    scene.physics.world.setFPS(fps);
}

/**
 * Get the fixed value for the physics FPS. Note: this is only the FPS of the physics engine,
 * not the rendering engine!
 * @function get_physics_fps
 * @memberof PP.game
 * @param {object} scene The scene object
 */
PP.game.get_physics_fps = function(scene) {    
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");

    return scene.physics.world.fps;
}


/*
 * Start the game.  This function must be called after the creation of the game (PP.game.create) and the addition of the scenes.
 * @function start
 * @memberof PP.game
 * @param {string} scene_name The name of initial scene where to start the game.
 */
/*PP.game.start = function (scene_name) {
    PP.debug.assert(typeof scene_name === "string", "Parameter error: scene_name is not a string.");

    PP.debug.assert(PP.scenes.list_names.includes(scene_name), "Trying to start a non-existent scene: " + scene_name);

    PP.game.current_main_scene_name = scene_name;

    PP.game.ph_obj.scene.start(scene_name);
}*/

/**
 * Add a new scene to the game. This function must be called before PP.game.start is executed.
 * @function add
 * @memberof PP.scenes
 * @param {string}   scene_name       A unique name for the scene to be created. It can be an arbitrary string.
 * @param {function} preload_function The function executed at the beginning, when the scene is loaded. It should contain the loading of the assets (images, sounds, etc.) and initialization stuff.
 * @param {function} create_function  The function executed at the beginning, when the scene is created.
 * @param {function} update_function  The function executed at each frame.
 * @param {function} destroy_function The function executed when the scene is destroyed.
 */
PP.scenes.add = function(scene_name, preload_function, create_function, update_function, destroy_function) {

    PP.debug.assert(typeof scene_name === "string", "Parameter error: scene_name is not a string.");

    PP.debug.assert(typeof preload_function === "function", "Parameter error: load_function is not a function.");
    PP.debug.assert(typeof create_function  === "function", "Parameter error: create_function is not a function.");
    PP.debug.assert(typeof update_function  === "function", "Parameter error: update_function is not a function.");
    PP.debug.assert(typeof destroy_function === "function", "Parameter error: destroy_function is not a function.");

    if (PP.scenes.list === undefined) {
        PP.scenes.list = [];
        PP.scenes.list_names = [];
    }

    // Check that the name of the scene is not duplicated
    PP.debug.assert(!PP.scenes.list_names.includes(scene_name), "Duplicated scene name: " + scene_name);

    // If not, add the name to the list of names
    PP.scenes.list_names.push(scene_name);

    // Now it's time to create the Phaser scene object
    let scene = new Phaser.Scene(scene_name);
    scene.preload = ()=>{preload_function(scene);};
    scene.create  = ()=>{create_function(scene);};
    scene.update  = ()=>{update_function(scene);};
    scene.destroy = ()=>{destroy_function(scene);};

    PP.scenes.list.push(scene);

}

/**
 * Stop the current scene (if any) and start a new one. This function is also used to start the whole game.
 * @function start
 * @memberof PP.scenes
 * @param {string}   scene_name       A unique name for the scene to be created. It can be an arbitrary string.
 */
PP.scenes.start = function(scene_name) {
    PP.debug.assert(typeof scene_name === "string", "Parameter error: scene_name is not a string.");
    PP.debug.assert(PP.scenes.list_names.includes(scene_name), "No scene named '"+ scene_name+"' exist.");

    PP.debug.assert(PP.game.current_main_scene_name != undefined, "Current scene is not defined. You likely forgot to call PP.game.start.");

    let prev_scene_name = PP.game.current_main_scene_name;
    PP.game.current_main_scene_name = scene_name;

    // Let's start the new scene
    // NOTE: Read https://stackoverflow.com/a/71032715
    //       why we need to access the scene in this way.
    PP.game.ph_obj.scene.keys[prev_scene_name].scene.start(scene_name);

}

/**
 * Stop the current scene.
 * @function stop
 * @memberof PP.scenes
 */
PP.scenes.stop = function() {
    PP.debug.assert(PP.game.current_main_scene_name, "Well, you should start a scene before stopping it!");

    // NOTE: Read https://stackoverflow.com/a/71032715
    //       why we need to access the scene in this way.
    PP.game.ph_obj.scene.keys[PP.game.current_main_scene_name].scene.stop();
}

/**
 * Start a new one as overlay of the current one. This function pauses (but not stop) the current scene.
 * Multiple overlays are not allowed, only one overlay at a time can be started.
 * @function start_overlay
 * @memberof PP.scenes
 * @param {string}   scene_name       A unique name for the scene to be created. It can be an arbitrary string.
 */
PP.scenes.start_overlay = function(scene_name) {
    PP.debug.assert(typeof scene_name === "string", "Parameter error: scene_name is not a string.");
    PP.debug.assert(PP.scenes.list_names.includes(scene_name), "No scene named '"+ scene_name+"' exist.");
    PP.debug.assert(PP.game.current_main_scene_name, "A non-overlay scene must be previously started.");
    PP.debug.assert(PP.scenes.in_overlay_mode, "Multiple overlays are not allowed, you must stop the previous one.");

    PP.scenes.in_overlay_mode = true;

    // Let's launch the new scene

    // NOTE: Read https://stackoverflow.com/a/71032715
    //       why we need to access the scene in this way.
    PP.game.ph_obj.scene.keys[PP.game.current_main_scene_name].scene.launch(scene_name);

}

/**
 * Remove the overlay and resume the main scene. It must be called within overlay scene functions.
 * @function stop_overlay
 * @memberof PP.scenes
 */
PP.scenes.stop_overlay = function() {
    PP.debug.assert(PP.game.current_main_scene_name, "This should not occur: the main scene name does not exist.");

    PP.scenes.in_overlay_mode = false;

    // Let's launch the new scene
    // NOTE: Read https://stackoverflow.com/a/71032715
    //       why we need to access the scene in this way.
    PP.game.ph_obj.scene.keys[PP.game.current_main_scene_name].scene.resume(PP.game.current_main_scene_name);
    PP.game.ph_obj.scene.keys[PP.game.current_main_scene_name].scene.stop();
}


/************* GAME STATE *************/


/**
 * Set a vaue or add a new variable to the game state shared among the different scenes
 * @function set_variable
 * @memberof PP.game_state
 * @param {string} variable_name The name of the variable
 * @param {*} variable_value The variable (any variable type is ok).
 */
PP.game_state.set_variable = function(variable_name, variable_value){
    //PP.debug.assert(typeof variable_name !== "", "Parameter error: variable_name cannot be an empty string.");
    PP.game_state[variable_name] = variable_value;
}

PP.game_state.set_Variable = PP.game_state.set_variable;  // Legacy

/**
 * Obtain the value of the variable to the game state shared among the different scenes
 * @function get_variable
 * @memberof PP.game_state
 * @param {string} variable_name the name of the variable
 * @return the value of the value stored in the game state 
 */
PP.game_state.get_variable = function(variable_name){
    //PP.debug.assert(typeof variable_name === "", "Parameter error: variable_name cannot be an empty string.");
    //PP.debug.assert(typeof variable_name === null, "Parameter error: variable_name must have a value.");
    return PP.game_state[variable_name];
}

PP.game_state.get_Variable = PP.game_state.get_variable;  // Legacy


/************* IMAGES *************/


/**
 * Load a new image.
 * @function load
 * @memberof PP.assets.image
 * @param {string}   image_path       A path of the image to load. It can be relative to the current page or a full URL.
 * @return An image object representing the image file itself.
 */
PP.assets.image.load = function(scene, image_path) {
    PP.debug.assert(typeof scene      === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof image_path === "string", "Parameter error: image_path should be a string.");

    let url_hash = __PP_internal_cyrb53(image_path);  // This is used as ID

    if(PP.assets.list_images_id.includes(url_hash)) {
        console.warn('WARNING: you are trying to load multiple times the same image/spritesheet ('+image_path+'). Aborting this load request.');
        return {id: url_hash, type: "image"};
    }

    PP.assets.list_images_id.push(url_hash);

    scene.load.image(url_hash, image_path);
    return {id: url_hash, type: "image"};
}


/**
 * Add and position a new image into the scene.
 * @function add
 * @memberof PP.assets.image
 * @param {object}   scene       The scene object where to add the image.
 * @param {object}   image       The object of an image returned by PP.assets.image.load
 * @param {number}   x           The horizontal initial position in pixels of the image.
 * @param {number}   y           The vertical initial position in pixels of the image.
 * @param {number}   pivot_x     The pivot X position **in percentage ** from 0 to 1.
 * @param {number}   pivot_y     The pivot Y position **in percentage ** from 0 to 1.
 * @return An image object representing the specific image added to the scene.
 */
PP.assets.image.add = function(scene, image, x, y, pivot_x, pivot_y) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof image === "object", "Parameter error: image should be an object.");
    PP.debug.assert(typeof image.id === "string", "Parameter error: image is not a valid image object.");
    PP.debug.assert(image.type === "image", "Parameter error: image is an object but not an image.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(typeof pivot_x === "number", "Parameter error: pivot_x should be a number.");
    PP.debug.assert(typeof pivot_y === "number", "Parameter error: pivot_y should be a number.");

    PP.debug.assert(pivot_x >= 0 && pivot_x <= 1, "Parameter error: pivot_x must be between 0 and 1.");
    PP.debug.assert(pivot_y >= 0 && pivot_y <= 1, "Parameter error: pivot_y must be between 0 and 1.");


    let temp_image = scene.add.image(x, y, image.id);
    temp_image.setOrigin(pivot_x,pivot_y);

    let ret_obj = {ph_obj: temp_image, orig_image : image,
        geometry : new __PP_internal_getset_obj_geometry(temp_image),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(temp_image),
        visibility: new __PP_internal_getset_obj_visibility(temp_image)};
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;
}

/************* SPRITES *************/

/**
 * Load a new spritesheet.
 * @function load_spritesheet
 * @memberof PP.assets.sprite
 * @param {object}   scene        The scene object.
 * @param {string}   image_path   A path of the image containing the spritesheet to load. It can be relative to the current page or a full URL.
 * @param {number}   frame_width  The frame width of the spritesheet in px.
 * @param {number}   frame_height The frame height of the spritesheet in px.
 * @return An object representing the spritesheet image file.
 */
PP.assets.sprite.load_spritesheet = function(scene, image_path, frame_width, frame_height) {
    PP.debug.assert(typeof scene        === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof image_path   === "string", "Parameter error: image_path should be a string.");
    PP.debug.assert(typeof frame_width  === "number", "Parameter error: frame_width should be a number.");
    PP.debug.assert(typeof frame_height === "number", "Parameter error: frame_height should be a number.");

    let url_hash = __PP_internal_cyrb53(image_path);  // This is used as ID

    if(PP.assets.list_images_id.includes(url_hash)) {
        console.warn('WARNING: you are trying to load multiple times the same image/spritesheet ('+image_path+'). Aborting this load request.');
        return {id: url_hash, type: "sprite"};
    }

    PP.assets.list_images_id.push(url_hash);

    scene.load.spritesheet(url_hash, image_path, { frameWidth: frame_width, frameHeight: frame_height });
    return {id: url_hash, type: "sprite"};
}

/**
 * Add and position a new sprite into the scene.
 * @function add
 * @memberof PP.assets.sprite
 * @param {object}   scene       The scene object where to add the image.
 * @param {object}   sprite       The object of a sprite as returned by PP.assets.sprite.load
 * @param {number}   x           The horizontal initial position in pixels of the image.
 * @param {number}   y           The vertical initial position in pixels of the image.
 * @param {number}   pivot_x     The pivot X position **in percentage** from 0 to 1.
 * @param {number}   pivot_y     The pivot Y position **in percentage** from 0 to 1.
 * @return An sprite instance object representing the specific sprite added to the scene.
 */
PP.assets.sprite.add = function(scene, sprite, x, y, pivot_x, pivot_y) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof sprite === "object", "Parameter error: sprite should be an object.");
    PP.debug.assert(typeof sprite.id === "string", "Parameter error: sprite is not a valid sprite object.");
    PP.debug.assert(sprite.type === "sprite", "Parameter error: sprite is an object but not a sprite.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(typeof pivot_x === "number", "Parameter error: pivot_x should be a number.");
    PP.debug.assert(typeof pivot_y === "number", "Parameter error: pivot_y should be a number.");

    let temp_image = scene.add.sprite(x, y, sprite.id);
    temp_image.setOrigin(pivot_x,pivot_y);

    let ret_obj =  {ph_obj: temp_image, orig_sprite : sprite, list_of_animations : [],
        geometry : new __PP_internal_getset_obj_geometry(temp_image),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(temp_image),
        visibility: new __PP_internal_getset_obj_visibility(temp_image)};
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;
}

/**
 * Add a new animation to a given sprite.
 * @function animation_add
 * @memberof PP.assets.sprite
 * @param {object}   sprite_instance  The object of a sprite instance as returned by PP.assets.sprite.add
 * @param {string}   animation_name   A unique name (in the current sprite instance) for this animation.
 * @param {number}   frame_start_nr   The starting frame number (counting from top-left, horizontal first) of the spritesheet.
 * @param {number}   frame_end_nr     The ending frame number (counting from top-left, horizontal first) of the spritesheet.
 * @param {number}   frame_rate       The frame rate of the spritesheet in FPS.
 * @param {number}   repeat           The number of time the animation should repeat. Use -1 for infinite.
 */

PP.assets.sprite.animation_add = function(sprite_instance, animation_name, frame_start_nr, frame_end_nr, frame_rate, repeat) {
    PP.debug.assert(typeof sprite_instance             === "object", "Parameter error: sprite should be an object.");
    PP.debug.assert(typeof sprite_instance.ph_obj      === "object", "Parameter error: sprite is not a valid sprite instance.");
    PP.debug.assert(typeof sprite_instance.orig_sprite === "object", "Parameter error: sprite is not a valid sprite instance.");

    PP.debug.assert(typeof frame_start_nr === "number", "Parameter error: frame_start_nr should be a number.");
    PP.debug.assert(typeof frame_end_nr   === "number", "Parameter error: frame_end_nr should be a number.");
    PP.debug.assert(typeof frame_rate     === "number", "Parameter error: frame_rate should be a number.");
    PP.debug.assert(typeof repeat         === "number", "Parameter error: repeat should be a number.");

    PP.debug.assert(typeof animation_name === "string", "Parameter error: animation_name is not a string.");
    PP.debug.assert(!sprite_instance.list_of_animations.includes(animation_name), "Duplicated animation name!");


    PP.debug.assert(frame_start_nr >= 0, "Parameter error: frame_start_nr invalid number (<0).");
    PP.debug.assert(frame_end_nr >= 0, "Parameter error: frame_end_nr invalid number (<0).");
    PP.debug.assert(frame_rate > 0, "Parameter error: frame_rate invalid number (<=0).");
    PP.debug.assert(repeat >= -1, "Parameter error: repeat invalid number (<-1).");

    sprite_instance.ph_obj.anims.create({
        key: animation_name,
        frames: sprite_instance.ph_obj.anims.generateFrameNumbers(sprite_instance.orig_sprite.id, {
            start: frame_start_nr,
            end: frame_end_nr,
        }),
        frameRate: frame_rate,
        repeat: repeat
    });

    sprite_instance.list_of_animations.push(animation_name);
}

/**
 * Add a new animation to a given sprite using a custom list of frame numbers.
 * @function animation_add_list
 * @memberof PP.assets.sprite
 * @param {object}   sprite_instance  The object of a sprite instance as returned by PP.assets.sprite.add
 * @param {string}   animation_name   A unique name (in the current sprite instance) for this animation.
 * @param {array}    frame_list       The list of frames.
 * @param {number}   frame_rate       The frame rate of the spritesheet in FPS.
 * @param {number}   repeat           The number of time the animation should repeat. Use -1 for infinite.
 */

PP.assets.sprite.animation_add_list = function(sprite_instance, animation_name, frame_list, frame_rate, repeat) {
    PP.debug.assert(typeof sprite_instance             === "object", "Parameter error: sprite should be an object.");
    PP.debug.assert(typeof sprite_instance.ph_obj      === "object", "Parameter error: sprite is not a valid sprite instance.");
    PP.debug.assert(typeof sprite_instance.orig_sprite === "object", "Parameter error: sprite is not a valid sprite instance.");
    PP.debug.assert(typeof frame_list     === "object", "Parameter error: frame_list should be an array.");
    PP.debug.assert(typeof frame_rate     === "number", "Parameter error: frame_rate should be a number.");
    PP.debug.assert(typeof repeat         === "number", "Parameter error: repeat should be a number.");

    PP.debug.assert(typeof animation_name === "string", "Parameter error: animation_name is not a string.");
    PP.debug.assert(!sprite_instance.list_of_animations.includes(animation_name), "Duplicated animation name!");


    PP.debug.assert(frame_rate > 0, "Parameter error: frame_rate invalid number (<=0).");
    PP.debug.assert(repeat >= -1, "Parameter error: repeat invalid number (<-1).");

    sprite_instance.ph_obj.anims.create({
        key: animation_name,
        frames: sprite_instance.ph_obj.anims.generateFrameNumbers(sprite_instance.orig_sprite.id, {
            frames: frame_list
        }),
        frameRate: frame_rate,
        repeat: repeat
    });

    sprite_instance.list_of_animations.push(animation_name);
}

/**
 * Play the requested animation of the sprite instance passed as parameter. The animation must have been
 * previously added via PP.assets.sprite.animation_add
 * @function animation_play
 * @memberof PP.assets.sprite
 * @param {object}           sprite_instance      The object of the sprite instance returned by PP.assets.sprite.add.
 * @param {string}           animation_name       The name of the animation.
 */
PP.assets.sprite.animation_play = function(sprite_instance, animation_name) {
    PP.debug.assert(typeof sprite_instance             === "object", "Parameter error: sprite should be an object.");
    PP.debug.assert(typeof sprite_instance.ph_obj      === "object", "Parameter error: sprite is not a valid sprite instance.");
    PP.debug.assert(typeof sprite_instance.orig_sprite === "object", "Parameter error: sprite is not a valid sprite instance.");

    PP.debug.assert(typeof animation_name === "string", "Parameter error: animation_name is not a string.");
    PP.debug.assert(sprite_instance.list_of_animations.includes(animation_name), "Animation does not exist!");

    sprite_instance.ph_obj.anims.play(animation_name);

}

/**
 * Stop the current animation of the sprite instance passed as parameter
 * @function animation_stop
 * @memberof PP.assets.sprite
 * @param {object}           sprite_instance       The object of the sprite instance returned by PP.assets.sprite.add.
 */
PP.assets.sprite.animation_stop = function(sprite_instance) {
    sprite_instance.ph_obj.anims.stop();
}

/**
 * Add a new tilesprite to the scene.
 * @function add
 * @memberof PP.assets.tilesprite
 * @param {object}   scene       The scene object where to add the image.
 * @param {object}   image       The object of an image returned by PP.assets.image.load
 * @param {number}   x           The horizontal initial position in pixels of the image.
 * @param {number}   y           The vertical initial position in pixels of the image.
 * @param {number}   width       The width of the tilesprite. If zero it will use the size of the texture frame.
 * @param {number}   height      The height of the tilesprite. If zero it will use the size of the texture frame.
 * @param {number}   pivot_x     The pivot X position **in percentage** from 0 to 1.
 * @param {number}   pivot_y     The pivot Y position **in percentage** from 0 to 1.
 */
PP.assets.tilesprite.add = function(scene, image, x, y, width, height, pivot_x, pivot_y) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof image             === "object", "Parameter error: image should be an object.");
    PP.debug.assert(image.type === "image", "Parameter error: image is an object but not an image.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(typeof width  === "number", "Parameter error: width should be a number.");
    PP.debug.assert(typeof height === "number", "Parameter error: height should be a number.");
    PP.debug.assert(typeof pivot_x === "number", "Parameter error: pivot_x should be a number.");
    PP.debug.assert(typeof pivot_y === "number", "Parameter error: pivot_y should be a number.");


    let temp_ts = scene.add.tileSprite(x, y, width, height, image.id);
    temp_ts.setOrigin(pivot_x,pivot_y);

    let ret_obj = {ph_obj: temp_ts, orig_image : image,
        geometry : new __PP_internal_getset_obj_geometry(temp_ts),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(temp_ts),
        visibility: new __PP_internal_getset_obj_visibility(temp_ts)
    };
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;

}

/**
 * Remove an assets object from the scene
 * @function destroy
 * @memberof PP.assets
 * @param {object}   obj   The scene object to destroy and remove from the scene.
 */
PP.assets.destroy = function(obj) {
    PP.debug.assert(typeof obj        === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object", "Parameter error: obj is not a valid PP object instance.");

    obj.ph_obj.destroy();

}

/**
 * Return the pivot of the object passed as argument on the X axis.
 * @function pivot_get_x
 * @memberof PP.assets
 * @param {object}   obj   The scene object.
 */
PP.assets.pivot_get_x = function(obj) {
    PP.debug.assert(typeof obj        === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object", "Parameter error: obj is not a valid PP object instance.");
    return obj.ph_obj.originX;
}

/**
 * Return the pivot of the object passed as argument on the Y axis.
 * @function pivot_get_y
 * @memberof PP.assets
 * @param {object}   obj   The scene object.
 */
PP.assets.pivot_get_y = function(obj) {
    PP.debug.assert(typeof obj        === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object", "Parameter error: obj is not a valid PP object instance.");
    return obj.ph_obj.originY;
}

/**
 * Set a new value for the pivot of the object passed as argument.
 * @function pivot_set
 * @memberof PP.assets
 * @param {object}   obj   The scene object.
 * @param {number}   pivot_x     The pivot X position **in percentage** from 0 to 1.
 * @param {number}   pivot_y     The pivot Y position **in percentage** from 0 to 1.
 */
PP.assets.pivot_set = function(obj, pivot_x, pivot_y) {
    PP.debug.assert(typeof obj        === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object", "Parameter error: obj is not a valid PP object instance.");
    obj.ph_obj.setOrigin(pivot_x,pivot_y);
}

/************* SHAPES *************/

/**
 * Remove a shape object (rectangle, triangle, ...) from the scene
 * @function destroy
 * @memberof PP.shapes
 * @param {object}   shape_obj   The scene object to destroy and remove from the scene.
 */
PP.shapes.destroy = function(shape_obj) {
    PP.debug.assert(typeof shape_obj        === "object", "Parameter error: shape_obj should be an object.");
    PP.debug.assert(typeof shape_obj.ph_obj === "object", "Parameter error: shape_obj is not a valid shape instance.");

    shape_obj.ph_obj.destroy();

}

/**
 * Set the style, color, and alpha of a given shape.
 * @function destroy
 * @memberof PP.shapes
 * @param {object}   shape_obj   The scene object to destroy and remove from the scene.
 * @param {number}   stroke_width  The thikness of the stroke.
 * @param {string}   stroke_color  The 6-digits HEX representation of the color in the format 0xABCDEF.
 * @param {number}   stroke_alpha  The alpha value between 0 and 1.

 */
PP.shapes.set_stroke = function(shape_obj, stroke_width, stroke_color, stroke_alpha) {
    PP.debug.assert(typeof shape_obj === "object", "Parameter error: shape_obj should be an object.");
    PP.debug.assert(typeof shape_obj.ph_obj === "object", "Parameter error: shape_obj should be a valid shape object.");

    PP.debug.assert(typeof stroke_width === "number", "Parameter error: stroke_width should be a number.");
    PP.debug.assert(typeof stroke_alpha === "number", "Parameter error: stroke_alpha should be a number.");
    PP.debug.assert(/^0(x|X)[0-9A-F]{6}$/i.test(stroke_color), "Parameter error: stroke_color is an invalid HEX string, must be in the following format: 0xABCDEF.");


    shape_obj.ph_obj.setStrokeStyle(stroke_width, stroke_color, stroke_alpha);
}

/**
 * Add and position a new rectangle into the scene.
 * @function rectangle_add
 * @memberof PP.shapes
 * @param {object}   scene       The scene object where to add the image.
 * @param {number}   x           The horizontal initial position in pixels of the shape.
 * @param {number}   y           The vertical initial position in pixels of the shape.
 * @param {number}   width       The width of the rectangle in pixels.
 * @param {number}   height      The height of the rectangle in pixels.
 * @param {string}   fill_color  The 6-digits HEX representation of the color in the format 0xABCDEF.
 * @param {number}   fill_alpha  The alpha value between 0 and 1.

 * @return A shape object representing a rectangle.
 */
PP.shapes.rectangle_add = function(scene, x, y, width, height, fill_color, fill_alpha) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(typeof width === "number", "Parameter error: width should be a number.");
    PP.debug.assert(typeof height === "number", "Parameter error: height should be a number.");
    PP.debug.assert(typeof fill_alpha === "number", "Parameter error: fill_alpha should be a number.");
    PP.debug.assert(fill_alpha >= 0 && fill_alpha <= 1, "Parameter error: fill_alpha must be 0 <= x <= 1.");

    PP.debug.assert(/^0(x|X)[0-9A-F]{6}$/i.test(fill_color), "Parameter error: color is an invalid HEX string, must be in the following format: 0xABCDEF.");

    let rect = scene.add.rectangle(x, y, width, height, fill_color, fill_alpha);

    let ret_obj = {ph_obj: rect, 
        geometry : new __PP_internal_getset_obj_geometry(rect),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(rect),
        visibility : new __PP_internal_getset_obj_visibility(rect)};
    ret_obj.ph_obj.backprop_obj = ret_obj;

    return ret_obj;
}

/**
 * Add and position a new arc into the scene.
 * @function arc_add
 * @memberof PP.shapes
 * @param {object}   scene       The scene object where to add the image.
 * @param {number}   x           The horizontal initial position in pixels of the shape.
 * @param {number}   y           The vertical initial position in pixels of the shape.
 * @param {number}   radius      The radius in pixels
 * @param {number}   start_angle The starting angle in degrees
 * @param {number}   end_angle   The final angle in degrees
 * @param {boolean}  anticlockwise  The start and final angle should be considered anticlockwise?
 * @param {string}   fill_color  The 6-digits HEX representation of the color in the format 0xABCDEF.
 * @param {number}   fill_alpha  The alpha value between 0 and 1.

 * @return A shape object representing an arc.
 */
PP.shapes.arc_add = function(scene, x, y, radius, start_angle, end_angle, anticlockwise, fill_color, fill_alpha) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(typeof radius === "number", "Parameter error: radius should be a number.");
    PP.debug.assert(typeof start_angle === "number", "Parameter error: start_angle should be a number.");
    PP.debug.assert(typeof end_angle === "number", "Parameter error: end_angle should be a number.");
    PP.debug.assert(typeof anticlockwise === "boolean", "Parameter error: anticlockwise should be a boolean.");
    PP.debug.assert(typeof fill_alpha === "number", "Parameter error: fill_alpha should be a number.");
    PP.debug.assert(fill_alpha >= 0 && fill_alpha <= 1, "Parameter error: fill_alpha must be 0 <= x <= 1.");

    PP.debug.assert(/^0(x|X)[0-9A-F]{6}$/i.test(fill_color), "Parameter error: color is an invalid HEX string, must be in the following format: 0xABCDEF.");

    let arc = scene.add.arc(x, y, radius, start_angle, end_angle, anticlockwise, fill_color, fill_alpha);
    
    let ret_obj = {ph_obj: arc, 
        geometry : new __PP_internal_getset_obj_geometry(arc),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(arc),
        visibility : new __PP_internal_getset_obj_visibility(arc)};
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;
}

/**
 * Add and position a new polygon (of an arbitrary number of edges) into the scene.
 * @function polygon_add
 * @memberof PP.shapes
 * @param {object}   scene       The scene object where to add the image.
 * @param {number}   x           The horizontal initial position in pixels of the shape.
 * @param {number}   y           The vertical initial position in pixels of the shape.
 * @param {array}    points      The array of points of the polygon: [x1, y1, x2, y2, ...]
 * @param {string}   fill_color  The 6-digits HEX representation of the color in the format 0xABCDEF.
 * @param {number}   fill_alpha  The alpha value between 0 and 1.

 * @return A shape object representing a polygon.
 */
PP.shapes.polygon_add = function(scene, x, y, points, fill_color, fill_alpha) {

    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(Array.isArray(points), "Parameter error: points should be an array.");
    PP.debug.assert(typeof fill_alpha === "number", "Parameter error: fill_alpha should be a number.");
    PP.debug.assert(fill_alpha >= 0 && fill_alpha <= 1, "Parameter error: fill_alpha must be 0 <= x <= 1.");

    PP.debug.assert(points.length > 0 && (points.length % 2) == 0, "Parameter error: points is invalid: must have at least 2 elements and an even number of elements.");

    PP.debug.assert(/^0(x|X)[0-9A-F]{6}$/i.test(fill_color), "Parameter error: color is an invalid HEX string, must be in the following format: 0xABCDEF.");

    let polygon = scene.add.polygon(x, y, points, fill_color, fill_alpha);

    let ret_obj = {ph_obj: polygon,
        geometry : new __PP_internal_getset_obj_geometry(polygon),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(polygon),
        visibility : new __PP_internal_getset_obj_visibility(polygon)};
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;

}

/**
 * Add and position a new piece of text into the scene.
 * @function text_add
 * @memberof PP.shapes
 * @param {object}   scene       The scene object where to add the image.
 * @param {number}   x           The horizontal initial position in pixels of the shape.
 * @param {number}   y           The vertical initial position in pixels of the shape.
 * @param {string}   text        The text to be written in the scene.

 * @return A shape object representing the text.
 */
PP.shapes.text_add = function(scene, x, y, text) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");

    let txt = scene.add.text(x,y,text);

    let ret_obj = {ph_obj:txt,
        geometry : new __PP_internal_getset_obj_geometry(txt),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(txt),
        visibility: new __PP_internal_getset_obj_visibility(txt)
    };
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;
}

/**
 * Add and position a new piece of text into the scene with style.
 * @function text_styled_add
 * @memberof PP.shapes
 * @param {object}   scene       The scene object where to add the image.
 * @param {number}   x           The horizontal initial position in pixels of the shape.
 * @param {number}   y           The vertical initial position in pixels of the shape.
 * @param {string}   text        The text to be written in the scene.
 * @param {number}   fontSize    The dimension of the text in pixel.
 * @param {string}   fontFamily  The font family to use.
 * @param {string}   fontStyle   The style of the font to be used ("normal", "italic", "oblique", "bold").
 * @param {string}   color       The 6-digits HEX representation of the text color in the format 0xABCDEF.
 * @param {string}   background_color   The 6-digits HEX representation of the background color in the format 0xABCDEF. May be null.
 * @param {number}   pivot_x     The pivot of the text on the x axis (0 to 1).
 * @param {number}   pivot_y     The pivot of the text on the y axis (0 to 1).
 * 

 * @return A shape object representing the text.
 */
PP.shapes.text_styled_add = function(scene, x, y, text, fontSize, fontFamily, fontStyle, color, background_color, pivot_x, pivot_y) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof x === "number", "Parameter error: x should be a number.");
    PP.debug.assert(typeof y === "number", "Parameter error: y should be a number.");
    PP.debug.assert(typeof fontSize === "number", "Parameter error: Font size should be a number.");
    PP.debug.assert(typeof fontFamily === "string", "Parameter error: Font family should be a string.");
    let valid_styles = ["normal", "italic", "oblique", "bold"];
    PP.debug.assert(typeof fontStyle === "string", "Parameter error: Font style should be a string.");
    PP.debug.assert(valid_styles.includes(fontStyle), "Parameter error: Font style should be either normal, italic, oblique, or strong.");
    PP.debug.assert(/^0(x|X)[0-9A-F]{6}$/i.test(color), "Parameter error: color is an invalid HEX string, must be in the following format: 0xABCDEF.");

    let colbkg;
    if(background_color!==null) {
        PP.debug.assert(/^0(x|X)[0-9A-F]{6}$/i.test(background_color), "Parameter error: Background color is an invalid HEX string, must be in the following format: 0xABCDEF.");
        colbkg = "#" + background_color.substring(2).toLowerCase();
    }

    let pixelsize = fontSize + "px";
    let col = "#" + color.substring(2).toLowerCase();

    let textconfig = {
        "fontFamily" : fontFamily,
        "fontSize": pixelsize,
        "fontStyle": fontStyle,
        "color": col
    };

    if(background_color!==null) {
        textconfig.backgroundColor = colbkg;
    }
    
    let txt = scene.add.text(x,y,text, textconfig);
    txt.setOrigin(pivot_x, pivot_y);

    let ret_obj = {ph_obj:txt,
        geometry : new __PP_internal_getset_obj_geometry(txt),
        tile_geometry : new __PP_internal_getset_obj_tile_geometry(txt),
        visibility: new __PP_internal_getset_obj_visibility(txt)};
    ret_obj.ph_obj.backprop_obj = ret_obj;
    return ret_obj;
}

/**
 * Modify the text of an Text Object
 * 
 * @param {object} text_instance  the object containing the text to modify
 * @param {string} newtext   The new text to modify
 */
PP.shapes.text_change = function(text_instance, newtext) {
    PP.debug.assert(typeof newtext === "string", "Parameter error: New text should be a string.");
    text_instance.ph_obj.setText(newtext);
}

PP.shapes.changeText = PP.shapes.change_text;   // Legacy

/************* INTERACTIVE *************/
/**
 * Add a new interaction with an object
 * @function add
 * @memberof PP.interactive.mouse
 * @param {object}        obj           The object onto the interaction will be enabled.
 * @param {string}        type_of_event Identify the type of interaction. It can be: "pointerdown",
 *                                     "pointerdownoutside", "pointermove", "pointerout",
 *                                     "pointerover", "pointerup", "pointerupoutside", "wheel"
 * @param {function}      function_to_call function to call when an event occurred. The
 *                                         function must accept one parameter: the current scene.
 */
PP.interactive.mouse.add = function(obj, type_of_event, function_to_call) {
    PP.debug.assert(typeof obj === "object",               "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",        "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(typeof type_of_event === "string",     "Parameter error: type_of_event should be a string.");
    PP.debug.assert(typeof function_to_call === "function","Parameter error: function_to_call should be a function.");

    let valid_events = ["pointerdown", "pointerdownoutside", "pointermove", "pointerout", "pointerover", "pointerup", "pointerupoutside", "wheel"];
    PP.debug.assert(valid_events.includes(type_of_event), "Parameter error: type_of_event is invalid.");

    obj.ph_obj.setInteractive();
    obj.ph_obj.on(type_of_event, () => { function_to_call(obj.ph_obj.scene); });
}

/**
 * Remove all previous added interactions with an object of a given type of event
 * @function remove_all
 * @memberof PP.interactive.mouse
 * @param {object} obj       The object onto the interactions will be erased.
 * @param {string} type_of_event the type of interaction. It can be: "pointerdown",
 *                                     "pointerdownoutside", "pointermove", "pointerout",
 *                                     "pointerover", "pointerup", "pointerupoutside", "wheel"
 */
PP.interactive.mouse.remove_all = function(obj, type_of_event) {
    PP.debug.assert(typeof obj === "object",               "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",        "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(typeof type_of_event === "string",     "Parameter error: type_of_event should be a string.");
    let valid_events = ["pointerdown", "pointerdownoutside", "pointermove", "pointerout", "pointerover", "pointerup", "pointerupoutside", "wheel"];
    PP.debug.assert(valid_events.includes(type_of_event), "Parameter error: type_of_event is invalid.");

    obj.ph_obj.off(type_of_event);

}

/**
 * Test if a keyboard button is pressed.
 * @function is_key_down
 * @memberof PP.interactive.kb
 * @param {object}      scene     The scene object.
 * @param {key_code}    key_code  One of the key codes of PP.key_codes. 
 * @return true if the button is pressed, false otherwise
 */
PP.interactive.kb.is_key_down = function(scene, key_code) {
    PP.debug.assert(typeof key_code == "number", "Parameter error: key_code is not a number.");
    PP.debug.assert(Object.values(PP.key_codes).includes(key_code), "Parameter error: key_code is invalid.");

    if(scene._PP_keys == undefined) {
        scene._PP_keys = []
    }

    if(!scene._PP_keys.includes(key_code)) {
        scene._PP_keys[key_code] = scene.input.keyboard.addKey(key_code);
    }

    return scene._PP_keys[key_code].isDown;
}

/**
 * Test if a keyboard button is NOT pressed.
 * @function is_key_up
 * @memberof PP.interactive.kb
 * @param {object}      scene     The scene object.
 * @param {key_code}    key_code  One of the key codes of PP.key_codes. 
 * @return true if the button is not pressed, false otherwise
 */
PP.interactive.kb.is_key_up = function(scene, key_code) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof key_code == "number", "Parameter error: key_code is not a number.");
    PP.debug.assert(Object.values(PP.key_codes).includes(key_code), "Parameter error: key_code is invalid.");

    if(scene._PP_keys == undefined) {
        scene._PP_keys = []
    }

    if(!scene._PP_keys.includes(key_code)) {
        scene._PP_keys[key_code] = scene.input.keyboard.addKey(key_code);
    }

    return scene._PP_keys[key_code].isUp;
}


/************* CAMERA *************/
/**
 * Make the camera following an object.
 * @function start_follow
 * @memberof PP.camera
 * @param {object}      scene     The scene object.
 * @param {object}      obj       The object to follow (sprite, image, etc.). 
 * @param {number}      offset_x  Offset X of the object to follow  
 * @param {number}      offset_y  Offset Y of the object to follow
 */
PP.camera.start_follow = function(scene, obj, offset_x, offset_y) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof obj === "object",               "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",        "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(typeof offset_x === "number", "Parameter error: offset_x should be a number.");
    PP.debug.assert(typeof offset_y === "number", "Parameter error: offset_y should be a number.");

    scene.cameras.main.startFollow(obj.ph_obj);
    scene.cameras.main.setFollowOffset(offset_x, offset_y);
}

/**
 * Change the offset of the camera.
 * @function set_follow_offset
 * @memberof PP.camera
 * @param {object}      scene     The scene object.
 * @param {number}      offset_x  Offset X in pixels  
 * @param {number}      offset_y  Offset Y in pixels
 */
PP.camera.set_follow_offset = function(scene, offset_x, offset_y) {
    PP.debug.assert(typeof scene === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof offset_x === "number", "Parameter error: offset_x should be a number.");
    PP.debug.assert(typeof offset_y === "number", "Parameter error: offset_y should be a number.");

    scene.cameras.main.setFollowOffset(offset_x, offset_y);
}


PP.camera.get_scroll_x = function(s) {
    return s.cameras.main.scrollX;
}

PP.camera.get_scroll_y = function(s) {
    return s.cameras.main.scrollY;
}


/************* TIMER *************/
/**
 * Create a timer to start a function after a detemrined delay
 * @param {object}   scene             The scene in which the timer take placetypeof s === "object"
 * @param {number}   delay             The amount of milliseconds to be waited
 * @param {function} function_to_call  Callback function to call when an event occurred. The function must accept one parameter: the current scene.
 * @param {boolean}  loop              Whether the time is infinite (true) or single-short (false) 
 */
PP.timers.add_timer = function(s, delay, function_to_call, loop) {

    PP.debug.assert(typeof delay === "number", "Parameter error: delay should be a number.");
    PP.debug.assert(typeof function_to_call === "function","Parameter error: function_to_call should be a function.");
    PP.debug.assert(typeof loop === "boolean", "Parameter error: loop should be a boolean.");

    s.time.addEvent(
        {
            "delay": delay,
            "callback": () => { function_to_call(s)},
            "callbackScope": s,
            "loop": loop 
        }
    );
}

/**
 * Get the current time of the game
 * 
 * @param {object} s the scene
 * @returns the seconds form the begining of the execution of the scene
 */
PP.timers.get_time = function(s){
    return (s.time.now);
}

PP.timers.getTime = PP.timers.get_time; // Legacy

/**
 * 
 * Add an object to the physics engine. The object can be static (unmovable) or dynamic.
 * @param {object} s    The scene
 * @param {object} obj  The object to add to the physics engine
 * @param {object} type PP.physics.type.STATIC or PP.physics.type.DYNAMIC
 */
PP.physics.add = function(s, obj, type) {
    PP.debug.assert(typeof s === "object", "Parameter error: s should be an object.");
    PP.debug.assert(typeof obj === "object", "Parameter error: s should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(type === true || type === false, "Parameter error: type is not valid.");

    s.physics.add.existing(obj.ph_obj, type);

    obj.has_physics = true;
}

/**
 * 
 * Set the speed (in px/s) of the object over the horizontal axis.
 * @param {object} obj   The object previously added to the physic enine
 * @param {float}  vel_x Speed in px/s
 */
PP.physics.set_velocity_x = function(obj, vel_x) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof vel_x === "number", "Parameter error: vel_x should be a number.");

    obj.ph_obj.body.setVelocityX(vel_x);
}

/**
 * 
 * Set the speed (in px/s) of the object over the vertical axis.
 * @param {object} obj   The object previously added to the physic enine
 * @param {float}  vel_y Speed in px/s
 */
PP.physics.set_velocity_y = function(obj, vel_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof vel_y === "number", "Parameter error: vel_x should be a number.");

    obj.ph_obj.body.setVelocityY(vel_y);
}

/**
 * 
 * Get the current speed (in px/s) of the object over the horizontal axis.
 * @param {object} obj   The object previously added to the physic enine
 */
PP.physics.get_velocity_x = function(obj) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");

    return obj.ph_obj.body.velocity.x;
}

/**
 * 
 * Get the current speed (in px/s) of the object over the vertical axis.
 * @param {object} obj   The object previously added to the physics enine
 */
PP.physics.get_velocity_y = function(obj) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");

    return obj.ph_obj.body.velocity.y;
}


/**
 * 
 * Set the acceleration (in px/s^2) of the object over the horizontal axis.
 * @param {object} obj   The object previously added to the physics engine
 * @param {float}  acc_x Acceleration in px/s^2
 */
PP.physics.set_acceleration_x = function(obj, acc_x) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof acc_x === "number", "Parameter error: acc_x should be a number.");

    obj.ph_obj.body.setAccelerationX(acc_x);
}

/**
 * 
 * Set the acceleration (in px/s^2) of the object over the vertical axis.
 * @param {object} obj   The object previously added to the physics engine
 * @param {float}  acc_y Acceleration in px/s^2
 */
PP.physics.set_acceleration_y = function(obj, acc_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof acc_y === "number", "Parameter error: acc_y should be a number.");

    obj.ph_obj.body.setAccelerationY(acc_y);
}

/**
 * 
 * Set the rotation (in °/s) of the object.
 * @param {object} obj   The object previously added to the physics engine
 * @param {float}  rot   The rotation speed
 */
PP.physics.set_rotation = function(obj, rot) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof rot === "number", "Parameter error: rot should be a number.");

    obj.ph_obj.body.setAngularVelocity(rot);
}

/**
 * 
 * Enable or Disable the collision of an object with respect to the world bounds.
 * @param {object} obj   The object previously added to the physics engine
 * @param {boolean} does_collide True or false if the object should collide.
 */
PP.physics.set_collide_world_bounds = function(obj, does_collide) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof does_collide === "boolean", "Parameter error: does_collide should be a boolean.");

    obj.ph_obj.body.collideWorldBounds = does_collide;
}

/**
 * 
 * Enable the collision between two objects.
 * @param {object} s    The scene
 * @param {object} obj1  The first object previously added to the physics engine
 * @param {object} obj2  The scond object previously added to the physics engine
 */
PP.physics.add_collider = function(s, obj1, obj2) {
    PP.debug.assert(typeof s === "object", "Parameter error: s should be an object.");
    PP.debug.assert(typeof obj1 === "object", "Parameter error: obj1 should be an object.");
    PP.debug.assert(typeof obj1.ph_obj === "object",  "Parameter error: obj1 is an object but it is not a valid object.");
    PP.debug.assert(obj1.has_physics, "Parameter error: obj1 does not have physics.");
    PP.debug.assert(typeof obj2 === "object", "Parameter error: obj2 should be an object.");
    PP.debug.assert(typeof obj2.ph_obj === "object",  "Parameter error: obj2 is an object but it is not a valid object.");
    PP.debug.assert(obj2.has_physics, "Parameter error: obj2 does not have physics.");

    let ph_obj = s.physics.add.collider(obj1.ph_obj, obj2.ph_obj);
    return {ph_collider: ph_obj};
}

/**
 * 
 * Enable the collision between two objects and execute a function when the collision occurs.
 * @param {object} s    The scene
 * @param {object} obj1  The first object previously added to the physics engine
 * @param {object} obj2  The scond object previously added to the physics engine
 * @param {function} func A function with the following parameters: func(s,a,b), where a and b are the collided objects
 */
PP.physics.add_collider_f = function(s, obj1, obj2, func) {
    PP.debug.assert(typeof s === "object", "Parameter error: s should be an object.");
    PP.debug.assert(typeof obj1 === "object", "Parameter error: obj1 should be an object.");
    PP.debug.assert(typeof obj1.ph_obj === "object",  "Parameter error: obj1 is an object but it is not a valid object.");
    PP.debug.assert(obj1.has_physics, "Parameter error: obj1 does not have physics.");
    PP.debug.assert(typeof obj2 === "object", "Parameter error: obj2 should be an object.");
    PP.debug.assert(typeof obj2.ph_obj === "object",  "Parameter error: obj2 is an object but it is not a valid object.");
    PP.debug.assert(obj2.has_physics, "Parameter error: obj2 does not have physics.");
    PP.debug.assert(typeof func === "function",  "Parameter error: func must be a function.");

    let ph_obj = s.physics.add.collider(obj1.ph_obj, obj2.ph_obj, (a,b)=>{func(s,a.backprop_obj,b.backprop_obj)});
    return {ph_collider: ph_obj};
}

/**
 * 
 * Execute a function when two objects overlaps.
 * @param {object} s    The scene
 * @param {object} obj1  The first object previously added to the physics engine
 * @param {object} obj2  The scond object previously added to the physics engine
 * @param {function} func A function with the following parameters: func(s,a,b), where a and b are the overlapped objects
 */
PP.physics.add_overlap_f = function(s, obj1, obj2, func) {
    PP.debug.assert(typeof s === "object", "Parameter error: s should be an object.");
    PP.debug.assert(typeof obj1 === "object", "Parameter error: obj1 should be an object.");
    PP.debug.assert(typeof obj1.ph_obj === "object",  "Parameter error: obj1 is an object but it is not a valid object.");
    PP.debug.assert(obj1.has_physics, "Parameter error: obj1 does not have physics.");
    PP.debug.assert(typeof obj2 === "object", "Parameter error: obj2 should be an object.");
    PP.debug.assert(typeof obj2.ph_obj === "object",  "Parameter error: obj2 is an object but it is not a valid object.");
    PP.debug.assert(obj2.has_physics, "Parameter error: obj2 does not have physics.");
    PP.debug.assert(typeof func === "function",  "Parameter error: func must be a function.");

    let ph_obj = s.physics.add.overlap(obj1.ph_obj, obj2.ph_obj, (a,b)=>{func(s,a.backprop_obj,b.backprop_obj)});
    return {ph_collider: ph_obj};
}

PP.physics.remove_collider_or_overlap = function(s, obj) {
    PP.debug.assert(typeof s === "object", "Parameter error: s should be an object.");
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_collider === "object",  "Parameter error: obj is an object but it is a collider.");

    s.physics.world.removeCollider(obj.ph_collider);
}

/**
 * 
 * Set the bounce value over the horizontal axis (0: no bounce, 1: full bounce).
 * @param {object} obj      The object previously added to the physics engine
 * @param {float}  bounce_x Horizontal axis bounce
 */
PP.physics.set_bounce_x = function(obj, bounce_x) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof bounce_x === "number", "Parameter error: vel_x should be a number.");

    obj.ph_obj.body.setBounceX(bounce_x);
}

/**
 * 
 * Set the bounce value over the vertical axis (0: no bounce, 1: full bounce).
 * @param {object} obj      The object previously added to the physics engine
 * @param {float}  bounce_x Vertical axis bounce
 */
PP.physics.set_bounce_y = function(obj, bounce_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof bounce_y === "number", "Parameter error: vel_x should be a number.");

    obj.ph_obj.body.setBounceY(bounce_y);
}

/**
 * 
 * Set the drag on the horizontal axis
 * @param {object} obj      The object previously added to the physics engine
 * @param {float}  drag_x   Drag value
 */
PP.physics.set_drag_x = function(obj, drag_x) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof drag_x === "number", "Parameter error: drag_x should be a number.");

    obj.ph_obj.body.setDragX(drag_x);
}

/**
 * 
 * Set the drag on the verical axis
 * @param {object} obj      The object previously added to the physics engine
 * @param {float}  drag_y   Drag value
 */
PP.physics.set_drag_y = function(obj, drag_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof drag_y === "number", "Parameter error: drag_y should be a number.");

    obj.ph_obj.body.setDragY(drag_y);
}

/**
 * 
 * Set the horizontal friction of the material
 * @param {object} obj      The object previously added to the physics engine
 * @param {float}  friction_x   Friction value
 */
PP.physics.set_friction_x = function(obj, friction_x) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof friction_x === "number", "Parameter error: friction_x should be a number.");

    obj.ph_obj.body.setFrictionX(friction_x);
}

/**
 * 
 * Set the vertical friction of the material
 * @param {object} obj      The object previously added to the physics engine
 * @param {float}  friction_y   Friction value
 */
PP.physics.set_friction_y = function(obj, friction_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof friction_y === "number", "Parameter error: friction_y should be a number.");

    obj.ph_obj.body.setFrictionY(friction_y);
}

/**
 * 
 * Make a dynamic object as immovable. It has not effect on static objects.
 * @param {object} obj      The object previously added to the physics engine
 * @param {boolean}  immovable   Should the object be immovable?
 */
PP.physics.set_immovable = function(obj, immovable) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof immovable === "boolean", "Parameter error: immovable should be a boolean.");

    obj.ph_obj.body.setImmovable(immovable);
}

/**
 * 
 * Enable/disable gravity value for this specific object
 * @param {object} obj      The object previously added to the physics engine
 * @param {boolean}  gravity   Gravity value (true or false)
 */
PP.physics.set_allow_gravity = function(obj, gravity) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");
    PP.debug.assert(typeof gravity === "boolean", "Parameter error: gravity should be a boolean.");

    obj.ph_obj.body.setAllowGravity(gravity);
}

/**
 * 
 * Change the rectangle size of the collision boundaries
 * @param {object}   obj      The object previously added to the physics engine
 * @param {boolean}  width    Width (in px)
 * @param {boolean}  height   Height (in px)
 * @param {boolean}  offset_x Offset of the rectangle on the x axis (in px)
 * @param {boolean}  offset_y Offset of the rectangle on the y axis (in px)
 */
PP.physics.set_collision_rectangle = function(obj, width, height, offset_x, offset_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");

    PP.debug.assert(typeof width    === "number", "Parameter error: width should be a number.");
    PP.debug.assert(typeof height   === "number", "Parameter error: height should be a number.");
    PP.debug.assert(typeof offset_x === "number", "Parameter error: offset_x should be a number.");
    PP.debug.assert(typeof offset_y === "number", "Parameter error: offset_y should be a number.");

    console.log(obj.ph_obj);

    obj.ph_obj.body.setSize(width, height);
    obj.ph_obj.body.setOffset(offset_x, offset_y);
}

/**
 * 
 * Transform the rectangle of the collision boundaries in a circle
 * @param {object}   obj      The object previously added to the physics engine
 * @param {boolean}  radius   Radius (in px)
 * @param {boolean}  offset_x Offset of the circle on the x axis (in px)
 * @param {boolean}  offset_y Offset of the circle on the y axis (in px)
 */
PP.physics.set_collision_circle = function(obj, radius, offset_x, offset_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");

    PP.debug.assert(typeof radius   === "number", "Parameter error: radius should be a number.");
    PP.debug.assert(typeof offset_x === "number", "Parameter error: offset_x should be a number.");
    PP.debug.assert(typeof offset_y === "number", "Parameter error: offset_y should be a number.");

    obj.ph_obj.body.setCircle(radius, offset_x, offset_y);
}

/**
 * 
 * Change the offset x and y of the collision boundaries
 * @param {object}   obj      The object previously added to the physics engine
 * @param {boolean}  offset_x Offset of the circle on the x axis (in px)
 * @param {boolean}  offset_y Offset of the circle on the y axis (in px)
 */
PP.physics.set_collision_offset = function(obj, offset_x, offset_y) {
    PP.debug.assert(typeof obj === "object", "Parameter error: obj should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object",  "Parameter error: obj is an object but it is not a valid object.");
    PP.debug.assert(obj.has_physics, "Parameter error: obj does not have physics.");

    PP.debug.assert(typeof offset_x === "number", "Parameter error: offset_x should be a number.");
    PP.debug.assert(typeof offset_y === "number", "Parameter error: offset_y should be a number.");

    obj.ph_obj.body.setOffset(offset_x, offset_y);
}


/************* LAYERS *************/
/**
 * 
 * Create a new empy layer
 * @param {object} s    The scene
 */
PP.layers.create = function(s) {
    PP.debug.assert(typeof s        === "object", "Parameter error: scene should be a scene object.");

    let temp_obj = s.add.layer();
    let ret_obj =  {ph_obj: temp_obj, visibility: new __PP_internal_getset_obj_visibility(temp_obj)};
    return ret_obj;
}

/**
 * 
 * Add an object to a layer
 * @param {object} s     The scene
 * @param {object} layer The destination layer
 * @param {object} obj   The object to add to the layer.
 */
PP.layers.add_to_layer = function(layer, obj) {
    PP.debug.assert(typeof layer    === "object", "Parameter error: layer should be an object.");
    PP.debug.assert(typeof layer.ph_obj === "object", "Parameter error: layer should be a valid object.");
    PP.debug.assert(typeof obj      === "object", "Parameter error: object should be an object.");
    PP.debug.assert(typeof obj.ph_obj === "object", "Parameter error: object should be a valid object.");

    layer.ph_obj.add(obj.ph_obj);
}

/**
 * 
 * Set the depth (z-index) of the layer
 * @param {object} layer The destination layer
 * @param {number} z_index   The z-index.
 */
PP.layers.set_z_index = function(layer, z_index) {
    PP.debug.assert(typeof layer    === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof z_index  === "number", "Parameter error: z_index should be a number.");

    return layer.ph_obj.setDepth(z_index);
}

/**
 * 
 * Get the depth (z-index) of the layer
 * @param {object} layer The layer
 */
PP.layers.get_z_index = function(layer) {
    PP.debug.assert(typeof layer    === "object", "Parameter error: scene should be a scene object.");

    return layer.ph_obj.depth;
}
