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
    { x: 250, y: 350, w: 50, h: 400 }, { x: 850, y: 500, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 }, { x: 350, y: 300, w: 150, h: 20 },
    { x: 1280, y: 250, w: 100, h: 620 }, { x: 1600, y: 600, w: 150, h: 20 },
    { x: 1800, y: 500, w: 150, h: 20 }, { x: 2300, y: 400, w: 150, h: 20 },
    { x: 2560, y: 250, w: 100, h: 620 }, { x: 2850, y: 675, w: 150, h: 100 },
    { x: 3100, y: 625, w: 150, h: 250 }, { x: 3600, y: 450, w: 150, h: 20 },
    { x: 3840, y: 250, w: 100, h: 620 }, { x: 4040, y: 250, w: 300, h: 150 },
    { x: 4265, y: 250, w: 150, h: 40 }, { x: 4335, y: 220, w: 40, h: 120 },
    { x: 4335, y: 150, w: 100, h: 20 }, { x: 4300, y: 630, w: 150, h: 100 },
    { x: 4500, y: 470, w: 150, h: 20 }, { x: 4550, y: 130, w: 150, h: 20 },
    { x: 4650, y: 300, w: 150, h: 20 }, { x: 4745, y: 375, w: 40, h: 150 },
    { x: 5250, y: 300, w: 150, h: 100 }, { x: 5650, y: 250, w: 150, h: 100 },
    { x: 6050, y: 200, w: 150, h: 100 }, { x: 6450, y: 300, w: 150, h: 100 },
    { x: 7000, y: 480, w: 150, h: 20 }, { x: 7150, y: 595, w: 150, h: 250 },
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

  let keyCollected = false;
  scene.physics.add.overlap(PP.game_state.player, key, () => {
    if (keyCollected) return;
    keyCollected = true;
    PP.game_state.player.hasKey = "goldenKey";
    key.destroy();
    showAchievement(scene, "Una chiave? Forse potrebbe aprire qualche piccola serratura...");
  });

  // === PORTA BLOCCATA ===
  const door = scene.add.rectangle(2000, 650, 60, 120, 0x8B4513);
  door.setStrokeStyle(4, 0x000000);
  door.setOrigin(0.5, 1);
  scene.physics.add.existing(door, true);

  door.isLocked = true;
  door.keyId = "goldenKey";
  door._opening = false;
  door._opened = false;
  door._msgShownLocked = false;
  door._msgShownUseKey = false;
  door._enteringScene = false;

  scene.physics.add.overlap(PP.game_state.player, door, () => {
    if (door._opening) return;

    // SITUAZIONE PORTA BLOCCATA E GOODY SENZA CHIAVE
    if (door.isLocked && PP.game_state.player.hasKey !== door.keyId) {
      if (!door._msgShownLocked) {
        showFloatingMessage(scene, "La porta è bloccata, mi serve una chiave... Meglio guardare in giro", PP.game_state.player.x, PP.game_state.player.y);
        door._msgShownLocked = true;
      }
      return;
    }

   // SITUAZIONE PORTA BLOCCATA E MADAMA GOODY HA LA CHIAVE
if (door.isLocked && PP.game_state.player.hasKey === door.keyId && !door._opened) {
  if (!door._msgShownUseKey) {
    door._msgShownUseKey = true;
    door._popupActive = false;        // indica se il popup è attivo
    door._delayedQuestionShown = false; // indica se la domanda è stata già mostrata

    function showQuestion() {
      if (door._popupActive) return; // evita sovrapposizioni
      door._popupActive = true;

      const question = scene.add.text(PP.game_state.player.x, PP.game_state.player.y - 80,
        "Vuoi usare la chiave per aprire la porta?",
        { font: "24px Arial", fill: "#ffffff", backgroundColor: "#333333", padding: { x: 8, y: 4 } }
      ).setOrigin(0.5, 1);

      const btnYes = scene.add.text(PP.game_state.player.x - 40, PP.game_state.player.y - 40, "Sì",
        { font: "24px Arial", fill: "#00ff00", backgroundColor: "#000000", padding: { x: 8, y: 4 } }
      ).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

      const btnNo = scene.add.text(PP.game_state.player.x + 40, PP.game_state.player.y - 40, "No",
        { font: "24px Arial", fill: "#ff0000", backgroundColor: "#000000", padding: { x: 8, y: 4 } }
      ).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

      btnYes.on('pointerdown', () => {
        question.destroy();
        btnYes.destroy();
        btnNo.destroy();
        door._popupActive = false;

        door._opening = true;
        openDoor(door, scene, () => {
          door._opening = false;
          door._opened = true;
          door.isLocked = false;

          if (!door._enteringScene) {
            door._enteringScene = true;
            scene.cameras.main.fadeOut(1000, 0, 0, 0);
            scene.time.delayedCall(1000, () => {
              PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
              scene.scene.start('forest_scene', { x: PP.game_state.player.x, y: PP.game_state.player.y });
            });
          }
        });
      });

      btnNo.on('pointerdown', () => {
        question.destroy();
        btnYes.destroy();
        btnNo.destroy();
        door._popupActive = false;
      });
    }

    // MOSTRA LA DOMANDA
    showQuestion();

    // MOSTRA NUOVAMENTE LA DOMANDA DOPO CIRCA 2 SECONDI
    if (!door._delayedQuestionShown) {
      door._delayedQuestionShown = true;
      scene.time.delayedCall(2000, () => {
        const playerNearDoor = Phaser.Math.Distance.Between(
          PP.game_state.player.x, PP.game_state.player.y,
          door.x, door.y
        ) < 150;

        if (playerNearDoor && door.isLocked && !door._opened) {
          showQuestion();
        }
      });
    }
  }
  return;
}
    // PORTA APERTA -> ENTRA NELLA SCENA
    if (!door.isLocked && door._opened) {
      if (door._enteringScene) return;
      door._enteringScene = true;
      scene.cameras.main.fadeOut(1000, 0, 0, 0);
      scene.time.delayedCall(1000, () => {
        PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
        scene.scene.start('forest_scene', { x: PP.game_state.player.x, y: PP.game_state.player.y });
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

// === MESSAGGIO SOPRA IL GIOCATORE ===
function showFloatingMessage(scene, text, x, y) {
  const msg = scene.add.text(x, y - 50, text, { font: "24px Arial", fill: "#ffffff", backgroundColor: "#333333", padding: { x: 8, y: 4 }, align: "center" });
  msg.setOrigin(0.5, 1);
  msg.setAlpha(0);

  scene.tweens.add({
    targets: msg,
    alpha: 1,
    duration: 400,
    onComplete: () => {
      scene.time.delayedCall(2000, () => {
        scene.tweens.add({
          targets: msg,
          alpha: 0,
          duration: 400,
          onComplete: () => msg.destroy()
        });
      });
    }
  });
}

// === ACHIEVEMENT CENTRATO ===
function showAchievement(scene, text) {
  const achievementText = scene.add.text(scene.cameras.main.centerX, 100, text,
    { font: "24px Arial", fill: "#ffffff", backgroundColor: "#333333", padding: { x: 10, y: 5 }, align: "center" });
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

// === APERTURA PORTA ===
function openDoor(door, scene, onComplete) {
  if (door._isTweening) return;
  door._isTweening = true;

  scene.tweens.add({
    targets: door,
    x: door.x + 80,
    duration: 500,
    ease: 'Power2',
    onComplete: () => {
      if (door.body) door.body.enable = false;
      door._isTweening = false;
      if (typeof onComplete === 'function') onComplete();
    }
  });
}

// === CAMBIO MONDO ===
function switchWorld(scene) {
  if (PP.game_state.changingWorld) return;
  PP.game_state.changingWorld = true;

  PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };

  const currentScene = scene.scene.key;
  const nextScene = currentScene.startsWith('ghostly_')
    ? currentScene.replace('ghostly_', '')
    : 'ghostly_' + currentScene;

  scene.cameras.main.fadeOut(500, 0, 0, 0);
  scene.time.delayedCall(500, () => {
    scene.scene.start(nextScene, { x: PP.game_state.player.x, y: PP.game_state.player.y });
    PP.game_state.changingWorld = false;
  });
}

function update_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);
  if (PP.game_state.player) {
    PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
  }
}

function destroy_house(scene) {
  // Pulizia risorse se necessaria
}

// === REGISTRA LA SCENA ===
PP.scenes.add('house_scene', preload_house, create_house, update_house, destroy_house);





