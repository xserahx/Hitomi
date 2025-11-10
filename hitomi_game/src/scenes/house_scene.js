// === HOUSE SCENE ===
function preload_house(scene) {
  // Caricamenti opzionali di sprite o audio
  // scene.load.image('door', 'assets/images/door.png'); // opzionale
}

function create_house(scene, data) {
  // === GROUND ===
  const ground = scene.add.rectangle(400, 580, 10000, 40, 0x000000);
  scene.physics.add.existing(ground, true);

  // === PLATFORMS ===
  const platformPositions = [
    { x: 0, y: 250, w: 100, h: 620 },
    { x: 600, y: 450, w: 150, h: 20 },
    { x: 900, y: 380, w: 120, h: 20 },
    { x: 1200, y: 320, w: 200, h: 20 },
    { x: 1500, y: 530, w: 300, h: 20 },
    { x: 1000, y: 300, w: 90, h: 20 },
    { x: 3200, y: 320, w: 200, h: 20 },
    { x: 900, y: 90, w: 200, h: 20 }
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
  const startX = data && data.x !== undefined ? data.x : 200;
  const startY = data && data.y !== undefined ? data.y : 500;
  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.movingPlatforms);

  // === INPUT ===
  PP.interactive.kb.keys = scene.input.keyboard.addKeys({
    A: Phaser.Input.Keyboard.KeyCodes.A,
    D: Phaser.Input.Keyboard.KeyCodes.D,
    SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
    LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
    RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    SHIFT:  Phaser.Input.Keyboard.KeyCodes.SHIFT
  });

  // === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 10000, 600);
  scene.physics.world.setBounds(0, 0, 2000, 600);

  // === PORTA ===
  const door = scene.add.rectangle(1800, 560, 60, 120, 0x8B4513);
  door.setStrokeStyle(4, 0x000000);
  door.setOrigin(0.5, 1);
  scene.physics.add.existing(door, true);
  scene.physics.add.overlap(PP.game_state.player, door, () => {
    scene.cameras.main.fadeOut(1000, 0, 0, 0);
    scene.time.delayedCall(1000, () => {
      scene.scene.start('forest_scene', { x: PP.game_state.player.x, y: PP.game_state.player.y });
    });
  });

  // === CAMBIO MONDO (U/u) ===
  PP.game_state.changingWorld = false;
  scene.input.keyboard.on('keydown-U', () => {
    if (!PP.game_state.changingWorld) {
      PP.game_state.changingWorld = true;
      const currentScene = scene.scene.key;
      let nextScene;
      if (currentScene.startsWith('ghostly_')) {
        nextScene = currentScene.replace('ghostly_', '');
      } else {
        nextScene = 'ghostly_' + currentScene;
      }
      scene.cameras.main.fadeOut(1000, 0, 0, 0);
      scene.time.delayedCall(1000, () => {
        const px = PP.game_state.player.x;
        const py = PP.game_state.player.y;
        scene.scene.start(nextScene, { x: px, y: py }); // Mantiene posizione
        PP.game_state.changingWorld = false;
      });
    }
  });
}

function update_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);
}

function destroy_house(scene) {
  // Pulizia risorse se necessaria
}

// === REGISTRA LA SCENA ===
PP.scenes.add('house_scene', preload_house, create_house, update_house, destroy_house);

