function preload_forest(s) {
    // Carica eventuali risorse future (audio, immagini, ecc.)
}

function create_forest(s) {
    // === SFONDO ===
    s.cameras.main.setBackgroundColor(0x0b3d0b);

    // === LUCE / NEBBIA SOFT ===
    let overlay = s.add.rectangle(1000, 300, 2000, 600, 0x00ff00);
    overlay.setAlpha(0.05);
    overlay.setBlendMode(Phaser.BlendModes.ADD);

    // === TERRA ===
    const ground = s.add.rectangle(1000, 580, 10000, 40, 0x4a3b2a);
    s.physics.add.existing(ground, true); // STATIC

    // === PIATTAFORME "TRONCHI" ===
    const platformPositions = [
        { x: 300, y: 450, w: 200, h: 20 },
        { x: 700, y: 380, w: 180, h: 20 },
        { x: 1100, y: 320, w: 150, h: 20 },
        { x: 1500, y: 500, w: 220, h: 20 },
        { x: 1800, y: 400, w: 180, h: 20 }
    ];
    PP.game_state.platforms = PP.scene_objects.platform.create(s, platformPositions);

    // === PLAYER ===
    PP.game_state.player = PP.entities.player.create(s, 100, 500);
    s.physics.add.collider(PP.game_state.player, ground);
    s.physics.add.collider(PP.game_state.player, PP.game_state.platforms);

    // === INPUT ===
    PP.interactive.kb.keys = s.input.keyboard.addKeys({
        A: Phaser.Input.Keyboard.KeyCodes.A,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
        LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    // === CAMERA ===
    s.cameras.main.startFollow(PP.game_state.player);
    s.cameras.main.setBounds(0, 0, 2000, 600);
    s.physics.world.setBounds(0, 0, 2000, 600);

    // === FADE IN ===
    s.cameras.main.fadeIn(1000, 0, 0, 0);
}

function update_forest(s) {
    PP.entities.player.update(s, PP.game_state.player, PP.interactive.kb.keys);
}

function destroy_forest(s) {
    // Pulizia risorse se necessaria
}

// === AGGIUNGI LA SCENA ===
PP.scenes.add('forest_scene', preload_forest, create_forest, update_forest, destroy_forest);
