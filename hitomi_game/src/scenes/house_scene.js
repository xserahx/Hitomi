// === HOUSE SCENE ===
function preload_house(scene) {
  // Caricamenti opzionali di sprite o audio
}

function create_house(scene, data) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x202020);

  // === GROUND ===
  const ground = scene.add.rectangle(3840, 700, 7680, 40, 0x000000);
  scene.physics.add.existing(ground, true);

  // === PLATFORMS ===
  const platformPositions = [
    // ---------------- TUTORIAL ----------------
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 350, y: 300, w: 150, h: 20 },
    { x: 1280, y: 250, w: 100, h: 620 },

    // ---------------- FIRST ROOM ----------------
    { x: 1600, y: 600, w: 150, h: 20 },
    { x: 1800, y: 500, w: 150, h: 20 },
    { x: 2300, y: 400, w: 150, h: 20 },
    { x: 2560, y: 250, w: 100, h: 620 },

    // ---------------- SECOND ROOM ----------------
    { x: 2850, y: 675, w: 150, h: 100 },
    { x: 3100, y: 625, w: 150, h: 250 },
    { x: 3600, y: 450, w: 150, h: 20 },
    { x: 3840, y: 250, w: 100, h: 620 },

    // ---------------- EXIT ROOM ----------------
    { x: 7650, y: 250, w: 100, h: 620 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PLAYER ===
  const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 200;
  const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
  PP.game_state.player = PP.entities.player.create(scene, startX, startY);

  scene.physics.add.collider(PP.game_state.player, ground);
  scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);

  // === CAMERA ===
  scene.cameras.main.startFollow(PP.game_state.player);
  scene.cameras.main.setBounds(0, 0, 7680, 700);
  scene.physics.world.setBounds(0, 0, 7680, 700);
  scene.cameras.main.fadeIn(800, 0, 0, 0);

  // === CHIAVE ===
  const key = scene.add.rectangle(500, 600, 20, 20, 0xFFFF00);
  scene.physics.add.existing(key, true);

  scene.physics.add.overlap(PP.game_state.player, key, () => {
    PP.game_state.player.hasKey = "goldenKey";
    key.destroy();
    showAchievement(scene, "Madama Goody ha raccolto la chiave!");
  });

  // === PORTA BLOCCATA ===
  const door = scene.add.rectangle(2000, 650, 60, 120, 0x8B4513);
  door.setStrokeStyle(4, 0x000000);
  door.setOrigin(0.5, 1);
  scene.physics.add.existing(door, true);

  door.isLocked = true;
  door.keyId = "goldenKey";

  scene.physics.add.overlap(PP.game_state.player, door, () => {
    if (door.isLocked && PP.game_state.player.hasKey === door.keyId) {
      door.isLocked = false;
      openDoor(door, scene);
    } else if (!door.isLocked) {
      scene.cameras.main.fadeOut(1000, 0, 0, 0);
      scene.time.delayedCall(1000, () => {
        const { x, y } = PP.game_state.player;
        PP.game_state.playerPosition = { x, y };
        scene.scene.start('forest_scene', { x, y });
      });
    }
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

// === FUNZIONE ACHIEVEMENT ===
function showAchievement(scene, text) {
  const achievementText = scene.add.text(
    scene.cameras.main.centerX, 100,
    text,
    { font: "28px Arial", fill: "#ffffff", backgroundColor: "#333333", padding: { x: 10, y: 5 }, align: "center" }
  );
  achievementText.setOrigin(0.5, 0.5);
  achievementText.setAlpha(0);

  scene.tweens.add({
    targets: achievementText,
    alpha: 1,
    duration: 400,
    onComplete: () => {
      scene.time.delayedCall(2000, () => {
        scene.tweens.add({
          targets: achievementText,
          alpha: 0,
          duration: 400,
          onComplete: () => achievementText.destroy()
        });
      });
    }
  });
}

// === FUNZIONE APERTURA PORTA (SCORRIMENTO LATERALE) ===
function openDoor(door, scene) {
  scene.tweens.add({
    targets: door,
    x: door.x + 80,  // verso destra
    duration: 500,
    ease: 'Power2',
    onComplete: () => {
      door.body.enable = false;
    }
  });
}

// === CAMBIO MONDO ===
function switchWorld(scene) {
  if (PP.game_state.changingWorld) return;
  PP.game_state.changingWorld = true;

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





