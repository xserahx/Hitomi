// === FINALE MUSUBI ===
let musubi_bg;

function preload_musubi(scene) {
  // PRELOAD TAVOLA FINALI
  musubi_bg = PP.assets.image.load(scene, "assets/images/story/good_ending.jpg", 1280, 720);
}

function create_musubi(scene, data) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;

  PP.assets.image.add(scene, musubi_bg, centerX, centerY, 0.5, 0.5);
}

function update_musubi(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_musubi(scene) {
  // Nessuna risprsa da rimuovere 
}

// === REGISTRA LA SCENA ===
PP.scenes.add("musubi_scene",preload_musubi,create_musubi,update_musubi,destroy_musubi);
