PP.scenes.add(
  'forest_scene',

  function preload(scene) {
    // Carica eventuali risorse in futuro (suoni, immagini, ecc.)
    // === AUDIO AMBIENTALE ===
    // Suoni tipici di una foresta che si possono aggiungere per dare maggior atmosfera
    //scene.load.audio('forest_ambience', 'assets/audio/forest_ambience.mp4');
  },

  function create(scene) {
    // === SFONDO (verde scuro per atmosfera) ===
    scene.cameras.main.setBackgroundColor(0x0b3d0b); // verde scuro “foresta”

    // === LUCE / NEBBIA SOFT ===
    const overlay = scene.add.rectangle(1000, 300, 2000, 600, 0x00ff00)
      .setAlpha(0.05); // leggerissimo bagliore verde
    overlay.setBlendMode(Phaser.BlendModes.ADD);

    // === TERRA ===
    const groundY = 580;
    const ground = scene.add.rectangle(400, groundY, 10000, 40, 0x4a3b2a); // marrone terra
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
    PP.game_state.player = PP.entities.player.create(scene, 100, 500);
    scene.physics.add.collider(PP.game_state.player, ground);
    scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);

    // === INPUT ===
    PP.interactive.kb.keys = scene.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
      RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });

    // === CAMERA ===
    scene.cameras.main.startFollow(PP.game_state.player);
    scene.cameras.main.setBounds(0, 0, 2000, 600);
    scene.physics.world.setBounds(0, 0, 2000, 600);

    // === EFFETTO VISIVO DI INGRESSO (fade in) ===
    scene.cameras.main.fadeIn(1000, 0, 0, 0);
  },

  function update(scene) {
    // Aggiorna movimento giocatore
    PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);
  },

  function destroy(scene) {
    // Pulizia risorse se necessaria
  }
);

