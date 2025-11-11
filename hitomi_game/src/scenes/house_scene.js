// === HOUSE SCENE ===
function preload_house(scene) {
  // Caricamenti opzionali di sprite o audio
  // scene.load.image('door', 'assets/images/door.png'); // opzionale
}

function create_house(scene, data) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x202020);

  // === GROUND ===
  const ground = scene.add.rectangle(3840, 700, 7680, 40, 0x000000);
  scene.physics.add.existing(ground, true);

  // === PLATFORMS ===
  const platformPositions = [
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 350, y: 300, w: 150, h: 20 },
    { x: 1280, y: 250, w: 100, h: 620 },
    
    { x: 1600, y: 600, w: 150, h: 20 },
    { x: 1800, y: 500, w: 150, h: 20 },
    { x: 2300, y: 400, w: 150, h: 20 },
    { x: 2560, y: 250, w: 100, h: 620 },

    { x: 7650, y: 250, w: 100, h: 620 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  /* === MOVING PLATFORMS ===
  const movingPlatformConfigs = [
    { x: 300, y: 300, w: 150, h: 20, direction: 'y', range: 150, speed: 60 },
    { x: 1100, y: 250, w: 120, h: 20, direction: 'y', range: 100, speed: 40 }
  ];
  PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);*/

  // === PLAYER ===
  const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 200;
  const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
  PP.game_state.player = PP.entities.player.create(scene, startX, startY);

  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.movingPlatforms);

  // === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 7680, 700);
  scene.physics.world.setBounds(0, 0, 7680, 700);
  scene.cameras.main.fadeIn(800, 0, 0, 0);

  // === PORTA (verso FOREST) ===
  const door = scene.add.rectangle(6000, 560, 60, 120, 0x8B4513);
  door.setStrokeStyle(4, 0x000000);
  door.setOrigin(0.5, 1);
  scene.physics.add.existing(door, true);
  scene.physics.add.overlap(PP.game_state.player, door, () => {
    scene.cameras.main.fadeOut(1000, 0, 0, 0);
    scene.time.delayedCall(1000, () => {
      const { x, y } = PP.game_state.player;
      PP.game_state.playerPosition = { x, y };
      scene.scene.start('forest_scene', { x, y });
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

function update_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

  // aggiorna la posizione globale costantemente
  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: PP.game_state.player.x,
      y: PP.game_state.player.y
    };
  }
}

function destroy_house(scene) {
  // Pulizia risorse se necessaria
}

// === REGISTRA LA SCENA ===
PP.scenes.add('house_scene', preload_house, create_house, update_house, destroy_house);


