// === GAME OVER SCENE ===
function preload_teitai(scene) {
  // Eventuali assets se vuoi (immagini, suoni)
}

function create_teitai(scene, data) {
  // Sfondo nero
  scene.cameras.main.setBackgroundColor(0x000000);

  // Testo Game Over
  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "TEITAI - ECLISSI",
    { font: "64px Arial", fill: "#ff0000" }
  );
  gameOverText.setOrigin(0.5);

  // Pulsante Restart Level
  const restartButton = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY,
    "Goody has escaped form the other side, is there something else?",
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

function update_teitai(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_teitai(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("teitai_scene",preload_teitai,create_teitai,update_teitai,destroy_teitai);
