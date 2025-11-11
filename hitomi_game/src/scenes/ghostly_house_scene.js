// === GHOSTLY HOUSE SCENE ===
function preload_ghostly_house(scene) {
  // Caricamenti opzionali (sprite, audio, ecc.)
}

function create_ghostly_house(scene, data) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x1a0000);

  // === GROUND ===
   const ground = scene.add.rectangle(3840, 700, 7680, 40, 0x000000);
  scene.physics.add.existing(ground, true);

  // === NEBBIA ROSSA ===
  const overlay = scene.add.rectangle(640, 360, 1280, 720, 0x660000);
  overlay.setAlpha(0.25);
  overlay.setBlendMode(Phaser.BlendModes.ADD);

  // === PLATFORMS ===
  const platformPositions = [
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 1500, y: 530, w: 300, h: 20 },
    { x: 350, y: 300, w: 150, h: 20 },
    { x: 1280, y: 250, w: 100, h: 620 },
    { x: 1880, y: 570, w: 150, h: 20 },
    { x: 2180, y: 400, w: 120, h: 20 },
    { x: 2480, y: 440, w: 200, h: 20 },
    { x: 2780, y: 650, w: 300, h: 20 },
    { x: 2280, y: 420, w: 90, h: 20 },
    { x: 4480, y: 460, w: 200, h: 20 },
    { x: 2180, y: 110, w: 200, h: 20 },
    { x: 7650, y: 250, w: 100, h: 620 },
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === MOVING PLATFORMS ===
  const movingPlatformConfigs = [
    { x: 300, y: 300, w: 150, h: 20, direction: 'y', range: 150, speed: 60 },
    { x: 1100, y: 250, w: 120, h: 20, direction: 'y', range: 100, speed: 40 }
  ];
  PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);

  // === PLAYER ===
  const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 200;
  const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  PP.game_state.player.fillColor = 0xff2222; // tono rosso spettrale

  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.movingPlatforms);

  // === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 7680, 700);
  scene.physics.world.setBounds(0, 0, 7680, 700);
  scene.cameras.main.fadeIn(800, 0, 0, 0);

  // === PORTA (per andare alla foresta spettrale) ===
  const door = scene.add.rectangle(1800, 560, 60, 120, 0x660000);
  door.setStrokeStyle(4, 0xaa0000);
  door.setOrigin(0.5, 1);
  scene.physics.add.existing(door, true);

  scene.physics.add.overlap(PP.game_state.player, door, () => {
    scene.cameras.main.fadeOut(1000, 0, 0, 0);
    scene.time.delayedCall(1000, () => {
      const { x, y } = PP.game_state.player;
      PP.game_state.playerPosition = { x, y };
      scene.scene.start('ghostly_forest_scene', { x, y });
    });
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

function update_ghostly_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

  // aggiorna costantemente la posizione
  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: PP.game_state.player.x,
      y: PP.game_state.player.y
    };
  }
}

function destroy_ghostly_house(scene) {
  // pulizia risorse
}

// === REGISTRA LA SCENA ===
PP.scenes.add(
  'ghostly_house_scene',
  preload_ghostly_house,
  create_ghostly_house,
  update_ghostly_house,
  destroy_ghostly_house
);


