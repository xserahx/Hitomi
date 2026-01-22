// === HOUSE SCENE ===
let house_bg;

function preload_house(scene) {
  house_bg = PP.assets.image.load(scene, "assets/images/house/house_background.png", 7680, 920);
  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
  PP.entities.enemy.preload(scene);
}

function create_house(scene, data) {
  PP.assets.tilesprite.add(scene, house_bg, -20, -30, 7680, 920, 0, 0);
  PP.game_state.currentScene = "house_scene";
  PP.game_state.otherWorld = "ghostly_house_scene";

  if (PP.game_state.changingWorld == false) {
    PP.game_state.houseKey1Collected = false;
    PP.game_state.houseKey2Collected = false;
    PP.game_state.houseKey3Collected = false;
  }

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
        { x: 1030, y: 767, w: 110, h: 90, sprite_name: "rialzino" }, // muretto
        { x: 400, y: 550, w: 150, h: 20, sprite_name: "basetta" }, // base del nemico
        { x: 232, y: 640, w: 150, h: 20, sprite_name: "basetta"}, // base sopra culla
        // /DA FLIPPARE
        { x: 150, y: 797, w: 100, h: 60, sprite_name: "culla" },   // culla del bimbo
        { x: 378, y: 465, w: 40, h: 395, sprite_name: "palo" },  // colonna di sinistra

    //=======CASA======
    { x: 1470, y: 774, w: 110, h: 90, sprite_name: "rialzino" }, //rialzino
    { x: 1870, y: 625, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2270, y: 737, w: 87, h: 130, sprite_name: "vaso" },


    //=======PIATTAFORME PER LA PRIMA CHIAVE=========
    { x: 2630, y: 740, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2905, y: 650, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3530, y: 475, w: 150, h: 42, sprite_name: "piattaforma" },

    { x: 3880, y: -171, w: 100, h: 900, sprite_name: "piattaforma" }, //MURO CON PORTA SOTTO

    //=======PIATTAFORME PER LA SECONDA CHIAVE=========
    { x: 4180, y: 450, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 4430, y: 300, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 4830, y: 450, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 5200, y: 425, w: 100, h: 300, sprite_name: "piattaforma" },  // Terzo muro

    // === ARZIGOGOLO COSTRUITO ADDOSSO ALLA PARETE (VEDI MARCELLO) ===
    { x: 5860, y: 774, w: 150, h: 93, sprite_name: "rialzino" }, //Non ho capito che sprite andrebbe messo, chiedere a Marcello (SOLO MONDO REALE)
    { x: 5300, y: 425, w: 500, h: 42, sprite_name: "piattaforma" }, //Piattaforma larga attaccata al muro
    { x: 5758, y: 325, w: 42, h: 100, sprite_name: "piattaforma" }, //Parete verticale del coso
    
    { x: 5708, y: 285, w: 150, h: 42, sprite_name: "piattaforma" }, // Parete orizzontale alla fine di quella verticale

    { x: 6058, y: 155, w: 150, h: 42, sprite_name: "piattaforma" }, // Piattaforma orizzontale a angolo retto dopo l'accrocchio
    { x: 6058, y: 612, w: 150, h: 42, sprite_name: "piattaforma" }, //Piattaforma per salire sull'accrocchio

    //=== PIATTAFORME GROSSE PER LA FINE DEL LIVELLO ===
    { x: 6400, y: 340, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 6700, y: 220, w: 250, h: 42, sprite_name: "piattaforma" },
    { x: 7100, y: 340, w: 150, h: 42, sprite_name: "piattaforma" },

    // === VASI SOTTO ALLE PIATTAFORME GRANDI PER FERMARE I NEMICI ===
    { x: 6380, y: 737, w: 87, h: 130, sprite_name: "vaso" },
    { x: 7120, y: 737, w: 87, h: 130, sprite_name: "vaso" },

    { x: 7645, y: -171, w: 100, h: 900, sprite_name: "piattaforma" } //ULTIMO MURO CON PORTA SOTTO

  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PIATTAFORME NEL MONDO SPETTRALE ===
  const ghostlyPlatformPositions = [
    { x: 610,  y: 600, w: 150, h: 40, sprite_name: "nuvoletta_1" }, // piattaforma centrale 
    { x: 3105, y: 560, w: 150, h: 42, sprite_name: "nuvoletta_1" },
    { x: 5908, y: 437, w: 150, h: 42, sprite_name: "nuvoletta_1" }, //Piattaforma per salire sull'accrocchio
    { x: 4180, y: 740, w: 150, h: 42, sprite_name: "nuvoletta_1" },
    { x: 4430, y: 600, w: 150, h: 42, sprite_name: "nuvoletta_1" }
  ];

  PP.game_state.ghostlyPlatforms = PP.scene_objects.platform.create(scene, ghostlyPlatformPositions);


  // === PLAYER ===
  let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 150;
  let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 700;

  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  console.log("Ha preso il bambino " + PP.game_state.has_baby);

  // === COLLIDER PLAYER ===
  PP.physics.add_collider(scene, PP.game_state.player, ground);
  PP.physics.add_collider(scene, PP.game_state.player, leftWall);
  PP.physics.add_collider(scene, PP.game_state.player, rightWall);
  for (let plat of PP.game_state.platforms) {
    PP.physics.add_collider(scene, PP.game_state.player, plat);
  }

  //Check se sta cambiando mondo
  if (PP.game_state.changingWorld == true) {
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
    { x: 1730, y: 800, w: 75, h: 75, speed: 80, sprite_name: "lanterna" },
    { x: 3080, y: 405, w: 50, h: 70, speed: 80, sprite_name: "ombrello" },
    { x: 4380, y: 50, w: 75, h: 75, speed: 100, sprite_name: "bambino" },
    { x: 4380, y: 700, w: 75, h: 75, speed: 70, sprite_name: "slug" },
    { x: 5500, y: 375, w: 150, h: 150, speed: 80, sprite_name: "pterodatillo" },
    { x: 6025, y: 375, w: 75, h: 75, speed: 80, sprite_name: "lanterna" },
    { x: 6880, y: 100, w: 80, h: 80, speed: 80, sprite_name: "ciabatta" },
    { x: 6830, y: 700, w: 75, h: 75, speed: 100, sprite_name: "bambino" },
    { x: 7030, y: 700, w: 75, h: 75, speed: 80, sprite_name: "ombrello" },
    { x: 7980, y: 100, w: 170, h: 170, speed: 70, sprite_name: "slug" }
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

  // === CHIAVE 1 ===
  const key = PP.shapes.rectangle_add(scene, 3530, 400, 50, 50, "0x123456", 0);
  PP.physics.add(scene, key, PP.physics.type.STATIC);

  if (PP.game_state.houseKey1Collected == true) {
    PP.assets.destroy(key);
  }

  // === RACCOLTA CHIAVE 1 ===
  PP.physics.add_overlap_f(scene, PP.game_state.player, key, () => {
    if (PP.game_state.houseKey1Collected == true) {
      console.log("Chiave già raccolta!");
      return;
    }
    PP.game_state.houseKey1Collected = true;
    PP.game_state.statusKey = PP.shapes.text_add(scene, 3330, 250, "Una chiave? Forse potrebbe aprire qualche piccola serratura...");
    console.log("Key collected!");
    PP.assets.destroy(key);

    PP.timers.add_timer(scene, 1000, (s) => {
      PP.assets.destroy(PP.game_state.statusKey);
    }, false);
  });

  // === PORTA 1 ===
  const door = PP.shapes.rectangle_add(scene, 3855, 796, 100, 140, "0x654321", 1);
  const doorFrame = PP.shapes.rectangle_add(scene, 3855, 788, 120, 140, "0x000000", 0.2);
  let nope=false;
  PP.physics.add(scene, door, PP.physics.type.STATIC);
  PP.physics.add(scene, doorFrame, PP.physics.type.STATIC);

  PP.physics.add_collider(scene, PP.game_state.player, door);

  PP.physics.add_overlap_f(scene, PP.game_state.player, doorFrame, () => {
    console.log("Stai toccando la porta, hai la chiave? " + PP.game_state.houseKey1Collected);
    if (PP.game_state.houseKey1Collected == false) {
      let avvisoPorta = PP.shapes.text_add(scene, 3755, 300, "La porta è chiusa a chiave...");

      PP.timers.add_timer(scene, 300, (s) => {
        PP.assets.destroy(avvisoPorta);
      }, false);

      return;
    }

    if(nope==true){
      PP.timers.add_timer(scene, 10000, (s) => {
        nope=false;
      }, false);
      return;
    }
    
    let avvisoPorta = PP.shapes.text_add(scene, 3755, 300, "Vuoi usare la chiave per aprire la porta?");

    PP.timers.add_timer(scene, 2000, (s) => {
      PP.assets.destroy(avvisoPorta);
    }, false);

    let button_si = PP.shapes.text_add(scene, 3635, 400, "Si");
    let button_no = PP.shapes.text_add(scene, 3815, 400, "No");

    PP.timers.add_timer(scene, 2000, (s) => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
    }, false);

    PP.interactive.mouse.add(button_si, "pointerdown", () => {
      PP.assets.destroy(door);
      PP.assets.destroy(doorFrame);
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta);
    });
    PP.interactive.mouse.add(button_no, "pointerdown", () => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta);
      nope=true;
    });
  });

  // === CHIAVE 2 ===
  const key2 = PP.shapes.rectangle_add(scene, 4180, 350, 50, 50, "0x123456", 0);
  PP.physics.add(scene, key2, PP.physics.type.STATIC);

  if (PP.game_state.houseKey2Collected == true) {
    PP.assets.destroy(key2);
  }

  // === RACCOLTA CHIAVE 2===
  PP.physics.add_overlap_f(scene, PP.game_state.player, key2, () => {
    if (PP.game_state.houseKey2Collected == true) {
      console.log("Chiave già raccolta!");
      return;
    }
    PP.game_state.houseKey2Collected = true;
    PP.game_state.statusKey = PP.shapes.text_add(scene, 4180, 100, "Un'altra chiave? devo trovare la porta a cui appartiene");
    console.log("Key collected!");
    PP.assets.destroy(key2);

    PP.timers.add_timer(scene, 1000, (s) => {
      PP.assets.destroy(PP.game_state.statusKey);
    }, false);
  });

  // === PORTA 2 ===
  const door2 = PP.shapes.rectangle_add(scene, 5175, 796, 100, 140, "0x654321", 1);
  const doorFrame2 = PP.shapes.rectangle_add(scene, 5175, 788, 120, 140, "0x000000", 0.2);
  PP.physics.add(scene, door2, PP.physics.type.STATIC);
  PP.physics.add(scene, doorFrame2, PP.physics.type.STATIC);

  PP.physics.add_collider(scene, PP.game_state.player, door2);

  PP.physics.add_overlap_f(scene, PP.game_state.player, doorFrame2, () => {
    if (PP.game_state.houseKey2Collected == false) {
      let avvisoPorta2 = PP.shapes.text_add(scene, 5100, 300, "La porta è chiusa a chiave...");

      PP.timers.add_timer(scene, 300, (s) => {
        PP.assets.destroy(avvisoPorta2);
      }, false);

      return;
    }
    let avvisoPorta2 = PP.shapes.text_add(scene, 5100, 300, "Vuoi usare la chiave per aprire la porta?");

    PP.timers.add_timer(scene, 2000, (s) => {
      PP.assets.destroy(avvisoPorta2);
    }, false);

    let button_si = PP.shapes.text_add(scene, 5000, 400, "Si");
    let button_no = PP.shapes.text_add(scene, 5200, 400, "No");

    PP.timers.add_timer(scene, 2000, (s) => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
    }, false);

    PP.interactive.mouse.add(button_si, "pointerdown", () => {
      PP.assets.destroy(door2);
      PP.assets.destroy(doorFrame2);
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta2);
    });
    PP.interactive.mouse.add(button_no, "pointerdown", () => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta2);
    });
  });

  // === CHIAVE 3 ===
  const key3 = PP.shapes.rectangle_add(scene, 5880, 710, 50, 50, "0x123456", 0);
  PP.physics.add(scene, key3, PP.physics.type.STATIC);

  if (PP.game_state.houseKey3Collected == true) {
    PP.assets.destroy(key3);
  }

  // === RACCOLTA CHIAVE 3===
  PP.physics.add_overlap_f(scene, PP.game_state.player, key3, () => {
    if (PP.game_state.houseKey3Collected == true) {
      console.log("Chiave già raccolta!");
      return;
    }
    PP.game_state.houseKey3Collected = true;
    PP.game_state.statusKey = PP.shapes.text_add(scene, 5880, 300, "Un'altra chiave? devo trovare la porta a cui appartiene");
    console.log("Key collected!");
    PP.assets.destroy(key3);

    PP.timers.add_timer(scene, 1000, (s) => {
      PP.assets.destroy(PP.game_state.statusKey);
    }, false);
  });

  // === PORTA 3 ===
  const door3 = PP.shapes.rectangle_add(scene, 7620, 796, 100, 140, "0x654321", 1);
  const doorFrame3 = PP.shapes.rectangle_add(scene, 7620, 788, 120, 140, "0x000000", 0.2);
  PP.physics.add(scene, door3, PP.physics.type.STATIC);
  PP.physics.add(scene, doorFrame3, PP.physics.type.STATIC);

  PP.physics.add_collider(scene, PP.game_state.player, door3);

  PP.physics.add_overlap_f(scene, PP.game_state.player, doorFrame3, () => {
    if (PP.game_state.houseKey3Collected == false) {
      let avvisoPorta3 = PP.shapes.text_add(scene, 7400, 300, "La porta è chiusa a chiave...");

      PP.timers.add_timer(scene, 300, (s) => {
        PP.assets.destroy(avvisoPorta3);
      }, false);

      return;
    }
    let avvisoPorta3 = PP.shapes.text_add(scene, 7300, 300, "Vuoi usare la chiave per aprire la porta?");

    PP.timers.add_timer(scene, 2000, (s) => {
      PP.assets.destroy(avvisoPorta3);
    }, false);

    let button_si = PP.shapes.text_add(scene, 7200, 400, "Si");
    let button_no = PP.shapes.text_add(scene, 7400, 400, "No");

    PP.timers.add_timer(scene, 2000, (s) => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
    }, false);

    PP.interactive.mouse.add(button_si, "pointerdown", () => {
      PP.assets.destroy(door3);
      PP.assets.destroy(doorFrame3);
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta3);
    });
    PP.interactive.mouse.add(button_no, "pointerdown", () => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta3);
    });
  });

  // === CLICK DEL MOUSE PER ATTACCARE ===
  scene.input.on("pointerdown", () => {
    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
  });

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 20;
  const worldHeight = ground.geometry.body_y + 15;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

  // === CAMBIO MONDO ===
  PP.game_state.changingWorld = false;
}


// === UPDATE ===
function update_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player);
  PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

  // === SE DEV MODE ATTIVA NON SERVONO CHIAVI ===
  if(PP.game_state.DevMode == true){
    PP.game_state.houseKey1Collected = true;
    PP.game_state.houseKey2Collected = true;
    PP.game_state.houseKey3Collected = true;
  }

   if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: config.player_x,
      y: config.player_y
    };
  }

  // === CAMBIO MONDO ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
    console.log("Changing world");
    PP.entities.player.changeWorld(scene);
  }

   // === FINE LIVELLO ===
  if(PP.game_state.player.geometry.x >= 7635){
    
    PP.game_state.playerPosition.x = 30;
    PP.game_state.playerPosition.y = 800;
    PP.scenes.start("forest_scene");
    }

}

// === DESTROY ===
function destroy_house(scene) { }

PP.scenes.add('house_scene', preload_house, create_house, update_house, destroy_house);

// === FUNZIONE POP UP CONTROLLI ===
function showControlsPopup(scene) {
  const popupLayer = PP.layers.create(scene);
  PP.layers.set_z_index(popupLayer, 20);

  // sfondo scuro
  const bg = PP.shapes.rectangle_add(scene, 640, 360, 700, 420, "0x000000", 0.8);

  // testo controlli
  const text = PP.shapes.text_add(scene, 340, 300,
    "COMANDI DEL PLATFORM\n\n" +
    "A/D oppure ← / → : Muovi il personaggio\n" +
    "SPAZIO : Salta\n" +
    "SHIFT : Scatto \n" +
    "CLICK SINISTRO DEL MOUSE : Attacca\n" +
    "U : Cambia mondo\n"
  );

  // bottone per chiudere il pop up dei comandi
  const closeBtn = PP.shapes.text_add(scene, 400, 440, "CHIUDI");

  // aggiungo tutto al layer
  PP.layers.add_to_layer(popupLayer, bg);
  PP.layers.add_to_layer(popupLayer, text);
  PP.layers.add_to_layer(popupLayer, closeBtn);

  // click su chiudi
  PP.interactive.mouse.add(closeBtn, "pointerdown", () => {
    PP.assets.destroy(bg);
    PP.assets.destroy(text);
    PP.assets.destroy(closeBtn);
  });
}