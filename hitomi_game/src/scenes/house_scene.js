// === HOUSE SCENE ===
function preload_house(scene) {
  PP.entities.player.preload(scene);

  // OGGETTI INTERATTIVI
  //scene.load.image("key_gold", "assets/sprites/key_gold.png");
  //scene.load.image("door_locked", "assets/sprites/door_locked.png");

  //preload_player(scene);
  //preload_enemy(scene);
}

function create_house(scene, data) {
  PP.game_state.otherWorld = "ghostly_house_scene";

  const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 7780, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3840, 895, 7700, 40, "0x000000", 1);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME ===
  const platformPositions = [
    { x: 140, y: 810, w: 130, h: 130 },  // rialzino
    { x: 250, y: 739, w: 50, h: 270  },  // palo verticale
    { x: 540, y: 695, w: 150, h: 42  },  // piattaforma
    { x: 780, y: 810, w: 130, h: 180 },  // armadio
    { x: 1050, y: 810, w: 87, h: 130 },  // vaso

 { x: 350, y: 645, w: 150, h: 20 },  // basetta attaccata al palo
    { x: 1280, y: 425, w: 100, h: 620},  // muro grande a dx
    { x: 1600, y: 740, w: 150, h: 20 },  // piattaforma piccola dopo muro grande
    { x: 1800, y: 650, w: 150, h: 20 },  // seconda piattaforma piccola dopo muro grande
//    { x: 2000, y: 550, w: 150, h: 20 }, // terza piattaforma
    { x: 2300, y: 475, w: 150, h: 20 },  // ultima piattaforma piccola prima del secondo muro grande
    { x: 2560, y: 425, w: 100, h: 620},  // secondo muro grande
    { x: 2850, y: 740, w: 150, h: 20 },  // cubone 1 dopo secondo muro
//    { x: 3100, y: 600, w: 150, h: 20 },  // cubone 2 dopo secondo muro
    { x: 2850, y: 450, w: 150, h: 20 },  // piattafroma a sinsitra sopra
    { x: 3100, y: 300, w: 150, h: 20 },  // piattafroma in mezzo sopra
    { x: 3500, y: 450, w: 150, h: 20 },  // piattaforma a destea 
    { x: 3840, y: 583, w: 100, h: 335},  // terzo muro grande
    { x: 4040, y: 425, w: 300, h: 20 },  // piattaforma grande attaccata al terzo muro
    { x: 4265, y: 425, w: 150, h: 20 },
    { x: 4320, y: 375, w: 40, h: 80  },
    { x: 4335, y: 325, w: 100, h: 20 },
    { x: 4300, y: 825, w: 150, h: 100},
//    { x: 4500, y: 470, w: 150, h: 20 },  // secondo gradino scala
    { x: 4650, y: 620, w: 150, h: 20 },  // primo gradino scala
    { x: 4650, y: 300, w: 150, h: 20 },  // terzo gradino scala
    { x: 4745, y: 365, w: 40, h: 150 },  // collaborate and trust in fate
    { x: 5250, y: 300, w: 150, h: 100},
    { x: 5250, y: 810, w: 87, h: 130 },  // vaso terza parte

    { x: 5575, y: 250, w: 150, h: 100},  // aprte 1 piattafroma volante
    { x: 5725, y: 250, w: 150, h: 100},  // aprte 2 piattafroma volante
    
    { x: 5975, y: 200, w: 150, h: 100},  // aprte 1 piattafroma volante
    { x: 6125, y: 200, w: 150, h: 100},  // aprte 2 piattafroma volante

    { x: 6200, y: 810, w: 87, h: 130 },  // vaso terza parte 2
    { x: 6450, y: 300, w: 150, h: 100},
    { x: 7000, y: 635, w: 150, h: 20 },
    { x: 7150, y: 750, w: 150, h: 250},
    { x: 7650, y: 250, w: 100, h: 1000} 
  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);


  // === PLAYER ===
  let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 150;
  let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

  //Check se sta cambaindo mondo
  if(PP.game_state.changingWorld){
        startX = config.player_x;
        startY = config.player_y;
    }

  PP.game_state.player = PP.entities.player.create(scene, startX, startY);
  console.log("Ha preso il bambino " + PP.game_state.has_baby);

  // === COLLIDER PLAYER ===
  PP.physics.add_collider(scene, PP.game_state.player, ground);
  PP.physics.add_collider(scene, PP.game_state.player, leftWall);
  PP.physics.add_collider(scene, PP.game_state.player, rightWall);
  for (let plat of PP.game_state.platforms) {
    PP.physics.add_collider(scene, PP.game_state.player, plat);
  }

  // === HUD VITE ===
  PP.game_state.playerLivesText = PP.shapes.text_add(scene, 20, 20, "Lives:");

  // === NEMICI ===
  const enemyPositions = [
    { x: 500, y: 645, speed: 80 },
    { x: 1755, y: 610, speed: 0 },
    { x: 3100, y: 260, speed: 0  },
    { x: 3100, y: 845, speed: 0  },
    { x: 4220, y: 385, speed: 80 },
    { x: 4625, y: 260, speed: 0  },
    { x: 4745, y: 845, speed: 0  },
    { x: 5680, y: 170, speed: 80 },
    { x: 5550, y: 800, speed: 80 },
    { x: 5950, y: 800, speed: 80 },
    { x: 6080, y: 120, speed: 80 }
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
    PP.game_state.statusKey = PP.shapes.text_add(scene, 2100, 300, "Una chiave? Forse potrebbe aprire qualche piccola serratura...");
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
  const key2 = PP.shapes.rectangle_add(scene, 4220, 375, 50, 50, "0x123456", 0);
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
function update_house(scene) {
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
        console.log("Changing world");
        PP.entities.player.changeWorld(scene);
    }

}

// === DESTROY ===
function destroy_house(scene) { }

PP.scenes.add('house_scene', preload_house, create_house, update_house, destroy_house);
