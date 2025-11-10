// === GHOSTLY TUTORIAL SCENE ===
function preload_ghostly_tutorial(scene) {
  // Caricamenti opzionali (audio, sprite, ecc.)
}

function create_ghostly_tutorial(scene, data) {

  // === SFONDO ROSSO SCURO ===
  scene.cameras.main.setBackgroundColor(0x1a0000);

  // === GROUND ===
  const ground = scene.add.rectangle(640, 700, 1280, 40, 0x220000);
  scene.physics.add.existing(ground, true);

  // === NEBBIA ROSSA ===
  const overlay = scene.add.rectangle(640, 360, 1280, 720, 0x660000);
  overlay.setAlpha(0.2);
  overlay.setBlendMode(Phaser.BlendModes.ADD);

  // === PULSANTE START ===
  const playButton = scene.add.text(400, 400, 'Inizia Gioco', { fontSize: 24, color: '#ff4444' })
    .setOrigin(0.5)
    .setInteractive();

  playButton.on('pointerdown', () => {
    scene.scene.start('ghostly_house_scene', {
      x: PP.game_state.player.x,
      y: PP.game_state.player.y
    });
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

  // === PLAYER ===
  const startX = (data && data.x) || (PP.game_state.playerPosition?.x ?? 1200);
  const startY = (data && data.y) || (PP.game_state.playerPosition?.y ?? 500);

  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  PP.game_state.player.fillColor = 0xff2222; // rosso pallido
  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);

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
  //scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 2000, 800);
  scene.physics.world.setBounds(0, 0, 2000, 800);

  // === FADE IN ===
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

  // 🔥 Salva posizione globale del giocatore
  PP.game_state.playerPosition = {
    x: PP.game_state.player.x,
    y: PP.game_state.player.y
  };

  const currentScene = scene.scene.key;
  const nextScene = currentScene.startsWith('ghostly_')
    ? currentScene.replace('ghostly_', '')
    : 'ghostly_' + currentScene;

  // === Transizione semplice fade-out / fade-in ===
  scene.cameras.main.fadeOut(500, 0, 0, 0);
  scene.time.delayedCall(500, () => {
    const { x, y } = PP.game_state.playerPosition;
    scene.scene.start(nextScene, { x, y });
    PP.game_state.changingWorld = false;
  });
}

function update_ghostly_tutorial(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

  // Aggiorna posizione globale continuamente
  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: PP.game_state.player.x,
      y: PP.game_state.player.y
    };
  }
}

function destroy_ghostly_tutorial(scene) {
  // Pulizia risorse se necessario
}

// === REGISTRA LA SCENA ===
PP.scenes.add('ghostly_tutorial_scene',preload_ghostly_tutorial,create_ghostly_tutorial,update_ghostly_tutorial,destroy_ghostly_tutorial);

