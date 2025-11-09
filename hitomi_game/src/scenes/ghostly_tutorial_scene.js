// === GHOSTLY TUTORIAL SCENE ===
function preload_ghostly_tutorial(scene) {
  // Caricamenti opzionali di sprite o audio
  // scene.load.image('button', 'assets/images/button.png'); // opzionale
}

function create_ghostly_tutorial(scene, data) {
  // === GROUND ===
  const ground = scene.add.rectangle(640, 700, 1280, 40, 0x330000); // colore più inquietante rosso scuro
  scene.physics.add.existing(ground, true);

  // === PULSANTE START ===
  const playButton = scene.add.text(400, 400, 'Inizia Gioco', { fontSize: 24, color: '#ff3333' })
    .setOrigin(0.5)
    .setInteractive();

  playButton.on('pointerdown', () => {
    scene.scene.start('ghostly_house_scene'); // versione spettrale della house
  });

  // === PIATTAFORME ===
   const platformPositions = [
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 600, y: 400, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 1500, y: 530, w: 300, h: 20 },
    { x: 350, y: 300, w: 150, h: 20 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  /* === PIATTAFORME MOBILI ===
  const movingPlatformConfigs = [
    { x: 300, y: 300, w: 150, h: 20, direction: 'y', range: 150, speed: 60 },
    { x: 1100, y: 250, w: 120, h: 20, direction: 'y', range: 100, speed: 40 }
  ];
  PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);*/

  // === PLAYER ===
  const startX = data?.x || 200;
  const startY = data?.y || 500;
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
    U: Phaser.Input.Keyboard.KeyCodes.U
  });

  /* === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 10000, 600);
  scene.physics.world.setBounds(0, 0, 2000, 600);*/

  /* === FADE IN ===
  scene.cameras.main.fadeIn(1000, 0, 0, 0);*/
}

function update_ghostly_tutorial(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

  // === CAMBIO MONDO CON U o u ===
  const keyUUpper = PP.interactive.kb.keys.U;
  const keyULower = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.u);

  if (keyUUpper.isDown || keyULower.isDown) {
    const px = PP.game_state.player.x;
    const py = PP.game_state.player.y;
    const nextScene = scene.scene.key === 'ghostly_tutorial_scene'
                      ? 'tutorial_scene'
                      : 'ghostly_tutorial_scene';

    scene.cameras.main.fadeOut(800, 0, 0, 0);
    scene.time.delayedCall(800, () => {
      scene.scene.start(nextScene, { x: px, y: py });
    });
  }
}

function destroy_ghostly_tutorial(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add('ghostly_tutorial_scene', preload_ghostly_tutorial, create_ghostly_tutorial, update_ghostly_tutorial, destroy_ghostly_tutorial);
