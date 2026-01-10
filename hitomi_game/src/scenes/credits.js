let crediti_bg;
let back_arrow;

function preload(s) {
  crediti_bg = PP.assets.image.load(s, "assets/images/crediti.png", 2500, 1423);
  back_arrow = PP.assets.image.load(s, "assets/images/arrow.png", 30, 30);
}

function create(s) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;

  PP.assets.image.add(s, crediti_bg, centerX, centerY, 0.5, 0.5);

  // === PULSANTE BACK ===
  const backBtn = PP.assets.image.add(s, back_arrow, 60, 40, 0.5, 0.5);

  // HITBOX
  const backHitbox = PP.shapes.rectangle_add(s, 60, 40, 40, 40, "0xff0000", 0);
  backHitbox.tile_geometry.scroll_factor_x = 0;
  backHitbox.tile_geometry.scroll_factor_y = 0;

  // area cliccabile
  PP.interactive.mouse.add(backHitbox, "pointerdown", () => {
    PP.scenes.start("menu_scene"); 
  });
  
  PP.game_state.bossIsDead = false;
  PP.game_state.bossIsFriendly = false;
}

function update(s) {
  // Nessun aggiornamento necessario
}

function destroy(s) {
  // Pulizia se necessario
}

PP.scenes.add("credits", preload, create, update, destroy);
_