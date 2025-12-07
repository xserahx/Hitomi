// === ghostly_forest SCENE ===
function preload_ghostly_forest(scene) {
  PP.entities.player.preload(scene);

  // Carica eventuali risorse future (audio, immagini, ecc.)
}

function create_ghostly_forest(scene, data) {
  // Setta la scena del mondo spettrale
    PP.game_state.otherWorld = "forest_scene";

    const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 7780, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x0b3d0b);

  // === LUCE / NEBBIA SOFT ===
 //  const overlay = scene.add.rectangle(1000, 300, 2000, 600, 0x00ff00); da cambiare con quello sotto
 // const overlay = scene.add.rectangle(1000, 300, 2000, 6000, 0x00ff00);
 // overlay.setAlpha(0.05);
 // overlay.setBlendMode(Phaser.BlendModes.ADD);

// == NEVE ==

// === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 3200, 2000, 6400, 40, "0x4a3b2a", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME "TRONCHI" ===
  const platformPositions = [

    // -- PRIMA CHAMBER --
    { x: 320, y: 1850, w: 200, h: 20  },
    { x: 740, y: 1850, w: 200, h: 20  },
    { x: 970, y: 1720, w: 150, h: 20  },
    // { x: 1270, y: 1740, w: 150, h: 20 },

    // MASSI
    { x: 1600, y: 1885, w: 150, h: 190},
    { x: 1732, y: 1955, w: 100, h: 50 },

    // SCALA
    { x: 2080, y: 1850, w: 100, h: 20 },
    { x: 2250, y: 1740, w: 100, h: 20 },

    // BLOCCO A SINISTRA DELLA SCALA
   //   { x: 2050, y: 20 + 1300, w: 300, h: 20 },

    // SECONDA RAMPA DI SCALE 
    { x: 2450, y: 1150, w: 100, h: 20 },
    { x: 2675, y: 1070, w: 150, h: 20 },
    { x: 3000, y: 1000, w: 150, h: 20 },  // apice

    // MASSI
    { x: 2890, y: 1905, w: 200, h: 150},

    // PIATTAFROME FRA I DUE MASSI
    { x: 3190, y: 1750, w: 100, h: 20 },

    //PIATTAFROME ADIACENTE ALL'ASCENSORE
    { x: 3500, y: 1700, w: 100, h: 20 },

    //PIATTAFORMA SOPRA L'ASCENSORE
    { x: 3450, y: 1500, w: 200, h: 20 },

    // SPAZIO PER MOVING PLATFORM

    // MASSI finale
    { x: 3850, y: 1943, w: 160, h: 75 },
  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === MOVING PLATFORMS ===
  //const movingPlatformConfigs = [
  //  { x: 3600, y: 1600, w: 100, h: 20, direction: 'y', range: 100, speed: 60 }
  //];
  //PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs);
  //scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms);

   // === PLAYER ===
    let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 150;
  let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    //Check se sta cambaindo mondo
    if(PP.game_state.changingWorld){
        startX = config.player_x;
        startY = config.player_y;
    }

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

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
            PP.entities.player.damage(scene, PP.game_state.player,enemy);
        });
    }

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
  const worldHeight = ground.geometry.body_y + 40;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

  // === CAMBIO MONDO (U / u) ===
  PP.game_state.changingWorld = false;
  //scene.input.keyboard.on('keydown-U', () => switchWorld(scene));
  //scene.input.keyboard.on('keydown-u', () => switchWorld(scene));
//}

// === FUNZIONE CAMBIO MONDO ===
//function switchWorld(scene) {
  //if (PP.game_state.changingWorld) return;
  PP.game_state.changingWorld = true;

  // Salva posizione globale
  //PP.game_state.playerPosition = {
  //  x: PP.game_state.player.x,
  //  y: PP.game_state.player.y
  //};

  //const currentScene = scene.scene.key;
  //const nextScene = currentScene.startsWith('ghostly_')
   // ? currentScene.replace('ghostly_', '')
   // : 'ghostly_' + currentScene;

  //scene.cameras.main.fadeOut(500, 0, 0, 0);
  //scene.time.delayedCall(500, () => {
   // const { x, y } = PP.game_state.playerPosition;
   // scene.scene.start(nextScene, { x, y });
   // PP.game_state.changingWorld = false;
  //});
}

function update_ghostly_forest(scene) {
  PP.entities.player.update(scene, PP.game_state.player);
  PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

  // === CAMBIO MONDO ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
        console.log("Changing world");
        PP.entities.player.changeWorld(scene);
    }

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

// === AGGIUNGI LA SCENA ===
PP.scenes.add('ghostly_forest_scene', preload_ghostly_forest, create_ghostly_forest, update_ghostly_forest, destroy_ghostly_forest);




