// === GAME OVER SCENE ===
function preload_game_over(scene) {
  // Eventuali assets se vuoi (immagini, suoni)
}

function create_game_over(scene, data) {
  // Sfondo nero
  scene.cameras.main.setBackgroundColor(0x000000);

  // Testo Game Over
  const gameOverText = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY - 100,
    "GAME OVER",
    { font: "64px Arial", fill: "#ff0000" }
  );
  gameOverText.setOrigin(0.5);

  // Pulsante Restart Level
  const restartButton = scene.add.text(
    scene.cameras.main.centerX,
    scene.cameras.main.centerY,
    "Restart Level",
    { font: "32px Arial", fill: "#ffffff", backgroundColor: "#333333", padding: { x: 10, y: 5 } }
  );
  restartButton.setOrigin(0.5);
  restartButton.setInteractive({ useHandCursor: true });
  restartButton.on("pointerdown", () => {
    // Forza la posizione iniziale del player all’inizio della casa
    PP.game_state.playerPosition = { x: 200, y: 500 };
    scene.scene.start("ghostly_house_scene", { x: 200, y: 500 });
  });

  // Fade in della scena
  scene.cameras.main.fadeIn(500, 0, 0, 0);
}

function update_game_over(scene) {
  // Nessuna logica di update necessaria per questa scena
}

function destroy_game_over(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add("game_over",preload_game_over,create_game_over,update_game_over,destroy_game_over);
