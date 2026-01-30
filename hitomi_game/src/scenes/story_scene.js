// STORY SCENE 
// DICHIARAZIONE VARIABILI
let story_panels = [];
let arrow_story

// PRELOAD
function preload_story(scene) {
 // TAVOLE DELLA STORIA
  story_panels[0] = PP.assets.image.load(scene,"assets/images/story/tavola_1.jpg",1280,720); // tavola 1

  story_panels[1] = PP.assets.image.load(scene,"assets/images/story/tavola_2.jpg",1280,720); // tavola 2 

  story_panels[2] = PP.assets.image.load(scene,"assets/images/story/tavola_3.jpg",1280,720); // tavola 3

  arrow_story = PP.assets.image.load(scene,"assets/images/story/arrow_story.png",70,70);
}

function create_story(scene) {

  scene.storyIndex = 0;

  // layer dedicato alla storia
  scene.storyLayer = PP.layers.create(scene);
  PP.layers.set_z_index(scene.storyLayer, 50);

  // mostra la prima tavola
  showStoryPanel(scene);
}

function showStoryPanel(scene) {

  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;

  // === TAVOLA ===
  const panel = PP.assets.image.add(scene,story_panels[scene.storyIndex],centerX,centerY,0.5,0.5);

  panel.tile_geometry.scroll_factor_x = 0;
  panel.tile_geometry.scroll_factor_y = 0;

  PP.layers.add_to_layer(scene.storyLayer, panel);

  // === PULSANTE ===
  const isLast = scene.storyIndex === story_panels.length - 1;

  if (isLast) {
    createContinueButton(scene, centerX + 500, centerY + 325);
  } else {
    createArrow(scene, centerX + 580, centerY + 325);
  }
}

// FRECCIA 
function createArrow(scene, x, y) {

  const arrow = PP.assets.image.add(scene, arrow_story, x, y, 0.5, 0.5);
  arrow.geometry.scale = 1.5;

  arrow.tile_geometry.scroll_factor_x = 0;
  arrow.tile_geometry.scroll_factor_y = 0;

  PP.layers.add_to_layer(scene.storyLayer, arrow);

  // hover
  PP.interactive.mouse.add(arrow, "pointerover", () => {
    arrow.geometry.scale = 1.7;
  });

  PP.interactive.mouse.add(arrow, "pointerout", () => {
    arrow.geometry.scale = 1.5;
  });

  // click = avanti
  PP.interactive.mouse.add(arrow, "pointerdown", () => {
    scene.storyIndex++;
    showStoryPanel(scene);
  });
}

function createContinueButton(scene, x, y) {

  const text = PP.shapes.text_add(scene, x, y, "Continua...");
  text.geometry.scale_x = 1.2;
  text.geometry.scale_y = 1.2;

  text.tile_geometry.scroll_factor_x = 0;
  text.tile_geometry.scroll_factor_y = 0;

  PP.layers.add_to_layer(scene.storyLayer, text);

  PP.interactive.mouse.add(text, "pointerover", () => {
    text.geometry.scale = 1.6;
  });

  PP.interactive.mouse.add(text, "pointerout", () => {
    text.geometry.scale = 1.4;
  });

  PP.interactive.mouse.add(text, "pointerdown", () => {
    PP.scenes.start("tutorial_scene");
  });
}

function update_story(scene) {
  // nulla
}

function destroy_story(scene) {
  // pulizia automatica layer
}

PP.scenes.add("story_scene", preload_story, create_story, update_story, destroy_story);