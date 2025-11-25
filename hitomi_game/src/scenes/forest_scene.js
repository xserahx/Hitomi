// === FOREST SCENE ===
function preload_forest(scene) {
  scene.load.image('goody', 'assets/images/goody.jpeg');
  // Carica eventuali risorse future (audio, immagini, ecc.)
}

function create_forest(scene, data) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x0b3d0b);

  // === LUCE / NEBBIA SOFT ===
  //  const overlay = scene.add.rectangle(1000, 300, 2000, 600, 0x00ff00); da cambiare con quello sotto
  const overlay = scene.add.rectangle(1000, 300, 2000, 6000, 0x00ff00);
  overlay.setAlpha(0.05);
  overlay.setBlendMode(Phaser.BlendModes.ADD);


  // === GROUND ===
  const ground = scene.add.rectangle(3200, 2000, 6400, 40, 0x4a3b2a);
  scene.physics.add.existing(ground, true);

  // === PIATTAFORME "TRONCHI" ===
  const platformPositions = [

    // PRIMA CHAMBER
    { x: 320, y: 550 + 1300, w: 200, h: 20 },
    { x: 740, y: 550 + 1300, w: 200, h: 20 },
    { x: 970, y: 420 + 1300, w: 150, h: 20 },
    // { x: 1270, y: 440 + 1300, w: 150, h: 20 },

    // MASSI
    { x: 1600, y: 585 + 1300, w: 150, h: 190 },
    { x: 1732, y: 655 + 1300, w: 100, h: 50 },

    // SCALA
    { x: 2080, y: 550 + 1300, w: 100, h: 20 },
    { x: 2250, y: 440 + 1300, w: 100, h: 20 },

    // BLOCCO A SINISTRA DELLA SCALA
 //   { x: 2050, y: 20 + 1300, w: 300, h: 20 },

    // SECONDA RAMPA DI SCALE no prb
    { x: 2450, y: 20 + 1150, w: 100, h: 20 },
    { x: 2675, y: 0 + 1070, w: 150, h: 20 },
   { x: 3000, y: 0 + 1000, w: 150, h: 20 },  //apice

    // MASSI
    { x: 2890, y: 605 + 1300, w: 200, h: 150 },
 // PIATTAFROME FRA I DUE MASSI
    { x: 3190, y: 450 + 1300, w: 100, h: 20 },

    //PIATTAFROME ADIACENTE ALL'ASCENSORE
    { x: 3500, y: 400 + 1300, w: 100, h: 20 },
//PIATTAFORMA SOPRA L'ASCENSORE
        { x: 3450, y: 200 + 1300, w: 200, h: 20 },

    // SPAZIO PER MOVING PLATFORM

    // MASSI finale
    { x: 3850, y: 643 + 1300, w: 160, h: 75 },
  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === MOVING PLATFORMS ===
  const movingPlatformConfigs = [
    { x: 3600, y: 300 + 1300, w: 100, h: 20, direction: 'y', range: 100, speed: 60 }
  ];
  PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);

  // === PLAYER ===
  const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 100;
  const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
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
    SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    U: Phaser.Input.Keyboard.KeyCodes.U
  });

  // === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player, true);

  scene.cameras.main.setBounds(0, 0, 6400, 2000);
  scene.physics.world.setBounds(0, 0, 6400, 2000);

  // deadzone solo sull’asse Y
  scene.cameras.main.setDeadzone(0, 200);

  // fade
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

  // === UPDATE PIATTAFORME ===
  PP.scene_objects.moving_platform.update(scene, PP.game_state.movingPlatforms);

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
