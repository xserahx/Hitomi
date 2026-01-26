// === ghostly_house SCENE ===
let ghostly_house_bg;
let textOn = false;

function preload_ghostly_house(scene) {
  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
  PP.entities.enemy.preload(scene);
  PP.scene_objects.key.preload(scene);
  ghostly_house_bg = PP.assets.image.load(scene, "assets/images/house/ghostly_house_background.png", 7680, 920);
  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);

}

function create_ghostly_house(scene, data) {
  PP.assets.tilesprite.add(scene, ghostly_house_bg, -20, -30, 7680, 920, 0, 0);
  PP.game_state.otherWorld = "house_scene";

  // === PULSANTE HELP ===
  const helpButton = PP.shapes.text_add(scene, 1220, 35, "?");
  helpButton.tile_geometry.scroll_factor_x = 0;
  helpButton.tile_geometry.scroll_factor_y = 0;

  // lo rendo cliccabile
  PP.interactive.mouse.add(helpButton, "pointerdown", () => {
    showControlsPopup(scene);
  });

  const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 7640, 380, 40, 720, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3830, 870, 7700, 10, "0x000000", 0);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME ===
  const platformPositions = [

    //======TUTORIAL======
    { x: 820, y: 675, w: 150, h: 40, sprite_name: "piattaforma" },  // piattaforma iniziale
    { x: 610, y: 600, w: 150, h: 40, sprite_name: "piattaforma" },  // piattaforma iniziale
    { x: 1030, y: 767, w: 110, h: 90, sprite_name: "rialzino" }, // muretto
    { x: 378, y: 465, w: 40, h: 395, sprite_name: "palo" },  // colonna di sinistra
    { x: 400, y: 550, w: 150, h: 20, sprite_name: "basetta_1" }, // base del nemico
    { x: 205, y: 640, w: 150, h: 20, sprite_name: "basetta_2" }, // base sopra culla
    // /DA FLIPPARE
    { x: 100, y: 797, w: 100, h: 60, sprite_name: "culla" },   // culla del bimbo

    //=======CASA======

    //    { x: 1470, y: 774, w: 110, h: 90, sprite_name: "rialzino" }, //rialzino
    //    { x: 1870, y: 625, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2270, y: 728, w: 87, h: 130, sprite_name: "vaso" },

    //=======PIATTAFORME PER LA PRIMA CHIAVE=========

    { x: 1590, y: 700, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 1865, y: 610, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2065, y: 520, w: 150, h: 42, sprite_name: "piattaforma" }, // DA METTERE SOLO NEL MONDO SPETTRALE
    { x: 2490, y: 435, w: 150, h: 42, sprite_name: "piattaforma" },

    { x: 2840, y: -169, w: 100, h: 900, sprite_name: "piattaforma" }, //MURO CON PORTA SOTTO

    //=======PIATTAFORME PER LA SECONDA CHIAVE=========
    { x: 3240, y: 740, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3490, y: 600, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3490, y: 300, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 4180, y: 450, w: 150, h: 42, sprite_name: "piattaforma" },// standard

    { x: 4430, y: 300, w: 150, h: 42, sprite_name: "piattaforma" },// standard                RIMANE
    { x: 4430, y: 300, w: 150, h: 42, sprite_name: "piattaforma" }, // penultima piattaforma  RIMANE
    { x: 5200, y: 425, w: 100, h: 300, sprite_name: "piattaforma" },  // Terzo muro

    // === ARZIGOGOLO COSTRUITO ADDOSSO ALLA PARETE (VEDI MARCELLO) ===

    { x: 5860, y: 774, w: 150, h: 93, sprite_name: "rialzino" }, //Non ho capito che sprite andrebbe messo, chiedere a Marcello (SOLO MONDO REALE)
    { x: 5300, y: 425, w: 500, h: 42, sprite_name: "piattaforma" }, //Piattaforma larga attaccata al muro
    { x: 5758, y: 325, w: 42, h: 100, sprite_name: "piattaforma" }, //Parete verticale del coso
    { x: 5708, y: 285, w: 150, h: 42, sprite_name: "piattaforma" }, // Parete orizzontale alla fine di quella verticale
    { x: 5908, y: 437, w: 150, h: 42, sprite_name: "piattaforma" }, // Piattaforma per salire sull'accrocchio (SOLO MONDO SPETTRALE)

    // { x: 6058, y: 155, w: 150, h: 42, sprite_name: "piattaforma" }, // Piattaforma orizzontale a angolo retto dopo l'accrocchio
    { x: 6058, y: 612, w: 150, h: 42, sprite_name: "piattaforma" }, //Piattaforma per salire sull'accrocchio

    //=== PIATTAFORME GROSSE PER LA FINE DEL LIVELLO ===
    { x: 6400, y: 340, w: 150, h: 42, sprite_name: "piattaforma" },
    // { x: 6700, y: 220, w: 250, h: 42, sprite_name: "piattaforma" },
    { x: 7100, y: 340, w: 150, h: 42, sprite_name: "piattaforma" },

    // === VASI SOTTO ALLE PIATTAFORME GRANDI PER FERMARE I NEMICI ===
    { x: 6380, y: 737, w: 87, h: 130, sprite_name: "vaso" },
    { x: 7120, y: 737, w: 87, h: 130, sprite_name: "vaso" },

    { x: 7645, y: -171, w: 100, h: 900, sprite_name: "piattaforma" } //ULTIMO MURO CON PORTA SOTTO
  ];

  // === PIATTAFORME NEL MONDO SPETTRALE ===
  const ghostlyPlatformPositions = [
    { x: 3240, y: 450, w: 150, h: 42, sprite_name: "nuvoletta_1" },
    { x: 3730, y: 450, w: 150, h: 42, sprite_name: "nuvoletta_1" },
    { x: 4830, y: 450, w: 150, h: 42, sprite_name: "nuvoletta_1" },
    { x: 6700, y: 220, w: 250, h: 42, sprite_name: "nuvoletta_1" },
    { x: 6058, y: 155, w: 150, h: 42, sprite_name: "nuvoletta_1" }
  ];

  PP.game_state.ghostlyPlatforms = PP.scene_objects.platform.create(scene, ghostlyPlatformPositions);

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);


  // === PLAYER ===
  let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 150;
  let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

  PP.game_state.player = PP.entities.player.create(scene, startX, startY);

  // === COLLIDER PLAYER ===
  PP.physics.add_collider(scene, PP.game_state.player, ground);
  PP.physics.add_collider(scene, PP.game_state.player, leftWall);
  PP.physics.add_collider(scene, PP.game_state.player, rightWall);
  for (let plat of PP.game_state.platforms) {
    PP.physics.add_collider(scene, PP.game_state.player, plat);
  }

  //Check se sta cambiando mondo
  if (PP.game_state.changingWorld) {
    PP.game_state.player.geometry.x = config.player_x;
    PP.game_state.player.geometry.y = config.player_y;
  }

  // === HUD VITE (CUORI) ===
  PP.game_state.hearts = [];

  for (let i = 0; i < PP.game_state.player.maxLives; i++) {
    let x = 60 + (i * 80);
    let heart = PP.assets.sprite.add(scene, PP.game_state.lives, x, 50, 0.5, 0.5);
    PP.assets.sprite.animation_add(heart, "Cuore", 0, 8, 8, 1);
    heart.tile_geometry.scroll_factor_x = 0;
    heart.tile_geometry.scroll_factor_y = 0;
    PP.game_state.hearts.push(heart);
  }


  // === NEMICI ===
  const enemyPositions = [
    { x: 1730, y: 840, w: 75, h: 75, speed: 80, sprite_name: "lanterna" },
    { x: 2040, y: 830, w: 50, h: 70, speed: 80, sprite_name: "ombrello" },
    { x: 4380, y: 840, w: 75, h: 75, speed: 100, sprite_name: "bambino" },
    { x: 4380, y: 840, w: 75, h: 75, speed: 70, sprite_name: "slug" },
    { x: 5500, y: 840, w: 150, h: 150, speed: 80, sprite_name: "pterodatillo" },
    { x: 6025, y: 840, w: 75, h: 75, speed: 80, sprite_name: "lanterna" },
    { x: 6800, y: 840, w: 75, h: 75, speed: 100, sprite_name: "bambino" },
    { x: 6900, y: 840, w: 80, h: 80, speed: 80, sprite_name: "ciabatta" },
    { x: 7030, y: 840, w: 75, h: 75, speed: 80, sprite_name: "ombrello" },
    { x: 7980, y: 840, w: 170, h: 170, speed: 70, sprite_name: "slug" }
  ];
  PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

  for (let enemy of PP.game_state.enemies) {

    // collisioni con terreno e piattaforme
    PP.physics.add_collider(scene, enemy, ground);

    for (let plat of PP.game_state.platforms) {
      PP.physics.add_collider(scene, enemy, plat);
    }
    // Overlap player-nemico
    PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {
      if (!(PP.game_state.player.lives <= 0) && !PP.game_state.player.isInvincible) {

        // HUD DANNO
        let currentIndex = PP.game_state.player.lives - 1;
        PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
      }
      PP.entities.player.damage(scene, PP.game_state.player, enemy);
    });
  }

  // ==== ESPERIMENTO CHIAVI ====
  const keys =
    [
      { x: 2470, y: 358, collected: false, id: 1, sprite_name: "chiave" },
      { x: 3740, y: 785, collected: false, id: 2, sprite_name: "chiave" },
      { x: 5880, y: 710, collected: false, id: 3, sprite_name: "chiave" }
    ];

  PP.game_state.keys = PP.scene_objects.key.create(scene, keys);

  const doors =
    [
      { x: 2765, y: 726, sprite_name: "door", collected: false, id: 1 },
      { x: 5125, y: 726, sprite_name: "door", collected: false, id: 2 },
      { x: 7570, y: 726, sprite_name: "door", collected: false, id: 3 }
    ];

  PP.game_state.doors = PP.scene_objects.key.create(scene, doors);

  for (let i = 0; i < 3; i++) {
    if (PP.game_state.doorsOpened[i] == true) {
      PP.assets.destroy(PP.game_state.doors[i]);
    }
    if (PP.game_state.houseKeyCollected[i] == true) {
      PP.assets.destroy(PP.game_state.keys[i]);
    }
  }

  for (let key of PP.game_state.keys) {
    PP.physics.add_overlap_f(scene, PP.game_state.player, key, collectKey);
  }

  for (let door of PP.game_state.doors) {
    PP.physics.add_collider_f(scene, PP.game_state.player, door, doorDialogue);
  }

  // === CLICK DEL MOUSE PER ATTACCARE ===
  scene.input.on("pointerdown", () => {
    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
  });

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
  const worldHeight = ground.geometry.body_y + 15;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

  // === CAMBIO MONDO ===
  PP.game_state.changingWorld = false;
}

// === UPDATE ===
function update_ghostly_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player);
  PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

  // === SE DEV MODE ATTIVA NON SERVONO CHIAVI ===
  if (PP.game_state.DevMode == true) {
    PP.game_state.houseKeyCollected = [true, true, true];
  }

  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: config.player_x,
      y: config.player_y
    };
  }
  // === CAMBIO MONDO ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
    PP.entities.player.changeWorld(scene);
  }

  // === FINE LIVELLO ===
  if (PP.game_state.player.geometry.x >= 7635) {

    PP.game_state.playerPosition.x = 30;
    PP.game_state.playerPosition.y = 800;
    PP.scenes.start("ghostly_forest_scene");
  }

}

// === DESTROY ===
function destroy_ghostly_house(scene) { }

PP.scenes.add('ghostly_house_scene', preload_ghostly_house, create_ghostly_house, update_ghostly_house, destroy_ghostly_house);

// === FUNZIONE POP UP CONTROLLI ===
function showControlsPopup(scene) {
  PP.game_state.pause = true;
  const popupLayer = PP.layers.create(scene);
  PP.layers.set_z_index(popupLayer, 100);

  // sfondo scuro
  const bg = PP.shapes.rectangle_add(scene, 3830, 460, 7700, 920, "0x000000", 0.8);

  // testo controlli
  const text = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 300, 600,
    "COMANDI DEL PLATFORM\n\n" +
    "A/D oppure ← / → : Muovi il personaggio\n" +
    "SPAZIO : Salta\n" +
    "SHIFT : Scatto \n" +
    "CLICK SINISTRO DEL MOUSE : Attacca\n" +
    "U : Cambia mondo\n"
  );

  // bottone per chiudere il pop up dei comandi
  const closeBtn = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 220, 740, "CHIUDI");

  //modifico le posizioni per evitaare che escano dallo schermo
  if (PP.game_state.player.geometry.x < 1280) {
    text.geometry.x = 400;
    closeBtn.geometry.x = 520;
  } else if (PP.game_state.player.geometry.x > 6400) {
    text.geometry.x = 6860;
    closeBtn.geometry.x = 6980;
  }

  // aggiungo tutto al layer
  PP.layers.add_to_layer(popupLayer, bg);
  PP.layers.add_to_layer(popupLayer, text);
  PP.layers.add_to_layer(popupLayer, closeBtn);

  // click su chiudi
  PP.interactive.mouse.add(closeBtn, "pointerdown", () => {
    PP.assets.destroy(bg);
    PP.assets.destroy(text);
    PP.assets.destroy(closeBtn);
    PP.game_state.pause = false;
  });
}

// === RACCOLTA CHIAVE ===
function collectKey(scene, player, key) {
  if (key.collected == true) {
    console.log("Chiave già raccolta!");
    return;
  }
  PP.game_state.houseKeyCollected[key.id - 1] = true;
  PP.game_state.statusKey = PP.shapes.text_add(scene, player.geometry.x - 150, 250, "Una chiave? Forse potrebbe aprire qualche piccola serratura...");
  PP.assets.destroy(key);

  PP.timers.add_timer(scene, 2000, (s) => {
    PP.assets.destroy(PP.game_state.statusKey);
  }, false);
  console.log("E ora? " + PP.game_state.houseKeyCollected[key.id - 1]);
}

// === FUNZIONE APERTURE PORTA ===
function doorDialogue(scene, player, door) {
  if (PP.game_state.houseKeyCollected[door.id - 1] == false) {
    let avvisoPorta = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 150, 300, "La porta è chiusa a chiave...");

    PP.timers.add_timer(scene, 300, (s) => {
      PP.assets.destroy(avvisoPorta);
    }, false);

    return;
  }

  if (textOn == true) {
    return;
  }

  let avvisoPorta = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 150, 300, "Vuoi usare la chiave per aprire la porta?");

  PP.timers.add_timer(scene, 2000, (s) => {
    PP.assets.destroy(avvisoPorta);
  }, false);

  let button_si = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 250, 400, "Si");
  let button_no = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 50, 400, "No");
  textOn = true;

  PP.timers.add_timer(scene, 2000, (s) => {
    PP.assets.destroy(button_no);
    PP.assets.destroy(button_si);
    textOn = false;
  }, false);

  PP.interactive.mouse.add(button_si, "pointerdown", () => {
    PP.assets.destroy(door);
    PP.game_state.doorsOpened[door.id - 1] = true;
    PP.assets.destroy(button_no);
    PP.assets.destroy(button_si);
    PP.assets.destroy(avvisoPorta);
    textOn = false;
  });
  PP.interactive.mouse.add(button_no, "pointerdown", () => {
    PP.assets.destroy(button_no);
    PP.assets.destroy(button_si);
    PP.assets.destroy(avvisoPorta);
  });
}