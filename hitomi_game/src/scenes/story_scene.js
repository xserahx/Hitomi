let story_panels = [];

function preload_story(scene) {

  story_panels[0] = PP.assets.image.load(scene,"assets/images/story/tavola_1.png",1280,720);

  story_panels[1] = PP.assets.image.load(scene,"assets/images/story/tavola_2.png",1280,720);

  story_panels[2] = PP.assets.image.load(scene,"assets/images/story/tavola_3.png",1280,720);
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

  const buttonText = isLast ? "Continua..." : "→";

  const button = PP.shapes.text_add(scene, centerX + 500, centerY + 325, buttonText);

  button.tile_geometry.scroll_factor_x = 0;
  button.tile_geometry.scroll_factor_y = 0;

  PP.layers.add_to_layer(scene.storyLayer, button);

  // === INTERAZIONE ===
  PP.interactive.mouse.add(button, "pointerover", () => {
    button.geometry.scale = 1.1;
  });

  PP.interactive.mouse.add(button, "pointerout", () => {
    button.geometry.scale = 1;
  });

  PP.interactive.mouse.add(button, "pointerdown", () => {

    if (isLast) {
      // vai al platform
      PP.scenes.start("tutorial_scene");
    } else {
      scene.storyIndex++;
      showStoryPanel(scene);
    }
  });
}

function update_story(scene) {
  // nulla
}

function destroy_story(scene) {
  // pulizia automatica layer
}

PP.scenes.add("story_scene", preload_story, create_story, update_story, destroy_story);