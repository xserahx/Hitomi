// === GAME OVER SCENE ===
// DICHIARAZIONE VARIABILI
let gameover_bg;

function preload_game_over(scene) {
  gameover_bg = PP.assets.image.load(scene, "assets/images/game_over.png", 1280, 720);
}

function create_game_over(scene, data) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;

  PP.assets.image.add(scene, gameover_bg, centerX, centerY, 0.5, 0.5);

  const MENU_AREAS = [
  {
   name: "retry", x: 440, y: 590, w: 150, h: 35, action: () => {
      PP.game_state.enemiesState = {};
      PP.game_state.actualLives = 3;
      PP.game_state.changingWorld = false;
      PP.game_state.respawn = true;
      PP.scenes.start(PP.game_state.currentScene);
   }
  },

  {
    name: "quit", x: 830, y: 600, w: 150, h: 35, action: () => PP.scenes.start("main_menu")
  }
];

MENU_AREAS.forEach(item => {

  // HITBOX 
  const hitbox = PP.shapes.rectangle_add(scene, item.x, item.y, item.w, item.h, "0x000000", 0);

  hitbox.tile_geometry.scroll_factor_x = 0;
  hitbox.tile_geometry.scroll_factor_y = 0;

  PP.interactive.mouse.add(hitbox, "pointerdown", item.action);
});
}

function update_game_over(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_game_over(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("game_over",preload_game_over,create_game_over,update_game_over,destroy_game_over);
