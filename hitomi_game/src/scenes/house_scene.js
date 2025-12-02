// === HOUSE SCENE ===
function preload_house(scene) {

    // OGGETTI INTERATTIVI
    //scene.load.image("key_gold", "assets/sprites/key_gold.png");
    //scene.load.image("door_locked", "assets/sprites/door_locked.png");

    //preload_player(scene);
    //preload_enemy(scene);
}

function create_house(scene, data) {

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
    { x: 1050, y: 810, w: 87, h: 130 },  // vaso
    { x: 780, y: 785, w: 130, h: 180 },  // armadio

    { x: 350, y: 645, w: 150, h: 20  },  // basetta attaccata al palo
    { x: 1280, y: 425, w: 100, h: 620},  // muro grande a dx
    { x: 1600, y: 740, w: 150, h: 20 },  // piattaforma piccola dopo muro grande
    { x: 1800, y: 650, w: 150, h: 20 },  // seconda piattaforma piccola dopo muro grande
    { x: 2300, y: 475, w: 150, h: 20 },  // ultima piattaforma piccola prima del secondo muro grande
    { x: 2560, y: 425, w: 100, h: 620},  // secondo muro grande
    { x: 2850, y: 675, w: 150, h: 10 },  // cubone 1 dopo secondo muro
    { x: 3100, y: 625, w: 150, h: 250},  // cubone 2 dopo secondo muro
    { x: 3600, y: 450, w: 150, h: 20 },  // piattaforma dopo i cuboni 
    { x: 3840, y: 425, w: 100, h: 620},  // terzo muro grande
    { x: 4040, y: 425, w: 300, h: 15 },  // piattaforma grande attaccata al terzo muro
    { x: 4265, y: 425, w: 150, h: 40 },
    { x: 4335, y: 395, w: 40, h: 120,},
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
    { x: 7000, y: 480, w: 150, h: 20 }
    { x: 7150, y: 595, w: 150, h: 250},
    { x: 7650, y: 250, w: 100, h: 620}
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);


   // === PLAYER ===
    const startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 150;
    const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

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
      { x: 450, y: 645, speed: 80 },
      { x: 2300, y: 405, speed: 0 },
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
            PP.entities.player.damage(scene, PP.game_state.player,enemy);
        });
    }

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

    // === CHIAVE ===
    //const key = scene.physics.add.staticSprite(500, 600, "key_gold");
    //let keyCollected = false;

    //scene.physics.add.overlap(PP.game_state.player, key, () => {
        //if (keyCollected) return;
        //keyCollected = true;
        //PP.game_state.player.hasKey = "goldenKey";
        //key.destroy();

        //showAchievement(scene,
         //   "Una chiave? Forse potrebbe aprire qualche piccola serratura..."
       // );
   // });

    // === PORTA ===
   // const door = scene.physics.add.staticSprite(7650, 700, "door_locked");
   // door.setOrigin(0.5, 1);

    //door.isLocked = true;
    //door.keyId = "goldenKey";
    //door._opening = false;
    //door._opened = false;
    //door._enteringScene = false;
    //door._popupActive = false;
    //door._pendingAsk = false;
    //door._msgShownLocked = false;


    //function showDoorPopup() {

       // if (door._popupActive) return;
       // door._popupActive = true;

       // const px = PP.game_state.player.x;
       // const py = PP.game_state.player.y;

        //const msg = scene.add.text(px, py - 90,
            //"Vuoi usare la chiave per aprire la porta?",
           // { font:"26px Arial", fill:"#fff", backgroundColor:"#333", padding:{x:10,y:6}}
        //).setOrigin(0.5,1);

        //const btnYes = scene.add.text(px - 50, py - 40, "Sì",
            //{ font:"26px Arial", fill:"#0f0", backgroundColor:"#000", padding:{x:8,y:4}}
        //).setOrigin(0.5).setInteractive({useHandCursor:true});

        //const btnNo = scene.add.text(px + 50, py - 40, "No",
            //{ font:"26px Arial", fill:"#f00", backgroundColor:"#000", padding:{x:8,y:4}}
        //).setOrigin(0.5).setInteractive({useHandCursor:true});

        //function removePopup() {
          //  msg.destroy();
           // btnYes.destroy();
            //btnNo.destroy();
           // door._popupActive = false;
        //}

        //btnYes.on("pointerdown", () => {
        //    removePopup();
        //    door._opening = true;

          //  openDoor(door, scene, () => {
            //    door._opening = false;
              //  door.isLocked = false;
               // door._opened = true;

                //if (!door._enteringScene) {
                  //  door._enteringScene = true;
                    //scene.cameras.main.fadeOut(1000);

                    //scene.time.delayedCall(1000, () => {
                      //  PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
                        //scene.scene.start("forest_scene", PP.game_state.playerPosition);
                    //});
               // }
            //});
        //});

        //btnNo.on("pointerdown", () => {
          //  removePopup();

            //if (!door._pendingAsk) {
              //  door._pendingAsk = true;

                //scene.time.delayedCall(1500, () => {
                  //  const dist = Phaser.Math.Distance.Between(
                    //    PP.game_state.player.x, PP.game_state.player.y,
                      //  door.x, door.y
                    //);

                    //if (dist < 150 && door.isLocked) showDoorPopup();

                    //door._pendingAsk = false;
                //});
            //}
        //});
   // }

    // === COLLISIONE PORTA ===
    //scene.physics.add.overlap(PP.game_state.player, door, () => {

       // if (door._opening) return;

        // Porta chiusa → NON ho la chiave
        //if (door.isLocked && PP.game_state.player.hasKey !== door.keyId) {
          //  if (!door._msgShownLocked) {
            //    door._msgShownLocked = true;
             //   showFloatingMessage(scene,
               //     "La porta è bloccata... dovrei trovare una chiave.",
                 //   PP.game_state.player.x, PP.game_state.player.y
                //);
            //}
            //return;
        //}

        // Porta chiusa → ho la chiave
        //if (door.isLocked && PP.game_state.player.hasKey === door.keyId) {
          //  showDoorPopup();
           // return;
        //}

        // Porta già aperta
        //if (!door.isLocked && door._opened && !door._enteringScene) {
           // door._enteringScene = true;
           // scene.cameras.main.fadeOut(1000);

           // scene.time.delayedCall(1000, () => {
           //     PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
           //     scene.scene.start("forest_scene", PP.game_state.playerPosition);
           // });
        //}
   // });

    // === CAMBIO MONDO ===
    PP.game_state.changingWorld = false;
    //scene.input.keyboard.on("keydown-U", () => switchWorld(scene));
    //scene.input.keyboard.on("keydown-u", () => switchWorld(scene));
//}

// === MESSAGGIO  ===
//function showFloatingMessage(scene, text, x, y) {
  //  const msg = scene.add.text(x, y - 50, text,
    //    { font:"24px Arial", fill:"#fff", backgroundColor:"#333", padding:{x:8,y:4} }
    //);
    //msg.setOrigin(0.5, 1);
    //msg.setAlpha(0);

    //scene.tweens.add({
    //    targets: msg,
    //    alpha: 1,
    //    duration: 400,
    //  onComplete: () => {
    //        scene.time.delayedCall(2000, () => {
    //            scene.tweens.add({
    //                targets: msg,
    //                alpha: 0,
    //                duration: 400,
    //                onComplete: () => msg.destroy()
               // });
           // });
       // }
    //});
//}


// === ACHIEVEMENT ===
//function showAchievement(scene, text) {
   // const t = scene.add.text(
       // scene.cameras.main.centerX, 100, text,
       // { font:"24px Arial", fill:"#fff", backgroundColor:"#333", padding:{x:10,y:5} }
    //);
   // t.setOrigin(0.5);
    //t.setAlpha(0);

    //scene.tweens.add({
    //    targets: t,
    //    alpha: 1,
   //     duration: 400,
   //     onComplete: () => {
    //       scene.time.delayedCall(2000, () => {
     //           scene.tweens.add({
       //             targets: t,
     //               alpha: 0,
        //            duration: 400,
        //            onComplete: () => t.destroy()
         //       });
          //  });
        //}
    //});
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
  console.log(config.player_x);

  if (PP.game_state.player) {
    PP.game_state.playerPosition = {
      x: config.player_x,
       y: config.player_y
        };
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
function destroy_house(scene) {}

PP.scenes.add('house_scene', preload_house, create_house, update_house, destroy_house);
