// MAIN MENU
// DICHIARAZIONE VARIABILI
let menu_bg;

function preload(scene) {
  menu_bg = PP.assets.image.load(scene, "assets/images/homepage.png",1280, 720);
}
 
// CREATE
function create(scene) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;
  PP.game_state.changingWorld = false;
  PP.game_state.pause = false;
  PP.game_state.has_baby = false;

  PP.assets.image.add(scene, menu_bg, centerX, centerY, 0.5, 0.5);

  PP.game_state.bossIsDead = false;
  PP.game_state.bossIsFriendly = false;

  // COSTANTI
  const MENU_AREAS = [
  {
    name: "gioca", x: 525, y: 400, w: 100, h: 25, action: () => PP.scenes.start("tutorial_scene")
  },

  {
    name: "storia", x: 550, y: 460, w: 100, h: 25, action: () => PP.scenes.start("story_scene")
  },

  {
    name: "crediti", x: 585, y: 525, w: 100, h: 25, action: () => PP.scenes.start("credits")
  }
];

MENU_AREAS.forEach(item => {

  // HITBOX INVISIBILE
  const hitbox = PP.shapes.rectangle_add(scene, item.x, item.y, item.w, item.h, "0xffffff", 0);
  hitbox.tile_geometry.scroll_factor_x = 0;
  hitbox.tile_geometry.scroll_factor_y = 0;

  PP.interactive.mouse.add(hitbox, "pointerdown", item.action);
});
}

function update(scene) {
  // Nessun aggiornamento necessario
}

function destroy(scene) {
  // Pulizia se necessario
}

PP.scenes.add("main_menu", preload, create, update, destroy);


