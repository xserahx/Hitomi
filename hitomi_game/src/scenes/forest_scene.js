// === FOREST SCENE ===
function preload_forest(scene) {
  // Carica eventuali risorse future (audio, immagini, ecc.)
}

function create_forest(scene, data) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x0b3d0b);

  // === LUCE / NEBBIA SOFT ===
  const overlay = scene.add.rectangle(1000, 300, 2000, 600, 0x00ff00);
  overlay.setAlpha(0.05);
  overlay.setBlendMode(Phaser.BlendModes.ADD);

  // === GROUND ===
  const ground = scene.add.rectangle(3200, 658, 6400, 120, 0x4a3b2a);
  scene.physics.add.existing(ground, true);

  // === PIATTAFORME "TRONCHI" ===
  const platformPositions = [
    { x: 300, y: 450, w: 200, h: 20 },
    { x: 700, y: 380, w: 180, h: 20 },
    { x: 1100, y: 320, w: 150, h: 20 },
    { x: 1500, y: 500, w: 220, h: 20 },
    { x: 1800, y: 400, w: 180, h: 20 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PLAYER ===
  const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 100;
  const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
  PP.game_state.player = PP.entities.player.create(scene, startX, startY);

  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);

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
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 6400, 600);
  scene.physics.world.setBounds(0, 0, 6400, 600);
  scene.cameras.main.fadeIn(800, 0, 0, 0);

  // === CAMBIO MONDO (U / u) ===
  PP.game_state.changingWorld = false;
  scene.input.keyboard.on('keydown-U', () => switchWorld(scene));
  scene.input.keyboard.on('keydown-u', () => switchWorld(scene));
}

// === FUNZIONE CAMBIO MONDO ===
function switchWorld(scene) {
  if (PP.game_state.changingWorld) return;
  PP.game_state.changingWorld = true;

  // Salva posizione globale
  PP.game_state.playerPosition = {
    x: PP.game_state.player.x,
    y: PP.game_state.player.y
  };

  const currentScene = scene.scene.key;
  const nextScene = currentScene.startsWith('ghostly_')
    ? currentScene.replace('ghostly_', '')
    : 'ghostly_' + currentScene;

  scene.cameras.main.fadeOut(500, 0, 0, 0);
  scene.time.delayedCall(500, () => {
    const { x, y } = PP.game_state.playerPosition;
    scene.scene.start(nextScene, { x, y });
    PP.game_state.changingWorld = false;
  });
}

function update_forest(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

  // Aggiorna posizione globale costantemente
  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: PP.game_state.player.x,
      y: PP.game_state.player.y
    };
  }
}

function destroy_forest(scene) {
  // Pulizia risorse se necessaria
}

// === AGGIUNGI LA SCENA ===
PP.scenes.add('forest_scene', preload_forest, create_forest, update_forest, destroy_forest);
