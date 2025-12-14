// === FINALE KAKUREBI ===
function preload_kakurebi(scene) {
  // Eventuali assets se vuoi (immagini, suoni)
}

function create_kakurebi(scene, data) {
  // Sfondo nero
  scene.cameras.main.setBackgroundColor(0x000000);

  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "KAKUREBI - ECLISSI",
    { font: "64px Arial", fill: "#0000ff" }
  );
  gameOverText.setOrigin(0.5);


  const restartButton = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY,
    "Goody has recognized, but not truly accepted, the other side. Maybe something was missing?",
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

function update_kakurebi(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_kakurebi(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("kakurebi_scene",preload_kakurebi,create_kakurebi,update_kakurebi,destroy_kakurebi);
