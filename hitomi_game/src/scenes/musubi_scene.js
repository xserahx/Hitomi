// === FINALE MUSUBI ===
function preload_musubi(scene) {
  // Eventuali assets se vuoi (immagini, suoni)
}

function create_musubi(scene, data) {

  scene.cameras.main.setBackgroundColor(0x000000);


  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "MUSUBI - CONNESSIONE",
    { font: "64px Arial", fill: "#00ff00" }
  );
  gameOverText.setOrigin(0.5);


  const restartButton = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY,
    "Goody has accepted the other side, well done!",
    { font: "32px Arial", fill: "#ffffff", backgroundColor: "#333333", padding: { x: 10, y: 5 } }
  );
  restartButton.setOrigin(0.5);
  restartButton.setInteractive({ useHandCursor: true });
  restartButton.on("pointerdown", () => {
    // Forza la posizione iniziale del player all’inizio della casa
    PP.game_state.playerPosition = { x: 200, y: 500 };
    scene.scene.start("main_menu_scene", { x: 200, y: 500 });
  });

  // Fade in della scena
  scene.cameras.main.fadeIn(500, 0, 0, 0);
}

function update_musubi(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_musubi(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("musubi_scene",preload_musubi,create_musubi,update_musubi,destroy_musubi);
