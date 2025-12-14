// === ghostly_house SCENE ===

let red_heart;
let black_heart;

function preload_ghostly_house(scene) {
  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);

  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);

  // OGGETTI INTERATTIVI
  //scene.load.image("key_gold", "assets/sprites/key_gold.png");
  //scene.load.image("door_locked", "assets/sprites/door_locked.png");

  //preload_player(scene);
  //preload_enemy(scene);
}

function create_ghostly_house(scene, data) {
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

  const rightWall = PP.shapes.rectangle_add(scene, 7780, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === NEBBIA ROSSA ===
  const overlay = scene.add.rectangle(3840, 560, 7700, 720, 0x660000);
  overlay.setAlpha(0.5);
  overlay.setBlendMode(Phaser.BlendModes.ADD);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3840, 895, 7700, 40, "0x000000", 1);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME ===
  const platformPositions = [
    { x: 140, y: 810, w: 130, h: 130 },  // rialzino
    { x: 250, y: 739, w: 50, h: 270  },  // palo verticale
    { x: 540, y: 695, w: 150, h: 42  },  // piattaforma
    { x: 1050, y: 810, w: 87, h: 130 },  // vaso
    { x: 780, y: 785, w: 130, h: 180 },  // armadio

    { x: 350, y: 645, w: 150, h: 20  },  // basetta attaccata al palo
    { x: 1280, y: 425, w: 100, h: 620},  // muro grande a dx
    { x: 1800, y: 650, w: 150, h: 20 },  // seconda piattaforma piccola dopo muro grande
    { x: 2000, y: 500, w: 150, h: 20 },  // Terza paittaforma dopo il muro grande
    { x: 2300, y: 375, w: 150, h: 20 },  // ultima piattaforma piccola prima del secondo muro grande
    { x: 2560, y: 425, w: 100, h: 620},  // secondo muro grande
    { x: 2850, y: 675, w: 150, h: 10 },  // cubone 1 dopo secondo muro
    { x: 3100, y: 625, w: 150, h: 250},  // cubone 2 dopo secondo muro
    { x: 3600, y: 450, w: 150, h: 20 },  // piattaforma dopo i cuboni 
    { x: 3840, y: 425, w: 100, h: 620},  // terzo muro grande
    { x: 4040, y: 425, w: 300, h: 15 },  // piattaforma grande attaccata al terzo muro
    { x: 4265, y: 425, w: 150, h: 40 },
    { x: 4335, y: 395, w: 40, h: 120 },
    { x: 4335, y: 325, w: 100, h: 20 },
    { x: 4300, y: 805, w: 150, h: 100},
    { x: 4500, y: 470, w: 150, h: 20 },
    { x: 4550, y: 130, w: 150, h: 20 },
    { x: 4650, y: 300, w: 150, h: 20 },
    { x: 4745, y: 375, w: 40, h: 150 },
    { x: 5250, y: 300, w: 150, h: 100},
    { x: 5650, y: 250, w: 150, h: 100},
    { x: 6050, y: 200, w: 150, h: 100},
    { x: 6450, y: 300, w: 150, h: 100},
    { x: 7000, y: 480, w: 150, h: 20 },
    { x: 7150, y: 595, w: 150, h: 250},
    { x: 7650, y: 250, w: 100, h: 620}
  ];

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
    if(PP.game_state.changingWorld){
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
    { x: 450, y: 645, speed: 80 },
    { x: 1800, y: 405, speed: 0 },
    { x: 4745, y: 375, speed: 0 },
    { x: 5600, y: 100, speed: 80 },
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

  // === CHIAVE ===
  const key = PP.shapes.rectangle_add(scene, 1050, 695, 50, 50, "0x123456", 0);
  PP.physics.add(scene, key, PP.physics.type.STATIC);

  let keyCollected = false;

  // === RACCOLTA CHIAVE ===
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

  // === PORTA ===
  const door = PP.shapes.rectangle_add(scene, 3800, 820, 100, 120, "0x654321", 1);
  const doorFrame = PP.shapes.rectangle_add(scene, 3800, 820, 120, 130, "0x000000", 0.2);
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
  //scene.input.keyboard.on("keydown-U", () => switchWorld(scene));
  //scene.input.keyboard.on("keydown-u", () => switchWorld(scene));
  //}

  // === APERTURA PORTA (ANIMAZIONE SLIDE) ===
  //function openDoor(door, scene, onComplete) {
  //  if (door._isTweening) return;

  //door._isTweening = true;

  //scene.tweens.add({
  // targets: door,
  //x: door.x + 80,
  //duration: 500,
  //ease: "Power2",
  //onComplete: () => {
  //  if (door.body) door.body.enable = false;
  //door._isTweening = false;
  //if (onComplete) onComplete();
  // }
  //});
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
      x: config.player_x,
      y: config.player_y
    };
  }
    // === CAMBIO MONDO ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
        PP.entities.player.changeWorld(scene);
    }

  /*if(config.player_x < 1280) {
      PP.camera.set_follow_offset(scene, config.player_x - 640, 150);
    }else if (config.player_x < 2560){
      PP.camera.set_follow_offset(scene, config.player_x - 1920, 150);
    }else if (config.player_x < 3840){
      PP.camera.set_follow_offset(scene, config.player_x - 3200, 150);
    } else if (config.player_x > 6400){
      PP.camera.set_follow_offset(scene, config.player_x - 7400, 150);
    }else{
      PP.camera.start_follow(scene, PP.game_state.player, 0, 150);
    } */

}

// === DESTROY ===
function destroy_ghostly_house(scene) { }

PP.scenes.add('ghostly_house_scene', preload_ghostly_house, create_ghostly_house, update_ghostly_house, destroy_ghostly_house);

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