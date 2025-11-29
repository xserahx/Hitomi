// === GHOSTLY HOUSE SCENE ===
function preload_ghostly_house(scene) {
  // Caricamenti opzionali (sprite, audio, ecc.)
}

function create_ghostly_house(scene) {
  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x1a0000);

  // === GROUND ===
   const ground = PP.shapes.rectangle_add(scene, 3840, 895, 7680, 40, "0x000000", 1);
   PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === NEBBIA ROSSA ===
  //const overlay = scene.add.rectangle(640, 360, 1280, 720, 0x660000);
  //overlay.setAlpha(0.25);
  //overlay.setBlendMode(Phaser.BlendModes.ADD);

  // === PLATFORMS ===
  const platformPositions = [
    // ---------------- TUTORIAL ----------------
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 600, y: 400, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 350, y: 300, w: 150, h: 20 },
    { x: 1280, y: 250, w: 100, h: 620 },

    // ---------------- FIRST ROOM ----------------
    { x: 1600, y: 600, w: 150, h: 20 },
    { x: 1800, y: 500, w: 150, h: 20 },
    /*{ x: 2050, y: 300, w: 150, h: 20 },
    { x: 2050, y: 550, w: 150, h: 20 },*/
    { x: 2300, y: 400, w: 150, h: 20 },
    { x: 2560, y: 250, w: 100, h: 620 },

    // ---------------- SECOND ROOM ----------------
    { x: 3100, y: 625, w: 150, h: 250 },
    { x: 3350, y: 350, w: 150, h: 20 },
    { x: 3350, y: 550, w: 150, h: 20 },
    { x: 3600, y: 450, w: 150, h: 20 },
    { x: 3840, y: 250, w: 100, h: 620 },

    // ---------------- EXIT ----------------
    { x: 4040, y: 250, w: 300, h: 150 },
    { x: 4265, y: 250, w: 150, h: 40 },
    { x: 4335, y: 220, w: 40, h: 120 },
    { x: 4335, y: 150, w: 100, h: 20 },

    { x: 4300, y: 630, w: 150, h: 100 },
    { x: 4550, y: 130, w: 150, h: 20 },
    { x: 4650, y: 300, w: 150, h: 20 },
    { x: 4745, y: 375, w: 40, h: 150 },

    { x: 4850, y: 350, w: 150, h: 20 },
    { x: 5250, y: 300, w: 150, h: 100 },
    { x: 5650, y: 250, w: 150, h: 100 },
    { x: 6050, y: 200, w: 150, h: 100 },
    { x: 6450, y: 300, w: 150, h: 100 },

    { x: 7150, y: 595, w: 150, h: 250 },

    { x: 7650, y: 250, w: 100, h: 620 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === MOVING PLATFORMS ===
  //const movingPlatformConfigs = [
  //{ x: 2050, y: 450, w: 150, h: 20, direction: 'y', range: 150, speed: 60 }
  //];
  //PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  //scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);

  // === PLAYER ===
    const startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1200;
    const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

     // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);
    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }
    
    // === CAMERA ===
    /*PP.camera.start_follow(scene, PP.game_state.player, 0, 0);
    scene.cameras.main.startFollow(PP.game_state.player);
    scene.cameras.main.setBounds(0, 0, 1280, 900);
    scene.physics.world.setBounds(0, 0, 1280, 900);
    scene.cameras.main.fadeIn(800, 0, 0, 0);*/

    // === HUD VITE ===
    PP.game_state.playerLivesText = PP.shapes.text_add(scene, 20, 20, "Lives:");

   // === NEMICI ===
    const enemyPositions = [{ x: 400, y: 200, speed: 80 }];
    PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

    for (let enemy of PP.game_state.enemies) {

        // collisioni con terreno e piattaforme
        PP.physics.add_collider(scene, enemy, ground);

        for (let plat of PP.game_state.platforms) {
            PP.physics.add_collider(scene, enemy, plat);
        }

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {
            PP.entities.player.damage(scene, PP.game_state.player);
        });
    }

    // === CAMBIO MONDO ===
    PP.game_state.changingWorld = false;


  // === CHIAVE GHOSTLY ===
//const ghostKey = scene.add.rectangle(1400, 600, 20, 20, 0xff2222);
//scene.physics.add.existing(ghostKey, true);

//let keyCollected = false;
//scene.physics.add.overlap(PP.game_state.player, ghostKey, () => {
    //if (keyCollected) return;
   // keyCollected = true;

    //PP.game_state.player.hasGhostKey = "bloodKey";
    //ghostKey.destroy();

    // Achievement stile ghostly
   // const msg = scene.add.text(scene.cameras.main.centerX, 120,
    //  "Hai raccolto la chiave insanguinata...",
    //  { font: "26px Arial", fill: "#ffcccc", backgroundColor: "#440000", padding: { x:12, y:6 } }
   // ).setOrigin(0.5).setScrollFactor(0);

   // scene.tweens.add({
    //  targets: msg,
    //  alpha: 0,
    //  duration: 400,
     // delay: 2000,
     // onComplete: () => msg.destroy()
    //});
//});

  /*const door = scene.add.rectangle(7650, 700, 60, 120, 0xaa0000);
door.setStrokeStyle(4, 0xff4444);
door.setOrigin(0.5, 1);
scene.physics.add.existing(door, true);

door.isLocked = true;
door.keyId = "bloodKey";
door._opened = false;
door._popupShown = false;
door._pendingAsk = false;

scene.physics.add.overlap(PP.game_state.player, door, () => {

    // --- Porta bloccata senza chiave ---
    if (door.isLocked && PP.game_state.player.hasGhostKey !== door.keyId) {
        if (!door._msgLocked) {
            door._msgLocked = true;

            const warn = scene.add.text(PP.game_state.player.x, PP.game_state.player.y - 60,
              "La porta è bloccata... serve una chiave. Meglio tornare indietro e dare un'occhiata.",
              { font: "22px Arial", fill: "#ffaaaa", backgroundColor: "#550000", padding:{x:8,y:4}}
            ).setOrigin(0.5);

            scene.tweens.add({
              targets: warn,
              alpha: 0,
              duration: 400,
              delay: 2000,
              onComplete: () => warn.destroy()
            });
        }
        return;
    }

// --- Porta bloccata ma ho la chiave (popup Sì/No) ---
if (door.isLocked && PP.game_state.player.hasGhostKey === door.keyId && !door._opened) {

    // se è già visibile o programmato → basta
    if (door._popupShown || door._pendingAsk) return;

    function showDoorPopup() {

        door._popupShown = true;   // popup attivo ORA
        door._pendingAsk = false;  // nessun popup programmato

        const px = PP.game_state.player.x;
        const py = PP.game_state.player.y;

        const question = scene.add.text(px, py - 90, "Usare la Chiave Insanguinata?",
            { font:"26px Arial", fill:"#ffcccc", backgroundColor:"#550000", padding:{x:10,y:6}}
        ).setOrigin(0.5,1);

        const yesBtn = scene.add.text(px - 50, py - 40, "Sì",
            { font:"26px Arial", fill:"#00ff00", backgroundColor:"#000000", padding:{x:8,y:4}}
        ).setOrigin(0.5).setInteractive({useHandCursor:true});

        const noBtn = scene.add.text(px + 50, py - 40, "No",
            { font:"26px Arial", fill:"#ff0000", backgroundColor:"#000000", padding:{x:8,y:4}}
        ).setOrigin(0.5).setInteractive({useHandCursor:true});

        function removePopup() {
            question.destroy();
            yesBtn.destroy();
            noBtn.destroy();
            door._popupShown = false; // popup non più attivo
        }

        // ---- SÌ: apri porta e mai più popup ----
        yesBtn.on("pointerdown", () => {
            removePopup();

            door._opened = true;
            door.isLocked = false;

            scene.tweens.add({
                targets: door,
                x: door.x + 70,
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    scene.cameras.main.fadeOut(800, 0, 0, 0);
                    scene.time.delayedCall(800, () => {
                        const { x, y } = PP.game_state.player;
                        PP.game_state.playerPosition = { x, y };
                        scene.scene.start("ghostly_forest_scene", { x, y });
                    });
                }
            });
        });

        // ---- NO: programma UNA sola ricomparsa ----
        noBtn.on("pointerdown", () => {
            removePopup();

            if (!door._pendingAsk) {
                door._pendingAsk = true; // una sola possibilità

                scene.time.delayedCall(1500, () => {

                    // ricompare solo 1 volta e solo se il player è vicino
                    const dist = Phaser.Math.Distance.Between(
                        PP.game_state.player.x, PP.game_state.player.y,
                        door.x, door.y
                    );

                    if (dist < 150 && door.isLocked && !door._opened && !door._popupShown) {
                        showDoorPopup();
                    } else {
                        door._pendingAsk = false; // annulla richiesta
                    }

                });
            }
        });
    }

    // mostra subito il popup
    showDoorPopup();
    return;
}

    // --- Porta già aperta → cambia scena ---
    if (!door.isLocked && door._opened) {

        scene.cameras.main.fadeOut(800, 0, 0, 0);
        scene.time.delayedCall(800, () => {
            const { x, y } = PP.game_state.player;
            PP.game_state.playerPosition = { x, y };
            scene.scene.start("ghostly_forest_scene", { x, y });
        });
    }

});
*/

   // === CAMBIO MONDO ===
    PP.game_state.changingWorld = false;
    //scene.input.keyboard.on("keydown-U", () => switchWorld(scene));
    //scene.input.keyboard.on("keydown-u", () => switchWorld(scene));
//}


// === CAMBIO MONDO ===
//function switchWorld(scene) {
    //if (PP.game_state.changingWorld) return;

    //PP.game_state.changingWorld = true;
    //PP.game_state.playerPosition = {
       // x: PP.game_state.player.x,
      //  y: PP.game_state.player.y
    //};

    //const current = scene.scene.key;
    //const next = current.startsWith("ghostly_")
       // ? current.replace("ghostly_", "")
      //  : "ghostly_" + current;

    //scene.cameras.main.fadeOut(500);

    //scene.time.delayedCall(500, () => {
       // scene.scene.start(next, PP.game_state.playerPosition);
     //   PP.game_state.changingWorld = false;
   // });
}

// === UPDATE ===
function update_ghostly_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player);
  PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: PP.game_state.player.x,
       y: PP.game_state.player.y
        };
    }
}


// === DESTROY ===
function destroy_ghostly_house(scene) {}

PP.scenes.add('ghostly_house_scene', preload_ghostly_house, create_ghostly_house, update_ghostly_house, destroy_ghostly_house);