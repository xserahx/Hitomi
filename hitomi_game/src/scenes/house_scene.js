PP.scenes.add(
  'house_scene',

  function preload(scene) {
    // Se vuoi, puoi caricare un'immagine per la porta
    // scene.load.image('door', 'assets/images/door.png');
  },

  function create(scene) {
    // === BLACK GROUND ===
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
    PP.game_state.player = PP.entities.player.create(scene, 200, 500);
    scene.physics.add.collider(PP.game_state.player, ground);

    // === INPUT ===
    PP.interactive.kb.keys = scene.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
      RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });

    // === COLLISIONS ===
    scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);
    scene.physics.add.collider(PP.game_state.player, PP.game_state.movingPlatforms);

    // === CAMERA ===
    scene.cameras.main.startFollow(PP.game_state.player);
    scene.cameras.main.setBounds(0, 0, 10000, 600);
    scene.physics.world.setBounds(0, 0, 2000, 600);

    // === PORTA (rettangolo realistico) ===
    const door = scene.add.rectangle(1800, 560, 60, 120, 0x8B4513) // marrone legno
      .setStrokeStyle(4, 0x000000) // bordo nero spesso
      .setOrigin(0.5, 1); // allineata col terreno

    scene.physics.add.existing(door, true);

    // === OVERLAP CON LA PORTA ===
    scene.physics.add.overlap(PP.game_state.player, door, () => {
      // Dissolvenza + cambio scena
      scene.cameras.main.fadeOut(1000, 0, 0, 0);
      scene.time.delayedCall(1000, () => {
        scene.scene.start('forest_scene');
      });
    });
  },

  function update(scene) {
    // === UPDATE LOOP ===
    PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);
    // console.log(`Player position → x: ${PP.game_state.player.x.toFixed(0)}, y: ${PP.game_state.player.y.toFixed(0)}`);
  },

  function destroy(scene) {
    // Cleanup risorse se necessario
  }
);
