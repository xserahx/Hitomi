//=====PALLEEEEEEEE=======



// === GHOSTLY FOREST SCENE ===
function preload_ghostly_forest(scene) {
  scene.load.image('goody', 'assets/images/goody.jpeg');
  // Carica eventuali risorse future (audio, immagini, ecc.)
}

function create_ghostly_forest(scene, data) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x110000); // rosso scuro quasi nero

  // === NEBBIA ROSSA ===
  const overlay = scene.add.rectangle(1000, 300, 2000, 600, 0xff0000);
  overlay.setAlpha(0.2);
  overlay.setBlendMode(Phaser.BlendModes.ADD);


  // === GROUND ===
  const ground = scene.add.rectangle(3200, 1000, 6400, 40, 0x4a3b2a);
  scene.physics.add.existing(ground, true);

  // === PIATTAFORME "TRONCHI" ===
// === PIATTAFORME "TRONCHI" ===
const platformPositions = [

  // PRIMA CHAMBER
  { x: 300,  y: 570 + 300, w: 200, h: 20 },
  { x: 720,  y: 570 + 300, w: 200, h: 20 },
  { x: 950,  y: 440 + 300, w: 150, h: 20 },
  { x: 1250, y: 440 + 300, w: 150, h: 20 },

  // MASSI
  { x: 1600, y: 585 + 300, w: 150, h: 190 },
  { x: 1732, y: 655 + 300, w: 100, h: 50 },

  // SCALA
  // { x: 2080, y: 570 + 300, w: 100, h: 20 },
  { x: 2250, y: 450 + 300, w: 100, h: 20 },

  // BLOCCO A SINISTRA DELLA SCALA
  { x: 2150, y: 210 + 300, w: 300, h: 20 },

  // PIATTAFROME SOPRA AI MASSI
  { x: 2450, y: 120 + 300, w: 100, h: 20 },
  { x: 2675, y: 170 + 300, w: 150, h: 20 },

  { x: 2725, y: 642 + 300, w: 100, h: 76 },

  // MASSI
  { x: 2890, y: 605 + 300, w: 200, h: 150 },

  // piattafrome da cui poi si plana, questo è il locco superiore
  // aggiungere y: -300 per farli arrivare all'altezza corretta
  // { x: 300, y: 450 + 300, w: 200, h: 20 },
  // { x: 620, y: 550 + 300, w: 200, h: 20 },
  // { x: 950, y: 510 + 300, w: 200, h: 20 },
  // { x: 1300, y: 470 + 300, w: 200, h: 20 },
  // { x: 1600, y: 550 + 300, w: 300, h: 20 },

  // MASSI
  { x: 3450, y: 643 + 300, w: 160, h: 75 },

  // PIATTAFROME SOPRAELEVATE
  { x: 3000, y: 220 + 300, w: 100, h: 20 },
  { x: 3200, y: 245 + 300, w: 100, h: 20 },
  { x: 3500, y: 200 + 300, w: 150, h: 20 },

  // PIATTAFROMA FINALE
  { x: 3750, y: 130 + 300, w: 150, h: 20 },

];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // HELL
  // === MOVING PLATFORMS ===
  const movingPlatformConfigs = [
    { x: 2400, y: 630, w: 100, h: 20, direction: 'y', range: 105, speed: 60 }
  ];
  PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);

  // === PLAYER ===
  const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 100;
  const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  PP.game_state.player.fillColor = 0xff3300; // arancio rossastro cupo

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
  
  scene.cameras.main.setBounds(0, 0, 6400, 1000);
  scene.physics.world.setBounds(0, 0, 6400, 1000);

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

function update_ghostly_forest(scene) {
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

function destroy_ghostly_forest(scene) {
  // Pulizia risorse se necessaria
}

// === REGISTRA LA SCENA ===
PP.scenes.add('ghostly_forest_scene', preload_ghostly_forest, create_ghostly_forest, update_ghostly_forest, destroy_ghostly_forest);