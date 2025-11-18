// === TUTORIAL SCENE ===
function preload_tutorial(scene) {
  // Caricamenti opzionali di sprite o audio
}

// === CREAZIONE SCENA ===
function create_tutorial(scene) {

  // === GROUND ===
  const ground = scene.add.rectangle(640, 700, 1280, 40, 0x000000);
  scene.physics.add.existing(ground, true);

  // === PLATFORMS ===
  const platformPositions = [
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 1500, y: 530, w: 300, h: 20 },
    { x: 350, y: 300, w: 150, h: 20 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PLAYER ===
  const startX = (scene.scene.settings.data && scene.scene.settings.data.x) ||
                 (PP.game_state.playerPosition?.x ?? 1200);
  const startY = (scene.scene.settings.data && scene.scene.settings.data.y) ||
                 (PP.game_state.playerPosition?.y ?? 500);

  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);

// === VITE PLAYER VISUALIZZATE ===
  PP.game_state.playerLivesText = scene.add.text(20, 20, `Lives: ${PP.game_state.player.lives}`, {
    font: "28px Arial",
    fill: "#ffffff"
  }).setScrollFactor(0); // rimane fisso sulla camera

  // === NEMICI ===
  const enemyPositions = [
    { x: 400, y: 200, speed: 80 }
  ];
  PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);
  scene.physics.add.collider(PP.game_state.enemies, PP.game_state.platforms);
  scene.physics.add.collider(PP.game_state.enemies, ground);

  // Overlap player-nemici per danno
  scene.physics.add.overlap(PP.game_state.player, PP.game_state.enemies, () => {
    PP.entities.player.damage(scene);
  });

  // === INPUT ===
  PP.interactive.kb.keys = scene.input.keyboard.addKeys({
    A: Phaser.Input.Keyboard.KeyCodes.A,
    D: Phaser.Input.Keyboard.KeyCodes.D,
    SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
    LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
    RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    U: Phaser.Input.Keyboard.KeyCodes.U
  });

  // === CAMERA ===
  //scene.cameras.main.startFollow(PP.game_state.player);
  //scene.cameras.main.setBounds(0, 0, 2000, 800);
  //scene.physics.world.setBounds(0, 0, 2000, 800);

  // === FADE IN ===
  scene.cameras.main.fadeIn(800, 0, 0, 0);

  // === CAMBIO MONDO (U / u) ===
  PP.game_state.changingWorld = false;

  scene.input.keyboard.on('keydown-U', () => switchWorld(scene));
  scene.input.keyboard.on('keydown-u', () => switchWorld(scene));

    // === PORTA (verso CASA) ===
  const door = scene.add.rectangle(50, 650, 60, 120, 0x8B4513);
  door.setStrokeStyle(4, 0x000000);
  door.setOrigin(0.5, 1);
  scene.physics.add.existing(door, true);
  scene.physics.add.overlap(PP.game_state.player, door, () => {
    scene.cameras.main.fadeOut(1000, 0, 0, 0);
    scene.time.delayedCall(1000, () => {
      const { x, y } = PP.game_state.player;
      PP.game_state.playerPosition = { x, y };
      scene.scene.start('house_scene', { x, y });
    });
  });
}

// === FUNZIONE CAMBIO MONDO ===
function switchWorld(scene) {
  if (PP.game_state.changingWorld) return;

  PP.game_state.changingWorld = true;

  // Salva la posizione del giocatore globalmente
  PP.game_state.playerPosition = {
    x: PP.game_state.player.x,
    y: PP.game_state.player.y
  };

  const currentScene = scene.scene.key;
  const nextScene = currentScene.startsWith('ghostly_')
    ? currentScene.replace('ghostly_', '')
    : 'ghostly_' + currentScene;

  // === Transizione semplice (fade-out / fade-in) ===
  scene.cameras.main.fadeOut(500, 0, 0, 0);
  scene.time.delayedCall(500, () => {
    const { x, y } = PP.game_state.playerPosition;
    scene.scene.start(nextScene, { x, y });
    PP.game_state.changingWorld = false;
  });
}

function update_tutorial(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

  // Aggiorna posizione globale in tempo reale
  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: PP.game_state.player.x,
      y: PP.game_state.player.y
    };
  }
}

function destroy_tutorial(scene) {
  // Cleanup risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add('tutorial_scene', preload_tutorial, create_tutorial, update_tutorial, destroy_tutorial);

// === FUNZIONE DI DANNO PLAYER ===
PP.entities.player.damage = function(scene) {
  const player = PP.game_state.player;
  if (player.isInvincible) return;

  player.lives -= 1;
  player.isInvincible = true;

  const originalColor = player.fillColor;
  let flashCount = 0;

  // === Lampeggio rosso ===
  scene.time.addEvent({
    delay: 100,
    repeat: 5,
    callback: () => {
      player.fillColor = flashCount % 2 === 0 ? 0xff0000 : originalColor;
      flashCount++;
    }
  });

  // === Knockback ===
  const knockback = 250;
  const direction = player.body.velocity.x >= 0 ? -1 : 1;
  player.body.setVelocity(knockback * direction, -200);

  // === Ritorna hittabile dopo 2 sec ===
  scene.time.delayedCall(2000, () => {
    player.isInvincible = false;
    player.fillColor = originalColor;
  });

  // === GAME OVER ALL’ULTIMA VITA ===
  if (player.lives <= 0) {
    scene.cameras.main.shake(400, 0.02);
    scene.time.delayedCall(400, () => {
      scene.scene.start("game_over", { restartScene: scene.scene.key });
    });
  }
};