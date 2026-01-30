// === FINALE KAKUREBI ===
// DICHIARAZIONE VARIABILI
let kakurebi_bg; // tavola finale dedicata allo standard ending del platform

function preload_kakurebi(scene) {
  kakurebi_bg = PP.assets.image.load(scene, "assets/images/story/standard_ending.jpg", 1280, 720);
}

function create_kakurebi(scene, data) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;
  PP.assets.image.add(scene, kakurebi_bg, centerX, centerY, 0.5, 0.5);
  
}

function update_kakurebi(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_kakurebi(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("kakurebi_scene",preload_kakurebi,create_kakurebi,update_kakurebi,destroy_kakurebi);
