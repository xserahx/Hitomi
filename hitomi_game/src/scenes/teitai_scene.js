// === FINALE TEITAI ===
let teitai_bg;

function preload_teitai(scene) {
  teitai_bg = PP.assets.image.load(scene, "assets/images/story/bad_ending.png", 1280, 720);
}

function create_teitai(scene, data) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;

  PP.assets.image.add(scene, teitai_bg, centerX, centerY, 0.5, 0.5);

}

function update_teitai(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_teitai(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("teitai_scene",preload_teitai,create_teitai,update_teitai,destroy_teitai);
