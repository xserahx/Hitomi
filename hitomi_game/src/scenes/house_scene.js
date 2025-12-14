// === HOUSE SCENE ===
let house_bg;

function preload_house(scene) {
  house_bg = PP.assets.image.load(scene, "assets/images/house/house_background.png",7680, 720);
  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
}

function create_house(scene, data) {
  PP.assets.tilesprite.add(scene, house_bg, -20, 180, 7680, 720, 0, 0);
  PP.game_state.currentScene = "house_scene";
  PP.game_state.otherWorld = "ghostly_house_scene";

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

  const rightWall = PP.shapes.rectangle_add(scene, 7780, 460, 40, 720, "0x000000", 0); 
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3830, 895, 7700, 40, "0x000000", 1);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME ===
  const platformPositions = [
    { x: 140, y: 785, w: 110, h: 90,  sprite_name: "rialzino" }, 
    //{ x: 370, y: 479, w: 40, h: 395, sprite_name: "palo" },     
    //{ x: 390, y: 550, w: 150, h: 20, sprite_name: "basetta" },  
    { x: 400, y: 810, w: 130, h: 180, sprite_name: "tavolo" },  
    { x: 540, y: 625, w: 150, h: 42, sprite_name: "piattaforma" },
    //{ x: 780, y: 629, w: 180, h: 250, sprite_name: "armadio" },
    { x: 1050, y: 747, w: 87, h: 130, sprite_name: "vaso" },

    //{ x: 350, y: 645, w: 150, h: 20, sprite_name : "basetta" },  
    { x: 1280, y: 425, w: 100, h: 620, sprite_name: "muro" }, 
    { x: 1600, y: 740, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 1800, y: 650, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2300, y: 475, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2560, y: 425, w: 100, h: 620, sprite_name: "secondo_muro" }, 
    { x: 2850, y: 740, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3100, y: 600, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 2850, y: 450, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3100, y: 300, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3500, y: 450, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 3840, y: 583, w: 100, h: 335, sprite_name: "terzo_muro" },  
    { x: 4040, y: 425, w: 300, h: 42, sprite_name: "piattaforma_grande" },  // piattaforma grande attaccata al terzo muro
    { x: 4265, y: 425, w: 150, h: 42, sprite_name: "piattaforma" },
   // { x: 4320, y: 375,             }, // w: 40, h: 80
  //  { x: 4335, y: 325,             }, // w: 100, h: 20
  //  { x: 4300, y: 805,             }, // w: 150, h: 100
    { x: 4500, y: 470, w: 150, h: 42, sprite_name: "piattaforma" },
    { x: 4650, y: 300, w: 150, h: 42, sprite_name: "piattaforma" },
   // { x: 4745, y: 365,             },    // w: 40, h: 150
   // { x: 5250, y: 300,             },  // w: 150, h: 100
    { x: 5250, y: 747, w: 87, h: 130, sprite_name: "vaso" }, 
  //{ x: 5650, y: 250,             },  // w: 150, h: 100
   // { x: 6050, y: 200,             },  // w: 150, h: 100
    { x: 6200, y: 747, w: 87, h: 130, sprite_name: "vaso" }, 
   // { x: 6450, y: 300,             },  // w: 150, h: 100
    { x: 7000, y: 635, w: 150, h: 42, sprite_name: "piattaforma" },
   // { x: 7150, y: 750,             },  // w: 150, h: 250
    //{ x: 7650, y: 250,             }  // w: 100, h: 1000
  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);


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
    if(PP.game_state.changingWorld == true){
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
    { x: 450, y: 645, speed: 80  },
    { x: 1800, y: 405, speed: 0  },
    { x: 3100, y: 50, speed: 0   },
    { x: 3100, y: 900, speed: 0  },
    { x: 4220, y: 375, speed: 80 },
    { x: 4745, y: 375, speed: 0  },
    { x: 5600, y: 100, speed: 80 },
    { x: 5550, y: 800, speed: 80 },
    { x: 5950, y: 800, speed: 80 },
    { x: 6000, y: 100, speed: 80 }
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
      if (!(PP.game_state.player.lives <= 0)) {

      // HUD DANNO
      let currentIndex = PP.game_state.player.lives - 1;
      PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
      }
      PP.entities.player.damage(scene, PP.game_state.player, enemy);
   });
      }

  // === CHIAVE 1 ===
  //         { x: 2300, y: 475, w: 150, h: 20 }, 
  const key = PP.shapes.rectangle_add(scene, 2300, 400, 50, 50, "0x123456", 0);
  PP.physics.add(scene, key, PP.physics.type.STATIC);

  let keyCollected = false;

  // === RACCOLTA CHIAVE 1 ===
  PP.physics.add_overlap_f(scene, PP.game_state.player, key, () => {
    if (keyCollected == true) {
      console.log("Chiave già raccolta!");
      return;
    }
    keyCollected = true;
    PP.game_state.statusKey = PP.shapes.text_add(scene, 1000, 600, "Una chiave? Forse potrebbe aprire qualche piccola serratura...");
    console.log("Key collected!");
    PP.assets.destroy(key);

    PP.timers.add_timer(scene, 1000, (s) => {
      PP.assets.destroy(PP.game_state.statusKey);
    }, false);
  });

  // === PORTA 1 ===
  const door = PP.shapes.rectangle_add(scene, 3840, 820, 100, 120, "0x654321", 1);
  const doorFrame = PP.shapes.rectangle_add(scene, 3840, 820, 120, 130, "0x000000", 0.2);
  PP.physics.add(scene, door, PP.physics.type.STATIC);
  PP.physics.add(scene, doorFrame, PP.physics.type.STATIC);

  PP.physics.add_collider(scene, PP.game_state.player, door);

  PP.physics.add_overlap_f(scene, PP.game_state.player, doorFrame, () => {
    if (keyCollected == false) {
      let avvisoPorta = PP.shapes.text_add(scene, 3800, 300, "La porta è chiusa a chiave...");

      PP.timers.add_timer(scene, 300, (s) => {
        PP.assets.destroy(avvisoPorta);
      }, false);

      return;
    }
    let avvisoPorta = PP.shapes.text_add(scene, 3800, 300, "Vuoi usare la chiave per aprire la porta?");

    PP.timers.add_timer(scene, 2000, (s) => {
        PP.assets.destroy(avvisoPorta);
      }, false);

    let button_si = PP.shapes.text_add(scene, 3740, 400, "Si");
    let button_no = PP.shapes.text_add(scene, 3830, 400, "No");

    PP.timers.add_timer(scene, 2000, (s) => {
        PP.assets.destroy(button_no);
        PP.assets.destroy(button_si);
    }, false);

    PP.interactive.mouse.add(button_si, "pointerdown", () => {
      PP.assets.destroy(door);
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta);
    });
    PP.interactive.mouse.add(button_no, "pointerdown", () => {
      PP.assets.destroy(button_no);
      PP.assets.destroy(button_si);
      PP.assets.destroy(avvisoPorta);
    });
  });


  // === CHIAVE 2 ===
  const key2 = PP.shapes.rectangle_add(scene, 5000, 500, 50, 50, "0x123456", 0);
  PP.physics.add(scene, key2, PP.physics.type.STATIC);

  let keyCollected2 = false;

  // === RACCOLTA CHIAVE 2===
  PP.physics.add_overlap_f(scene, PP.game_state.player, key2, () => {
    if (keyCollected2 == true) {
      console.log("Chiave già raccolta!");
      return;
    }
    keyCollected2 = true;
    PP.game_state.statusKey = PP.shapes.text_add(scene, 4320, 270, "Un'altra chiave? devo trovare la posta a cui appartiene");
    console.log("Key collected!");
    PP.assets.destroy(key2);

    PP.timers.add_timer(scene, 1000, (s) => {
      PP.assets.destroy(PP.game_state.statusKey);
    }, false);
  });

  // === PORTA 2 ===
  const door2 = PP.shapes.rectangle_add(scene, 7650, 820, 100, 120, "0x654321", 1);
  const doorFrame2 = PP.shapes.rectangle_add(scene, 7650, 820, 120, 130, "0x000000", 0.2);
  PP.physics.add(scene, door2, PP.physics.type.STATIC);
  PP.physics.add(scene, doorFrame2, PP.physics.type.STATIC);

  PP.physics.add_collider(scene, PP.game_state.player, door2);

  PP.physics.add_overlap_f(scene, PP.game_state.player, doorFrame2, () => {
    if (keyCollected2 == false) {
      let avvisoPorta2 = PP.shapes.text_add(scene, 7180, 300, "La porta è chiusa a chiave...");

      PP.timers.add_timer(scene, 300, (s) => {
        PP.assets.destroy(avvisoPorta2);
      }, false);

      return;
    }
    let avvisoPorta2 = PP.shapes.text_add(scene, 7180, 300, "Vuoi usare la chiave per aprire la porta?");

    PP.timers.add_timer(scene, 2000, (s) => {
        PP.assets.destroy(avvisoPorta2);
      }, false);

    let button_si = PP.shapes.text_add(scene, 7320, 400, "Si");
    let button_no = PP.shapes.text_add(scene, 7400, 400, "No");

    PP.timers.add_timer(scene, 2000, (s) => {
        PP.assets.destroy(button_no);
        PP.assets.destroy(button_si);
    }, false);

    PP.interactive.mouse.add(button_si, "pointerdown", () => {
      PP.assets.destroy(door2);
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

  // === CLICK DEL MOUSE PER ATTACCARE ===
  scene.input.on("pointerdown", () => {
    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
  });

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
  const worldHeight = ground.geometry.body_y + 40;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

  // === CAMBIO MONDO ===
  PP.game_state.changingWorld = false;
}


// === UPDATE ===
function update_house(scene) {
  PP.entities.player.update(scene, PP.game_state.player);
  PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

  // === CAMBIO MONDO ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
        console.log("Changing world");
        PP.entities.player.changeWorld(scene);
    }

  // === FINE LIVELLO ===
  if(PP.game_state.player.geometry.x >= 7675){
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
    const bg = PP.shapes.rectangle_add(scene,640, 360,700, 420,"0x000000",0.8);

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