// === TUTORIAL SCENE ===
function preload_tutorial(scene) {
  // Caricamenti opzionali di sprite o audio
  // scene.load.image('button', 'assets/images/button.png'); // opzionale
}

function create_tutorial(scene) {
  // === GROUND ===
  const ground = scene.add.rectangle(640, 700, 1280, 40, 0x000000);
  scene.physics.add.existing(ground, true);

  // === PULSANTE START ===
  const playButton = scene.add.text(400, 400, 'Inizia Gioco', { fontSize: 24, color: '#060d9aff' })
    .setOrigin(0.5)
    .setInteractive();

  playButton.on('pointerdown', () => {
    scene.scene.start('house_scene');
  });

  // === PLATFORMS ===
  const platformPositions = [
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 600, y: 400, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 1500, y: 530, w: 300, h: 20 },
    { x: 350, y: 300, w: 150, h: 20 }
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
  PP.game_state.player = PP.entities.player.create(scene, 1200, 500);
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

  /* === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 10000, 600);
  scene.physics.world.setBounds(0, 0, 2000, 600);*/

  /* === FADE IN ===
  scene.cameras.main.fadeIn(1000, 0, 0, 0);*/

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
        scene.scene.start(nextScene, { x: px, y: py });
        PP.game_state.changingWorld = false;
      });
    }
  });
}

function update_tutorial(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);
}

function destroy_tutorial(scene) {
  // Cleanup risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add('tutorial_scene', preload_tutorial, create_tutorial, update_tutorial, destroy_tutorial);
